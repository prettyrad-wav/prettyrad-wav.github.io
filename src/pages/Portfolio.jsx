import { Container } from 'react-bootstrap'
import EducationSection from '../components/portfolio/EducationSection'
import WorkExperienceSection from '../components/portfolio/WorkExperienceSection'
import ProjectsSection from '../components/portfolio/ProjectsSection'
import ResumeDownloadButton from '../components/portfolio/ResumeDownloadButton'
import { educationEntries } from '../components/portfolio/educationData'
import { workEntries } from '../components/portfolio/workData'
import { projectEntries } from '../components/portfolio/projectsData'
import './Portfolio.css'

// Portfolio page (portfolio-page.feature.md): composes the education, work
// experience, and projects sections, plus the resume download control. All
// content is static data (ai-spec.md §5) — no user input or network calls.
function Portfolio() {
  return (
    <>
      <section className="portfolio-header">
        <Container className="py-5 text-center">
          <h1 className="portfolio-title">Portfolio</h1>
          <p className="portfolio-subtitle">
            My education, work history, and project work.
          </p>
          <ResumeDownloadButton />
        </Container>
      </section>
      <EducationSection entries={educationEntries} />
      <WorkExperienceSection entries={workEntries} />
      <ProjectsSection entries={projectEntries} />
    </>
  )
}

export default Portfolio
