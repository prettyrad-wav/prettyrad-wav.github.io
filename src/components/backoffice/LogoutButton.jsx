import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useLanguage } from '../../i18n/LanguageContext'
import './LogoutButton.css'

// Ends the Supabase Auth session and returns the admin to a public page
// (FR-11). Self-contained so BackOffice.jsx only has to render it.
function LogoutButton() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    // A subsequent visit to /backoffice will redirect to /login (FR-02)
    // since the session is gone; landing on Home here satisfies FR-11's
    // "public page" requirement directly.
    navigate('/', { replace: true })
  }

  return (
    <Button type="button" variant="outline-light" className="logout-button" onClick={handleLogout}>
      {t('backoffice.logout')}
    </Button>
  )
}

export default LogoutButton
