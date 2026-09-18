import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useLanguage } from '../../i18n/LanguageContext'
import './LoginForm.css'

const EMPTY_FORM = { email: '', password: '' }

// Renders the /login page's email/password form, authenticates against
// Supabase Auth on submit, and shows the failure state
// (login-page.feature.md FR-04, FR-05, FR-08).
function LoginForm() {
  const navigate = useNavigate()
  const { t } = useLanguage()
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
      setError(t('login.feedback.unavailable'))
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
      setError(t('login.feedback.invalidCredentials'))
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
      aria-label={t('login.form.ariaLabel')}
    >
      <Form.Group className="mb-3" controlId="login-email">
        <Form.Label>{t('login.form.emailLabel')}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required
          placeholder={t('login.form.emailPlaceholder')}
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="login-password">
        <Form.Label>{t('login.form.passwordLabel')}</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required
          placeholder={t('login.form.passwordPlaceholder')}
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
        {status === 'submitting' ? t('login.form.submittingButton') : t('login.form.submitButton')}
      </Button>
    </Form>
  )
}

export default LoginForm
