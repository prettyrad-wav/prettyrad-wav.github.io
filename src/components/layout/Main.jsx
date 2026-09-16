import { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from '../../pages/Home'
import Portfolio from '../../pages/Portfolio'
import Links from '../../pages/Links'
import Contact from '../../pages/Contact'
import bgVideo from '../../assets/retro-road-bg.mp4'
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
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)
  const ActivePage = pages[activePage]

  // FR-06: pause the background video for visitors who prefer reduced motion
  // (CSS hides it visually too, but pausing stops it decoding frames in the
  // background). Re-checked live in case the OS setting changes mid-session.
  useEffect(() => {
    const reduceMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const applyMotionPreference = () => {
      if (!videoRef.current) return
      if (reduceMotionQuery.matches) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {})
      }
    }
    applyMotionPreference()
    reduceMotionQuery.addEventListener('change', applyMotionPreference)
    return () =>
      reduceMotionQuery.removeEventListener('change', applyMotionPreference)
  }, [])

  return (
    <div className="main-layout">
      {/* FR-06: retro-road-bg.mp4 (compressed from retro-road-slow.mov, see
          m16-binder/m16-notes.md) loops behind header/footer/page content on
          every public page. If it fails to load, videoFailed removes it from
          the DOM entirely so the page's plain --bg color shows instead. */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className="background-video"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      )}
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="page-content">
        <ActivePage />
      </main>
      <Footer />
    </div>
  )
}

export default Main
