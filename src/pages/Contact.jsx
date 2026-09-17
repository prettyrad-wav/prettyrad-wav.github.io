import { Container } from 'react-bootstrap'
import ContactForm from '../components/contact/ContactForm'
import './Pages.css'
import './Contact.css'

// Contact page (contact-page.feature.md): a name/email/message form that
// inserts into the Supabase `messages` table on valid submission. All
// validation and submission logic lives in ContactForm; this page just
// composes it into the shared page layout.
function Contact() {
  return (
    <section className="contact-section">
      <Container className="py-5">
        <h1 className="contact-title text-center">Contact</h1>
        <p className="contact-subtitle text-center">
          Have a project, a question, or just want to say hi? Send a message.
        </p>
        <ContactForm />
      </Container>
    </section>
  )
}

export default Contact
