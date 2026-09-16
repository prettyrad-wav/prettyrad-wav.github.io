import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/layout/Main'

// Router mount point. Per ai-spec.md §4, the four public pages never get
// their own URL path — Main renders all of them at "/" and switches between
// them internally. Login (/login) and Back Office (/backoffice) will be
// added here as their own routes when those features are implemented.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
