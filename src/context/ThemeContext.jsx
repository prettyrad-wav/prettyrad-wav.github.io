import { createContext, useContext, useEffect, useState } from 'react'

// light-dark-mode.feature.md: single localStorage key holding the visitor's
// explicit theme choice. Absent until their first toggle (§6 Data).
const STORAGE_KEY = 'theme'

const ThemeContext = createContext(undefined)

// Any value other than 'light'/'dark' (or a throwing read, e.g. private
// browsing) counts as "no preference stored" (§7 Validation), so callers
// fall back to the OS setting instead of crashing.
function getStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Provides { theme, setTheme } to the whole app (App.jsx). `theme` always
// resolves to a concrete 'light' | 'dark' for ThemeToggle to render against,
// but `data-theme` is only ever written to the root element once the
// visitor makes an explicit choice — until then the existing
// prefers-color-scheme block in index.css stays in sole control, so it
// keeps live-following OS changes exactly as it did before this feature.
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => getStoredTheme() ?? getSystemTheme())

  useEffect(() => {
    if (getStoredTheme()) return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event) => setThemeState(event.matches ? 'dark' : 'light')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // localStorage unavailable — theme still applies for this load, it
      // just won't persist past it (§8 Error Behavior).
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
