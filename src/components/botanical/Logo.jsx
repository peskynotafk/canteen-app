import { Link } from 'react-router-dom'
import { BRAND_NAME } from '../../config/brand'

// A small leaf-in-a-circle mark next to the café name.
function BrandMark() {
  return (
    <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle
        cx="24"
        cy="24"
        r="21"
        style={{ fill: 'var(--moss)', stroke: 'var(--forest)', strokeWidth: 2.2 }}
      />
      <path
        d="M14 35 C11 22 19 11 35 11 C36 27 29 36 14 35Z"
        style={{
          fill: 'var(--cream)',
          stroke: 'var(--forest)',
          strokeWidth: 2,
          strokeLinejoin: 'round',
        }}
      />
      <path
        d="M14 35 C20 29 26 22 32 15 M22 27 L21 20 M27 22 L33 22"
        style={{
          fill: 'none',
          stroke: 'var(--forest)',
          strokeWidth: 1.6,
          strokeLinecap: 'round',
        }}
      />
      <circle cx="37" cy="36" r="3" style={{ fill: 'var(--honey)', stroke: 'var(--forest)', strokeWidth: 1.5 }} />
    </svg>
  )
}

export default function Logo({ to = '/' }) {
  return (
    <Link to={to} className="logo">
      <BrandMark />
      <span className="logo__name">{BRAND_NAME}</span>
    </Link>
  )
}
