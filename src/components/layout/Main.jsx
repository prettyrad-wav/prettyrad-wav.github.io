import { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from '../../pages/Home'
import Portfolio from '../../pages/Portfolio'
import Links from '../../pages/Links'
import Contact from '../../pages/Contact'
import './Main.css'

// Maps a nav link id to the page component it renders.
const pages = {
  home: Home,
  portfolio: Portfolio,
  links: Links,
  contact: Contact,
}

// Shared layout for all public pages (FR-01). Per ai-spec.md §4, the four
// public pages are not separate router paths — the URL always stays at the
// site root, so which page is "active" is plain component state here rather
// than a route param.
function Main() {
  const [activePage, setActivePage] = useState('home')
  const ActivePage = pages[activePage]

  return (
    <div className="main-layout">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="page-content">
        <ActivePage />
      </main>
      <Footer />
    </div>
  )
}

export default Main
