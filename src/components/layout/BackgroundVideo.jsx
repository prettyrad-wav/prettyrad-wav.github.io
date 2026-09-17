import { useEffect, useRef, useState } from 'react'
import bgVideo from '../../assets/retro-road-bg.mp4'
import './BackgroundVideo.css'

// Shared full-viewport background video + tint overlay. Used by any layout
// that wants the site's synthwave backdrop — Main (all four public pages)
// and BackOffice (ai-spec.md §7 "Back Office should still be usable and
// consistent in styling"). Login deliberately omits it (a minimal
// standalone page) by simply not rendering this component.
function BackgroundVideo() {
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)

  // Pause for visitors who prefer reduced motion (CSS hides it visually
  // too, but pausing stops it decoding frames in the background). Re-checked
  // live in case the OS setting changes mid-session.
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
    <>
      {/* retro-road-bg.mp4 (compressed from retro-road-slow.mov, see
          m16-binder/m16-notes.md) loops behind all content. If it fails to
          load, videoFailed removes it from the DOM entirely so the page's
          plain --bg color shows instead. */}
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
      {/* One continuous blur+tint over the whole video instead of every
          section blurring its own patch — separate per-section
          backdrop-filters produced visible seams where adjacent blurred
          rects met. Sits between the video (z-index -2) and all normal
          content (z-index auto), so it never covers anything else. */}
      <div className="video-overlay" aria-hidden="true" />
    </>
  )
}

export default BackgroundVideo
