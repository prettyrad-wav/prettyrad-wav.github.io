import { Card, Badge } from 'react-bootstrap'
import './ProjectCard.css'

// Renders one project entry (image, name, tech list, description, repo
// link). See portfolio-page.feature.md FR-03 / § Interfaces Involved.
function ProjectCard({ name, tech, description, imageSrc, imageAlt, repoUrl }) {
  return (
    <Card className="project-card h-100">
      <div className="project-card-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <Card.Body>
        <Card.Title as="h3">{name}</Card.Title>
        <div className="project-card-tech">
          {tech.map((item) => (
            <Badge key={item} bg="" className="project-card-tech-badge">
              {item}
            </Badge>
          ))}
        </div>
        <Card.Text>{description}</Card.Text>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-link"
        >
          View on GitHub
        </a>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard
