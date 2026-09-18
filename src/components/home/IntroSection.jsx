import { Container } from 'react-bootstrap'
import { useLanguage } from '../../i18n/LanguageContext'
import './IntroSection.css'
import headshot from '../../assets/headshot-1.png'
// Name, role/tagline, and bio paragraph (home-page.feature.md FR-02). Bio
// copy is adapted from docs/script-1.md / docs/script-2.md per the revisions
// in docs/pitch-feedback.md: lead with the HVAC-to-dev story, name a
// concrete project (CodeBloggs), and close on what Nick brings to a team
// rather than only "continuing to learn." Role/bio are chrome copy sourced
// from i18n dictionaries (languages.feature.md FR-03) — name stays a plain
// string since it's a proper noun, not translated content.
function IntroSection() {
  const { t } = useLanguage()

  return (
    <section className="intro-section">
      <Container className="py-5 text-center intro-container">
        <div>
          <img src={headshot} alt="Nick Hobbs" className="img-fluid headshot" />
        </div>
        <div>
        <h1 className="intro-name">Nick Hobbs</h1>
        <p className="intro-role">{t('home.role')}</p>
        <p className="intro-bio">{t('home.bio')}</p>
        </div>
      </Container>
    </section>
  )
}

export default IntroSection
