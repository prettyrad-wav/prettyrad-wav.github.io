// Shared nav data for the header (desktop) and bottom bar (mobile).
// A single source of truth keeps both nav renderings and every page in sync
// (ai-spec.md §5 "Static content as data", §7 "Navigation membership").
// Never add Login or Back Office here — those routes are intentionally hidden.
// `iconPath` is the `d` attribute of a 24x24 stroke icon drawn by Navbar.

export const navLinks = [
  {
    id: 'home',
    label: 'Home',
    iconPath: 'M4 11.5 12 4l8 7.5M6 10v9.5a1 1 0 0 0 1 1h3.5v-6h3v6H17a1 1 0 0 0 1-1V10',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    iconPath:
      'M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-11 0h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Zm0 5h16',
  },
  {
    id: 'links',
    label: 'Links',
    iconPath:
      'M9.5 14.5 14.5 9.5M11 7l1-1a3.5 3.5 0 0 1 5 5l-1 1M13 17l-1 1a3.5 3.5 0 0 1-5-5l1-1',
  },
  {
    id: 'contact',
    label: 'Contact',
    iconPath: 'M4 6h16v12H4V6Zm0 0 8 7 8-7',
  },
]
