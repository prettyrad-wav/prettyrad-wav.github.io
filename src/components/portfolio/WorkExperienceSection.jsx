import { Container, Row, Col } from 'react-bootstrap'
import WorkEntry from './WorkEntry'
import './WorkExperienceSection.css'

// Titled list of WorkEntry items in reverse chronological order
// (portfolio-page.feature.md FR-02).
function WorkExperienceSection({ entries }) {
  return (
    <section className="work-section">
      <Container className="py-5">
        <h2 className="work-section-title text-center">Work Experience</h2>
        <Row className="g-4 mt-2">
          {entries.map((entry) => (
            <Col key={entry.id} xs={12}>
              <WorkEntry {...entry} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default WorkExperienceSection
