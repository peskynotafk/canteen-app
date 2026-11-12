import { BRAND_TAGLINE } from '../../config/brand'
import { GardenWindow, VineCorner } from '../botanical/Botanicals'
import Logo from '../botanical/Logo'

// Shared frame for the login and signup screens: an illustrated panel on
// one side, the form card on the other. On phones the big illustration is
// hidden so the form is the first thing you see.
export default function AuthLayout({ eyebrow, title, intro, footer, children }) {
  return (
    <div className="auth-layout">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <aside className="auth-aside">
        <Logo />
        <GardenWindow className="auth-aside__art" />
        <p className="auth-aside__tagline">{BRAND_TAGLINE}</p>
      </aside>

      <main id="main" className="auth-main" tabIndex={-1}>
        <div className="card auth-card">
          <VineCorner className="auth-card__vine auth-card__vine--tl" />
          <VineCorner className="auth-card__vine auth-card__vine--br" />

          {eyebrow && <p className="hand">{eyebrow}</p>}
          <h1 className="auth-card__title">{title}</h1>
          <p className="auth-card__intro">{intro}</p>

          {children}

          <p className="auth-card__switch">{footer}</p>
        </div>
      </main>
    </div>
  )
}
