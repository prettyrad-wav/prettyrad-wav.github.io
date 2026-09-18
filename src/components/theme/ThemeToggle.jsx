import { useTheme } from '../../context/ThemeContext'
import './ThemeToggle.css'

// Sun/moon icons drawn in the same 24x24 stroke style as the mobile bottom
// nav icons (navLinks.js), for visual consistency across the site.
const SUN_PATH =
  'M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-6.66 1.42-1.42M5 19l1.42-1.42m0-11.16L5 5m14 14-1.42-1.42M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z'
const MOON_PATH = 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z'

// Mounted once in App.jsx, alongside SecretAccess, so it reaches every
// route — including Login and Back Office, which don't render Main — per
// FR-01. Renders on the base tokens (not glass) so it stays legible and
// actually changes appearance on every page, per FR-02/FR-06.
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={isDark ? MOON_PATH : SUN_PATH} />
      </svg>
    </button>
  )
}

export default ThemeToggle
