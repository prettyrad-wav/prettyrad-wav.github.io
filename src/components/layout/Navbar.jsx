import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap'
import logo from '../../assets/retrotangle-tranparent.png'
import { navLinks } from './navLinks'
import './Navbar.css'

// Header/nav for every public page (FR-02, FR-03, FR-04, FR-07).
// React-Bootstrap's Navbar/Nav/Container supply the structure and styling;
// the desktop/mobile split still uses our own `desktop-nav`/`mobile-nav`
// classes (Navbar.css) instead of Bootstrap's `d-md-*` utilities, because
// Bootstrap's `md` breakpoint flips at `min-width: 768px` while ai-spec.md
// requires the switch at `max-width: 768px` (mobile is "≤768px").
function Navbar({ activePage, onNavigate }) {
  return (
    <>
      <BsNavbar sticky="top" bg="body" className="site-header">
        <Container fluid className="px-3 px-md-4">
          <BsNavbar.Brand
            as="button"
            type="button"
            className="logo-button"
            onClick={() => onNavigate('home')}
          >
            {/* Logo generated with Chatgpt (AI image tool) — see header-footer.feature.md FR-04 */}
            <img src={logo} alt="Nick Hobbs logo" className="logo" />
          </BsNavbar.Brand>

          <Nav className="desktop-nav ms-auto" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.id}
                as="button"
                type="button"
                active={link.id === activePage}
                onClick={() => onNavigate(link.id)}
                style={{ fontFamily: 'var(--sans)' }}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </BsNavbar>

      <Nav className="mobile-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Nav.Link
            key={link.id}
            as="button"
            type="button"
            active={link.id === activePage}
            onClick={() => onNavigate(link.id)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={link.iconPath} />
            </svg>
            <span>{link.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </>
  )
}

export default Navbar
