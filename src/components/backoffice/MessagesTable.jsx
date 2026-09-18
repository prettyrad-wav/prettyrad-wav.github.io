import { Table, Button } from 'react-bootstrap'
import { useLanguage } from '../../i18n/LanguageContext'
import './MessagesTable.css'

// Short, locale-aware date for the table's Date column (FR-07); the modal
// shows the fuller date + time (MessageModal).
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Renders the Name / Email / Date / Actions table (FR-07) and exposes the
// row-click/View and delete interactions (FR-08/FR-09). Rows are clickable
// (mouse and keyboard) as an alternative to the explicit View button, per
// FR-09 "row click, or a View control".
function MessagesTable({ messages, onView, onDelete }) {
  const { t } = useLanguage()

  return (
    <div className="messages-table-wrapper">
      <Table hover responsive className="messages-table">
        <thead>
          <tr>
            <th>{t('backoffice.table.name')}</th>
            <th>{t('backoffice.table.email')}</th>
            <th>{t('backoffice.table.date')}</th>
            <th>{t('backoffice.table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr
              key={message.id}
              className="messages-table-row"
              role="button"
              tabIndex={0}
              onClick={() => onView(message)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onView(message)
                }
              }}
            >
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{formatDate(message.created_at)}</td>
              <td>
                <Button
                  type="button"
                  variant="outline-light"
                  size="sm"
                  className="messages-table-view-button"
                  onClick={(event) => {
                    // Stop the row's own onClick from also firing.
                    event.stopPropagation()
                    onView(message)
                  }}
                >
                  {t('backoffice.table.view')}
                </Button>
                <Button
                  type="button"
                  variant="outline-danger"
                  size="sm"
                  onClick={(event) => {
                    event.stopPropagation()
                    onDelete(message)
                  }}
                >
                  {t('backoffice.table.delete')}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default MessagesTable
