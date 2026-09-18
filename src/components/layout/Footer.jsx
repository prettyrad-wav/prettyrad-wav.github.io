import { Container, Stack, Nav } from 'react-bootstrap'
import { useLanguage } from '../../i18n/LanguageContext'
import './Footer.css'

// Contact/social data as a plain structure (ai-spec.md §5 "Static content as data").
// TODO: swap CONTACT_EMAIL for Nick's real public contact address before launch.
const CONTACT_EMAIL = 'hobbsn97@gmail.com'

const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/prettyrad-wav',
    icon: 'github-icon',
  },
]

// Footer for every public page (FR-05): contact email, social links, copyright.
function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <Container>
        <Stack gap={1} className="align-items-center text-center">
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>

          <Nav className="social-links justify-content-center">
            {socialLinks.map((social) => (
              <Nav.Link
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                <svg className="social-icon" role="presentation" aria-hidden="true">
                  <use href={`/icons.svg#${social.icon}`}></use>
                </svg>
                {social.label}
              </Nav.Link>
            ))}
          </Nav>

          <p className="copyright">
            &copy; {year} Nick Hobbs. {t('footer.copyright')}
          </p>
        </Stack>
      </Container>
    </footer>
  )
}

export default Footer
