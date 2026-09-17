import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Desktop trigger: the arrow-key-only Konami code (login-page.feature.md
// FR-02). Order matters; any other key resets progress to the start.
const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
]

// Mobile trigger tuning (FR-03): acceleration magnitude (m/s^2, gravity
// excluded where the device reports it) that counts as a "shake", how many
// of those spikes must land inside the window below to count as an
// intentional shake rather than normal handling, and how wide that window is.
const SHAKE_THRESHOLD = 20
const SHAKE_COUNT_REQUIRED = 3
const SHAKE_WINDOW_MS = 1000

// Renders nothing — mounted once in App.jsx so both secret triggers listen
// globally across every public page, and navigates to /login when either
// fires. Never blocks/preventDefaults a key or touch event, so it can't
// interfere with normal keyboard/touch use elsewhere on the site.
function SecretAccess() {
  const navigate = useNavigate()
  const konamiProgressRef = useRef(0)
  const shakeTimestampsRef = useRef([])

  // FR-02: track progress through KONAMI_SEQUENCE on every keydown.
  useEffect(() => {
    const handleKeyDown = (event) => {
      const expectedKey = KONAMI_SEQUENCE[konamiProgressRef.current]
      if (event.key !== expectedKey) {
        konamiProgressRef.current = 0
        return
      }
      konamiProgressRef.current += 1
      if (konamiProgressRef.current === KONAMI_SEQUENCE.length) {
        konamiProgressRef.current = 0
        navigate('/login')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  // FR-03: listen for devicemotion and navigate once a few acceleration
  // spikes land in quick succession. iOS Safari requires
  // DeviceMotionEvent.requestPermission() to be called from a user gesture
  // before it will report motion at all; since this listener mounts on
  // load with no gesture of its own, it can only attach on iOS if that
  // permission was already granted earlier in the session — otherwise the
  // shake trigger is simply unavailable there, per §2's accepted platform
  // limitation. Android/other browsers require no such permission.
  useEffect(() => {
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) {
      return undefined
    }

    const handleMotion = (event) => {
      const acceleration =
        event.acceleration && event.acceleration.x != null
          ? event.acceleration
          : event.accelerationIncludingGravity
      if (!acceleration || acceleration.x == null) return

      const magnitude = Math.sqrt(
        acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2,
      )
      if (magnitude < SHAKE_THRESHOLD) return

      const now = Date.now()
      const recentShakes = shakeTimestampsRef.current.filter(
        (timestamp) => now - timestamp <= SHAKE_WINDOW_MS,
      )
      recentShakes.push(now)
      shakeTimestampsRef.current = recentShakes

      if (recentShakes.length >= SHAKE_COUNT_REQUIRED) {
        shakeTimestampsRef.current = []
        navigate('/login')
      }
    }

    let cancelled = false
    const attach = () => {
      if (!cancelled) window.addEventListener('devicemotion', handleMotion)
    }

    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') attach()
        })
        .catch(() => {
          // No user gesture to request permission from here — shake stays
          // unavailable on this iOS session; URL entry and Konami remain.
        })
    } else {
      attach()
    }

    return () => {
      cancelled = true
      window.removeEventListener('devicemotion', handleMotion)
    }
  }, [navigate])

  return null
}

export default SecretAccess
