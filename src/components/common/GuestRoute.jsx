import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getHomePath } from '../../utils/roles'

// The opposite of ProtectedRoute, for the login and signup screens.
// Anyone already signed in is sent onward. This also handles the moment
// right after a successful login: the screen does not navigate itself, it
// simply notices the new session and this component redirects, back to the
// page the person originally wanted if there was one.
export default function GuestRoute() {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || getHomePath(user.role)
    return <Navigate to={destination} replace />
  }

  return <Outlet />
}
