import { Navigate, Route, Routes } from 'react-router-dom'
import GuestRoute from './components/common/GuestRoute'
import ProtectedRoute from './components/common/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import { useAuth } from './hooks/useAuth'
import DashboardPlaceholder from './pages/DashboardPlaceholder'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { STAFF_ROLES, STUDENT_ROLES, getHomePath } from './utils/roles'

function HomeRedirect() {
  const { user, isAuthenticated } = useAuth()

  return <Navigate to={isAuthenticated ? getHomePath(user.role) : '/login'} replace />
}

// Route groups, from the outside in:
//   GuestRoute      only for signed-out visitors (login, signup)
//   ProtectedRoute  only for the listed roles
//   AppLayout       the shared navbar and footer around signed-in pages
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoute roles={STUDENT_ROLES} />}>
        <Route element={<AppLayout />}>
          <Route path="/student" element={<DashboardPlaceholder variant="student" />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={STAFF_ROLES} />}>
        <Route element={<AppLayout />}>
          <Route path="/staff" element={<DashboardPlaceholder variant="staff" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
