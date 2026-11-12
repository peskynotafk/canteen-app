import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getHomePath, roleLabel } from '../../utils/roles'
import Logo from '../botanical/Logo'
import Button from '../common/Button'
import { getNavLinks } from './navLinks'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const links = getNavLinks(user.role)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Logo to={getHomePath(user.role)} />

        {links.length > 0 && (
          <nav aria-label="Main">
            <ul className="navbar__links">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `navbar__link${isActive ? ' active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="navbar__user">
          <span className="badge badge--moss">{roleLabel(user.role)}</span>
          <span className="navbar__name">{user.name}</span>
          <Button variant="outline" size="small" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  )
}
