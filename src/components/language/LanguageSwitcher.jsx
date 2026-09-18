import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext'
import './LanguageSwitcher.css'

// Full names used in the aria-label so assistive tech announces something
// more useful than a bare code (FR-07 / §7 Validation "announces state").
const LANGUAGE_NAMES = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
}

// Mounted once in App.jsx, stacked directly above ThemeToggle, so it
// reaches every route — including Login and Back Office — per FR-01/FR-07.
// A single circular button (not one button per language) that advances to
// the next language in LANGUAGES on each click/keypress, wrapping back to
// English after German.
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const nextLanguage = LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length]

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={`Current language: ${LANGUAGE_NAMES[language]}. Switch to ${LANGUAGE_NAMES[nextLanguage]}.`}
    >
      {language.toUpperCase()}
    </button>
  )
}

export default LanguageSwitcher
