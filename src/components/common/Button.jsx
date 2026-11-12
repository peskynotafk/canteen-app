import Spinner from './Spinner'

// variant: 'primary' (default) | 'honey' | 'outline' | 'danger'
// size:    'small' for compact actions in lists and tables
export default function Button({
  variant = 'primary',
  size,
  block = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const classes = [
    'btn',
    variant !== 'primary' && `btn--${variant}`,
    size === 'small' && 'btn--small',
    block && 'btn--block',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
