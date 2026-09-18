import { createContext, useContext, useState } from 'react'
import en from './en.json'
import fr from './fr.json'
import es from './es.json'
import de from './de.json'

// languages.feature.md: single localStorage key holding the visitor's
// explicit language choice. Absent until their first switch (§6 Data) —
// the app defaults to English in the meantime (FR-06), never OS-detected.
const STORAGE_KEY = 'language'

// Fixed cycle order for LanguageSwitcher (FR-07): English -> French ->
// Spanish -> German -> English -> ...
export const LANGUAGES = ['en', 'fr', 'es', 'de']

const DICTIONARIES = { en, fr, es, de }

const LanguageContext = createContext(undefined)

// Any value other than one of LANGUAGES (or a throwing read, e.g. private
// browsing) counts as "no preference stored" (§7 Validation), so callers
// fall back to English instead of crashing.
function getStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored) ? stored : null
  } catch {
    return null
  }
}

// Resolves a dotted key path (e.g. "contact.validation.requiredFields")
// against a dictionary object.
function resolveKey(dictionary, key) {
  return key
    .split('.')
    .reduce((value, part) => (value == null ? undefined : value[part]), dictionary)
}

// Provides { language, setLanguage, t } to the whole app (App.jsx).
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => getStoredLanguage() ?? 'en')

  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage)
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // localStorage unavailable — language still applies for this load,
      // it just won't persist past it (§8 Error Behavior).
    }
  }

  // Resolves a chrome-copy key against the active dictionary, falling back
  // to the English value (and finally the raw key) on a miss (§7 Validation
  // "Missing translation key falls back, never breaks").
  const t = (key) => {
    const value = resolveKey(DICTIONARIES[language], key)
    if (value !== undefined) return value
    const fallback = resolveKey(DICTIONARIES.en, key)
    return fallback !== undefined ? fallback : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Reads one locale-keyed data field (e.g. { en, fr, es, de }) for the given
// language, falling back to English on a missing translation — the same
// fallback contract as t() (ai-spec.md-driven data files: skillsData.js,
// educationData.js, workData.js, projectsData.js, linksData.js, navLinks.js).
export function localize(field, language) {
  if (field == null || typeof field === 'string') return field
  return field[language] ?? field.en
}
