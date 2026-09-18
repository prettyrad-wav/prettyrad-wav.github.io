import { Modal } from 'react-bootstrap'
import { useLanguage } from '../../i18n/LanguageContext'
import './MessageModal.css'

// Full date + time for the modal (FR-09); the table's Date column shows the
// shorter date-only form (MessagesTable).
function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

// Shows a single message's full details (FR-09). react-bootstrap's Modal
// already closes on its own close button, on Escape, and on a click outside
// the modal (default `keyboard`/`backdrop` props), which is exactly the
// three close behaviors FR-10 requires — no extra listeners needed.
function MessageModal({ message, onClose }) {
  const { t } = useLanguage()

  return (
    <Modal show={Boolean(message)} onHide={onClose} centered className="message-modal">
      <Modal.Header closeButton>
        <Modal.Title>{message?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="message-modal-meta">
          <strong>{t('backoffice.modal.email')}</strong> {message?.email}
        </p>
        <p className="message-modal-meta">
          <strong>{t('backoffice.modal.date')}</strong>{' '}
          {message ? formatDateTime(message.created_at) : ''}
        </p>
        <p className="message-modal-text">{message?.message}</p>
      </Modal.Body>
    </Modal>
  )
}

export default MessageModal
