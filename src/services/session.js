import { KNOWN_ROLES } from '../utils/roles'
import { isTokenExpired } from '../utils/token'

// These keys are the ones the app already used, so people who are signed
// in now stay signed in after this change.
const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const EMPTY_SESSION = { token: null, user: null }

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// Reads the saved session and throws away anything that cannot be trusted
// as a starting point: missing pieces, corrupted JSON, an unknown role, or
// a token that has already expired.
export function readSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const user = JSON.parse(localStorage.getItem(USER_KEY))

    if (token && user && KNOWN_ROLES.includes(user.role) && !isTokenExpired(token)) {
      return { token, user }
    }
  } catch {
    // Corrupted storage falls through to a clean slate below.
  }

  clearSession()
  return EMPTY_SESSION
}
