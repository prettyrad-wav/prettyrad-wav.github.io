import IntroSection from '../components/home/IntroSection'
import SkillsSection from '../components/home/SkillsSection'
import { technicalSkills, softSkills } from '../components/home/skillsData'
import './Pages.css'

// Home page (home-page.feature.md): composes the introduction, technical
// skills, and soft skills sections. All content is static data (ai-spec.md
// §5) — no user input or network calls.
function Home() {
  return (
    <>
      <IntroSection />
      <SkillsSection
        title="Technical Skills"
        skills={technicalSkills}
        variant="technical"
      />
      <SkillsSection title="Soft Skills & Talents" skills={softSkills} variant="soft" />
    </>
  )
}

export default Home
