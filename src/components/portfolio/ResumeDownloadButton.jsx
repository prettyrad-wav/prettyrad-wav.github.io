import resumePdf from '../../assets/Resume-9-26.pdf'
import './ResumeDownloadButton.css'

// Labeled control linking to the resume PDF asset (portfolio-page.feature.md
// FR-04). Opens in a new tab so the visitor never navigates away from the
// SPA's single URL (ai-spec.md §4).
function ResumeDownloadButton() {
  return (
    <a
      href={resumePdf}
      target="_blank"
      rel="noopener noreferrer"
      className="resume-download-button"
    >
      Download Resume
    </a>
  )
}

export default ResumeDownloadButton
