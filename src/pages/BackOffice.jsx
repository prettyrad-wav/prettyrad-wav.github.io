import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import BackgroundVideo from '../components/layout/BackgroundVideo'
import './BackOffice.css'

// Placeholder for the authenticated admin area. The real Back Office UI
// (message list, view/delete, sign out) is specified separately in
// back-office.feature.md and not yet built — this stub exists only so
// login-page.feature.md's redirects (FR-06 on success, FR-07 guarding an
// unauthenticated visit) have a real, session-checked destination.
function BackOffice() {
  const navigate = useNavigate()
  const [checkingSession, setCheckingSession] = useState(true)

  // ai-spec.md §7 "Auth guarding": redirect to /login if there's no valid
  // session, rather than rendering anything protected.
  useEffect(() => {
    let cancelled = false

    const checkSession = async () => {
      if (!supabase) {
        navigate('/login', { replace: true })
        return
      }
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      if (!data.session) {
        navigate('/login', { replace: true })
      } else {
        setCheckingSession(false)
      }
    }

    checkSession()
    return () => {
      cancelled = true
    }
  }, [navigate])

  if (checkingSession) return null

  return (
    <div className="backoffice-layout">
      <BackgroundVideo />
      <section className="backoffice-placeholder">
        <h1>Back Office</h1>
        <p>Coming soon.</p>
      </section>
    </div>
  )
}

export default BackOffice
