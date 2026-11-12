import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getHomePath } from '../../utils/roles'

// Wraps a group of routes. Signed-out visitors are sent to the login
// screen (remembering where they were headed); people signed in with the
// wrong role are sent to their own home.
//
// This is a convenience, not security: someone can edit what is stored in
// their browser. The backend checks the token on every protected request.
export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={getHomePath(user.role)} replace />
  }

  return <Outlet />
}
