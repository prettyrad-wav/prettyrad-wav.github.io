import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/layout/Main'
import Login from './pages/Login'
import BackOffice from './pages/BackOffice'
import SecretAccess from './components/SecretAccess'
import { ThemeProvider } from './context/ThemeContext'
import ThemeToggle from './components/theme/ThemeToggle'
import { LanguageProvider } from './i18n/LanguageContext'
import LanguageSwitcher from './components/language/LanguageSwitcher'

// Router mount point. Per ai-spec.md §4, the four public pages never get
// their own URL path — Main renders all of them at "/" and switches between
// them internally. /login and /backoffice are the only real path changes,
// and are intentionally left out of every nav (navLinks.js).
//
// SecretAccess is mounted here, alongside the router rather than inside any
// one page, so its Konami-code/shake listeners stay active across every
// route (login-page.feature.md §2 "Global listener, not page-local").
//
// ThemeToggle is mounted the same way (light-dark-mode.feature.md §5), so it
// reaches Login and Back Office too, without either page rendering it
// itself. ThemeProvider wraps everything so useTheme() works anywhere below.
//
// LanguageSwitcher is mounted the same way again (languages.feature.md
// FR-01/FR-07), stacked directly above ThemeToggle. LanguageProvider wraps
// everything so useLanguage() works anywhere below.
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <SecretAccess />
          <LanguageSwitcher />
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/backoffice" element={<BackOffice />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
