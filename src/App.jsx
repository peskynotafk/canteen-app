import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Signup from './pages/Signup'

function HomeRedirect() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Navigate
      to={user.role === 'student' ? '/student' : '/staff'}
      replace
    />
  )
}

function StudentPlaceholder() {
  const { user, logout } = useAuth()

  return (
    <main>
      <h1>Student Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </main>
  )
}

function StaffPlaceholder() {
  const { user, logout } = useAuth()

  return (
    <main>
      <h1>Staff Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student" element={<StudentPlaceholder />} />
      <Route path="/staff" element={<StaffPlaceholder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App