// A JWT is three base64url parts joined by dots: header.payload.signature.
// The payload is readable by anyone (it is encoded, not encrypted), which
// is why the backend never puts secrets in it. We read it only to learn
// when the token expires. We cannot and do not verify the signature here:
// that is the server's job on every request.
export function getTokenExpiry(token) {
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => '%' + char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    )
    const { exp } = JSON.parse(json)
    return typeof exp === 'number' ? exp * 1000 : null
  } catch {
    return null
  }
}

export function isTokenExpired(token) {
  const expiresAt = getTokenExpiry(token)
  // If we cannot read an expiry, treat the token as unusable.
  return expiresAt === null || expiresAt <= Date.now()
}
