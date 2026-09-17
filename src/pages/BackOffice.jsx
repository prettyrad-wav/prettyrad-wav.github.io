import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Spinner } from 'react-bootstrap'
import { supabase } from '../lib/supabaseClient'
import BackgroundVideo from '../components/layout/BackgroundVideo'
import MessagesTable from '../components/backoffice/MessagesTable'
import MessageModal from '../components/backoffice/MessageModal'
import LogoutButton from '../components/backoffice/LogoutButton'
import './BackOffice.css'

// /backoffice (back-office.feature.md): the admin's private view onto the
// `messages` table submitted via the public Contact page. Session-gated —
// see the auth check effect below (FR-01/FR-02) — then fetches, lists,
// views, and deletes messages (FR-04–FR-11).
function BackOffice() {
  const navigate = useNavigate()

  // Starts true so no table/empty/error state (any hint of message access)
  // can flash before the session check resolves (feature spec §2 "Auth
  // check happens before render, not after").
  const [checkingSession, setCheckingSession] = useState(true)

  const [messages, setMessages] = useState([])
  // 'loading' | 'success' | 'error' — drives which of table/empty/error
  // shows in place of the others (FR-05/FR-06).
  const [fetchStatus, setFetchStatus] = useState('loading')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [actionError, setActionError] = useState('')

  // FR-04: every row from `messages`, newest first.
  const fetchMessages = useCallback(async () => {
    setFetchStatus('loading')
    // Graceful degradation (ai-spec.md §6): treat an unconfigured client
    // the same as a failed fetch rather than crashing (FR-05).
    if (!supabase) {
      setFetchStatus('error')
      return
    }
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setFetchStatus('error')
      return
    }
    setMessages(data ?? [])
    setFetchStatus('success')
  }, [])

  // ai-spec.md §7 "Auth guarding": redirect to /login if there's no valid
  // session, rather than rendering anything protected (FR-01/FR-02). The
  // initial fetch runs right after, in the same effect, rather than a
  // second effect reacting to checkingSession — that would chain a
  // state-triggered effect into another setState (cascading renders).
  useEffect(() => {
    let cancelled = false

    const init = async () => {
      if (!supabase) {
        navigate('/login', { replace: true })
        return
      }
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      if (!data.session) {
        navigate('/login', { replace: true })
        return
      }
      setCheckingSession(false)
      await fetchMessages()
    }

    init()
    return () => {
      cancelled = true
    }
  }, [navigate, fetchMessages])

  // FR-08: delete on the server first, and only drop the row from local
  // state once that succeeds — a failed delete leaves the row visible
  // instead of showing a false "deleted" state (feature spec §7 "Delete
  // target exists").
  const handleDelete = async (message) => {
    setActionError('')
    if (!supabase) {
      setActionError('Delete is not available right now. Please try again later.')
      return
    }
    const { error } = await supabase.from('messages').delete().eq('id', message.id)
    if (error) {
      setActionError('Could not delete that message. Please try again.')
      return
    }
    setMessages((previous) => previous.filter((item) => item.id !== message.id))
    // Close the modal too, in case the message being deleted is open in it.
    setSelectedMessage((current) => (current?.id === message.id ? null : current))
  }

  if (checkingSession) return null

  return (
    <div className="backoffice-layout">
      <BackgroundVideo />
      <Container className="backoffice-container">
        <div className="backoffice-header">
          <h1>Back Office</h1>
          <LogoutButton />
        </div>

        {actionError && (
          <p className="backoffice-feedback backoffice-feedback-error" role="alert">
            {actionError}
          </p>
        )}

        {fetchStatus === 'loading' && (
          <div className="backoffice-loading">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {fetchStatus === 'error' && (
          <p className="backoffice-feedback backoffice-feedback-error" role="alert">
            Could not load messages. Please try again later.
          </p>
        )}

        {fetchStatus === 'success' && messages.length === 0 && (
          <p className="backoffice-empty">No messages yet.</p>
        )}

        {fetchStatus === 'success' && messages.length > 0 && (
          <MessagesTable messages={messages} onView={setSelectedMessage} onDelete={handleDelete} />
        )}
      </Container>

      <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
    </div>
  )
}

export default BackOffice
