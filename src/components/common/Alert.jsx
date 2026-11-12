const ICONS = { error: '!', success: '✓', info: 'i' }

// variant: 'error' | 'success' | 'info'
// Errors use role="alert" so screen readers announce them immediately;
// the others use role="status", which waits for a pause.
export default function Alert({ variant = 'info', children }) {
  if (!children) return null

  return (
    <div className={`alert alert--${variant}`} role={variant === 'error' ? 'alert' : 'status'}>
      <span className="alert__icon" aria-hidden="true">
        {ICONS[variant]}
      </span>
      <div>{children}</div>
    </div>
  )
}
