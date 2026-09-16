import { Container } from 'react-bootstrap'
import './IntroSection.css'

// Name, role/tagline, and bio paragraph (home-page.feature.md FR-02). Bio
// copy is adapted from docs/script-1.md / docs/script-2.md per the revisions
// in docs/pitch-feedback.md: lead with the HVAC-to-dev story, name a
// concrete project (CodeBloggs), and close on what Nick brings to a team
// rather than only "continuing to learn."
function IntroSection() {
  return (
    <section className="intro-section">
      <Container className="py-5 text-center">
        <h1 className="intro-name">Nick Hobbs</h1>
        <p className="intro-role">Full-Stack Developer</p>
        <p className="intro-bio">
          Hi, I&rsquo;m Nick Hobbs — an entry-level full-stack developer completing an
          AI-native software development program through CodeBoxx Academy. Before writing
          code, I spent several years as an HVAC technician, diagnosing complex systems
          under pressure — a mindset I now bring to breaking down and solving problems in
          software. I&rsquo;ve built full-stack web applications using the MERN-stack
          and mobile applications using react native with java & springboot. I&rsquo;m ready
          to bring that combination of hands-on problem-solving and technical skill to a
          development team.
        </p>
      </Container>
    </section>
  )
}

export default IntroSection
