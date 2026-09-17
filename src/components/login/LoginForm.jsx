import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import './LoginForm.css'

const EMPTY_FORM = { email: '', password: '' }

// Renders the /login page's email/password form, authenticates against
// Supabase Auth on submit, and shows the failure state
// (login-page.feature.md FR-04, FR-05, FR-08).
function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting'

  const handleChange = (event) => {
    const { name, value } = event.target
    setError('')
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('submitting')

    // Graceful degradation (ai-spec.md §6): an unconfigured/missing client
    // is treated the same as a failed login rather than throwing.
    if (!supabase) {
      setError('Login is not available right now. Please try again later.')
      setStatus('idle')
      return
    }

    // FR-05: exactly one signInWithPassword call, carrying the current
    // field values, through the shared Supabase client.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (signInError) {
      // FR-08: stay on /login, show a visually distinct error, keep the
      // entered values so the admin can correct and retry.
      setError('Invalid login credentials.')
      setStatus('idle')
      return
    }

    // FR-06: Supabase's own client-side session persistence is what
    // survives a refresh — nothing extra to store here.
    navigate('/backoffice', { replace: true })
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="login-form"
      aria-label="Login form"
    >
      <Form.Group className="mb-3" controlId="login-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="login-password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      {/* aria-live announces the error to screen readers as it appears. */}
      <div aria-live="polite">
        {error && <p className="login-feedback login-feedback-error">{error}</p>}
      </div>

      <Button
        type="submit"
        className="login-submit-button"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Logging in…' : 'Log In'}
      </Button>
    </Form>
  )
}

export default LoginForm
