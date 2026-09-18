import IntroSection from '../components/home/IntroSection'
import SkillsSection from '../components/home/SkillsSection'
import { technicalSkills, softSkills } from '../components/home/skillsData'
import { useLanguage } from '../i18n/LanguageContext'
import './Pages.css'

// Home page (home-page.feature.md): composes the introduction, technical
// skills, and soft skills sections. All content is static data (ai-spec.md
// §5) — no user input or network calls. Section titles are chrome copy
// (languages.feature.md FR-03).
function Home() {
  const { t } = useLanguage()

  return (
    <>
      <IntroSection />
      <SkillsSection
        title={t('home.technicalSkillsTitle')}
        skills={technicalSkills}
        variant="technical"
      />
      <SkillsSection
        title={t('home.softSkillsTitle')}
        skills={softSkills}
        variant="soft"
      />
    </>
  )
}

export default Home
