import { Card, Badge } from 'react-bootstrap'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import './ProjectCard.css'

// Renders one project entry (image, name, tech list, description, repo
// link). See portfolio-page.feature.md FR-03 / § Interfaces Involved.
// name/description/imageAlt arrive as locale-keyed objects
// (projectsData.js, per languages.feature.md FR-04) and are resolved here
// via localize(); tech/repoUrl are plain values.
function ProjectCard({ name, tech, description, imageSrc, imageAlt, repoUrl }) {
  const { language, t } = useLanguage()

  return (
    <Card className="project-card h-100">
      <div className="project-card-image">
        <img src={imageSrc} alt={localize(imageAlt, language)} />
      </div>
      <Card.Body>
        <Card.Title as="h3">{localize(name, language)}</Card.Title>
        <div className="project-card-tech">
          {tech.map((item) => (
            <Badge key={item} bg="" className="project-card-tech-badge">
              {item}
            </Badge>
          ))}
        </div>
        <Card.Text>{localize(description, language)}</Card.Text>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-link"
        >
          {t('portfolio.projects.viewOnGithub')}
        </a>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard
