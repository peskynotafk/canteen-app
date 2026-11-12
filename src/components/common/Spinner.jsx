import { Leaf } from '../botanical/Botanicals'

// A small leaf that turns. With a `label` it announces itself to screen
// readers as a loading status; without one (inside a button, which already
// says aria-busy) it stays purely decorative.
export default function Spinner({ label }) {
  if (!label) return <Leaf className="spinner" tone="moss" />

  return (
    <span role="status">
      <Leaf className="spinner" tone="moss" />
      <span className="visually-hidden">{label}</span>
    </span>
  )
}
