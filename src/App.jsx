import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/layout/Main'
import Login from './pages/Login'
import BackOffice from './pages/BackOffice'
import SecretAccess from './components/SecretAccess'

// Router mount point. Per ai-spec.md §4, the four public pages never get
// their own URL path — Main renders all of them at "/" and switches between
// them internally. /login and /backoffice are the only real path changes,
// and are intentionally left out of every nav (navLinks.js).
//
// SecretAccess is mounted here, alongside the router rather than inside any
// one page, so its Konami-code/shake listeners stay active across every
// route (login-page.feature.md §2 "Global listener, not page-local").
function App() {
  return (
    <BrowserRouter>
      <SecretAccess />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/backoffice" element={<BackOffice />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
