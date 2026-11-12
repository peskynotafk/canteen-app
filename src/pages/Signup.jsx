import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import FormField from '../components/common/FormField'
import AuthLayout from '../components/layout/AuthLayout'
import { useAuth } from '../hooks/useAuth'

function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signup(name, email, password)
      // The login screen shows this message above the form.
      navigate('/login', {
        replace: true,
        state: { message: 'Registration successful. Please sign in.' },
      })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Pull up a chair"
      title="Create your account"
      intro="Register as a student to order from the canteen."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <Alert variant="error">{error}</Alert>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Full name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Choose a password"
          required
        />

        <Button type="submit" variant="honey" block loading={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Signup
