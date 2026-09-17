import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { supabase } from '../lib/supabaseClient'
import LoginForm from '../components/login/LoginForm'
import './Login.css'

// /login (FR-01, FR-04): deliberately not wrapped in the shared Main layout
// (ai-spec.md §7 "Login is a minimal standalone page") — no Navbar/Footer,
// no background video, reachable only by typing the URL or a secret
// trigger (SecretAccess), never a link in any nav.
function Login() {
  const navigate = useNavigate()
  // Starts true so the form never flashes before the session check below
  // resolves; only set false once we know the visitor needs to see it.
  const [checkingSession, setCheckingSession] = useState(true)

  // FR-07: a visitor who already holds a valid session is sent straight to
  // /backoffice instead of ever seeing the form.
  useEffect(() => {
    let cancelled = false

    const checkSession = async () => {
      // Graceful degradation (ai-spec.md §6): an unconfigured client just
      // falls through to showing the login form rather than crashing.
      if (!supabase) {
        setCheckingSession(false)
        return
      }
      const { data } = await supabase.auth.getSession()
      if (cancelled) return
      if (data.session) {
        navigate('/backoffice', { replace: true })
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
    <section className="login-page">
      <Container className="login-container">
        <h1 className="login-title text-center">Admin Login</h1>
        <LoginForm />
      </Container>
    </section>
  )
}

export default Login
