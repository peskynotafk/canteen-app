import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import FormField from '../components/common/FormField'
import AuthLayout from '../components/layout/AuthLayout'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { login, notice } = useAuth()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Set by the signup screen after a successful registration.
  const registrationMessage = location.state?.message

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      // No navigation here: once the session exists, GuestRoute notices
      // and sends the person to the right place.
      await login(email, password)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Lovely to see you again"
      title="Welcome back"
      intro="Sign in to order ahead and follow your food from kitchen to counter."
      footer={
        <>
          New to the garden? <Link to="/signup">Create an account</Link>
        </>
      }
    >
      <Alert variant="error">{error}</Alert>
      <Alert variant="success">{registrationMessage}</Alert>
      <Alert variant="info">{notice}</Alert>

      <form onSubmit={handleSubmit} noValidate={false}>
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          required
        />

        <Button type="submit" variant="honey" block loading={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Login
