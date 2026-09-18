import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { supabase } from '../../lib/supabaseClient'
import { useLanguage } from '../../i18n/LanguageContext'
import './ContactForm.css'

const EMPTY_FORM = { name: '', email: '', message: '' }

// Simple, permissive "one @, something on each side, a dot in the domain"
// check — enough to satisfy FR-03 without pulling in a validation library.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// How long the success banner stays up before it clears itself (FR-06); it
// also clears immediately on the visitor's next interaction, whichever
// comes first.
const SUCCESS_MESSAGE_TIMEOUT_MS = 4000

// Renders the Contact page's name/email/message form, validates it
// client-side, inserts into Supabase on success, and shows success/failure
// feedback (contact-page.feature.md FR-01 through FR-06).
function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [validationError, setValidationError] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  // FR-02/FR-03: required fields (trimmed) plus a valid email shape.
  // Returns an error string, or '' when the form is valid.
  const validate = ({ name, email, message }) => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      return t('contact.validation.requiredFields')
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      return t('contact.validation.invalidEmail')
    }
    return ''
  }

  // Dismiss any leftover success/failure feedback as soon as the visitor
  // starts interacting again (FR-06 "or on the visitor's next interaction").
  const clearStaleFeedback = () => {
    if (status === 'success' || status === 'error') {
      setStatus('idle')
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    clearStaleFeedback()
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // FR-04: validation runs before any network call is made, so an invalid
    // form never reaches Supabase.
    const error = validate(formData)
    if (error) {
      setValidationError(error)
      setStatus('idle')
      return
    }
    setValidationError('')
    setStatus('submitting')

    // Graceful degradation (ai-spec.md §6): an unconfigured/missing client
    // is treated the same as a failed insert rather than throwing.
    const { error: insertError } = supabase
      ? await supabase.from('messages').insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        })
      : { error: new Error('Supabase is not configured.') }
    if (insertError) {
      // FR-06: keep the visitor's entered values so they can retry.
      setStatus('error')
      return
    }

    // FR-06: clear the form and auto-dismiss the success banner.
    setFormData(EMPTY_FORM)
    setStatus('success')
    setTimeout(() => {
      setStatus((current) => (current === 'success' ? 'idle' : current))
    }, SUCCESS_MESSAGE_TIMEOUT_MS)
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="contact-form"
      aria-label={t('contact.form.ariaLabel')}
    >
      <Form.Group className="mb-3" controlId="contact-name">
        <Form.Label>{t('contact.form.nameLabel')}</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder={t('contact.form.namePlaceholder')}
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="contact-email">
        <Form.Label>{t('contact.form.emailLabel')}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder={t('contact.form.emailPlaceholder')}
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="contact-message">
        <Form.Label>{t('contact.form.messageLabel')}</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="message"
          placeholder={t('contact.form.messagePlaceholder')}
          value={formData.message}
          onChange={handleChange}
        />
      </Form.Group>

      {/* aria-live announces validation/success/failure updates to screen
          readers as they appear, without needing focus to move. */}
      <div aria-live="polite">
        {validationError && (
          <p className="contact-feedback contact-feedback-error">
            {validationError}
          </p>
        )}
        {status === 'success' && (
          <p className="contact-feedback contact-feedback-success">
            {t('contact.feedback.success')}
          </p>
        )}
        {status === 'error' && (
          <p className="contact-feedback contact-feedback-error">
            {t('contact.feedback.error')}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="contact-submit-button"
        disabled={status === 'submitting'}
      >
        {status === 'submitting'
          ? t('contact.form.submittingButton')
          : t('contact.form.submitButton')}
      </Button>
    </Form>
  )
}

export default ContactForm
