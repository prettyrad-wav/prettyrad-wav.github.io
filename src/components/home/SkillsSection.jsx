import { Container, Row, Col } from 'react-bootstrap'
import SkillCard from './SkillCard'
import './SkillsSection.css'

// Titled grid of SkillCards — reused for both the technical skills and soft
// skills sections (home-page.feature.md FR-03/FR-04) with different data and
// a `variant` class for the visual separation required by FR-05.
function SkillsSection({ title, skills, variant }) {
  return (
    <section className={`skills-section skills-section--${variant}`}>
      <Container className="py-5">
        <h2 className="skills-section-title text-center">{title}</h2>
        <Row className="g-4 mt-2">
          {skills.map((skill) => (
            <Col key={skill.id} xs={12} sm={6} lg={3}>
              <SkillCard
                title={skill.title}
                description={skill.description}
                iconSrc={skill.iconSrc}
                iconSymbol={skill.iconSymbol}
                iconAlt={skill.iconAlt}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default SkillsSection
