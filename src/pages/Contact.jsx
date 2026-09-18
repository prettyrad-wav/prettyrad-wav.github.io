import { Container } from 'react-bootstrap'
import ContactForm from '../components/contact/ContactForm'
import { useLanguage } from '../i18n/LanguageContext'
import './Pages.css'
import './Contact.css'

// Contact page (contact-page.feature.md): a name/email/message form that
// inserts into the Supabase `messages` table on valid submission. All
// validation and submission logic lives in ContactForm; this page just
// composes it into the shared page layout. Title/subtitle are chrome copy
// (languages.feature.md FR-03).
function Contact() {
  const { t } = useLanguage()

  return (
    <section className="contact-section">
      <Container className="py-5">
        <h1 className="contact-title text-center">{t('contact.title')}</h1>
        <p className="contact-subtitle text-center">{t('contact.subtitle')}</p>
        <ContactForm />
      </Container>
    </section>
  )
}

export default Contact
