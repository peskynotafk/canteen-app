import { Teacup } from '../components/botanical/Botanicals'
import { useAuth } from '../hooks/useAuth'

// PLACEHOLDER. Shown after sign-in until the real screens are built:
// the student menu arrives in Phase 2 and the staff dashboard in Phase 5.
const COPY = {
  student: {
    eyebrow: 'Your table is being set',
    body: 'Your account is ready. The menu, cart and orders arrive in the next phases of the build.',
  },
  staff: {
    eyebrow: 'The kitchen is warming up',
    body: 'You are signed in with a staff account. Food management and incoming orders arrive in a later phase of the build.',
  },
}

export default function DashboardPlaceholder({ variant }) {
  const { user } = useAuth()
  const copy = COPY[variant]

  return (
    <section className="card welcome" aria-labelledby="welcome-title">
      <Teacup className="welcome__art float" />
      <div>
        <span className="badge welcome__badge">Placeholder page</span>
        <p className="hand">{copy.eyebrow}</p>
        <h1 id="welcome-title">Welcome, {user.name}</h1>
        <p className="muted">{copy.body}</p>
      </div>
    </section>
  )
}
