import { Outlet } from 'react-router-dom'
import { BRAND_NAME } from '../../config/brand'
import { Blossom, Leaf } from '../botanical/Botanicals'
import Navbar from './Navbar'

// The frame around every signed-in screen, for students and staff alike,
// so both sides share one identity.
export default function AppLayout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="app-main page" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="app-footer">
        <Leaf tone="sage" />
        <span>{BRAND_NAME}, grown with care</span>
        <Blossom petal="honey" />
      </footer>
    </div>
  )
}
