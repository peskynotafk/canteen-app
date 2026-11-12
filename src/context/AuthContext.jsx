import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authStore'
import { setUnauthorizedHandler } from '../services/api'
import { loginRequest, registerRequest } from '../services/authApi'
import { EMPTY_SESSION, clearSession, readSession, saveSession } from '../services/session'
import { getTokenExpiry } from '../utils/token'

// setTimeout stores its delay in a 32-bit number. Larger delays overflow
// and fire immediately, so we never schedule beyond this.
const MAX_TIMEOUT_MS = 2 ** 31 - 1

export function AuthProvider({ children }) {
  // Token and user always change together, so they live in one state value.
  const [session, setSession] = useState(readSession)
  const [notice, setNotice] = useState('')

  const { token, user } = session

  const logout = useCallback(() => {
    clearSession()
    setSession(EMPTY_SESSION)
  }, [])

  // Used when the session ends without the person asking for it.
  const expireSession = useCallback(() => {
    clearSession()
    setSession(EMPTY_SESSION)
    setNotice('Your session has ended. Please sign in again.')
  }, [])

  // Any protected request answered with 401 signs the person out.
  useEffect(() => {
    setUnauthorizedHandler(expireSession)
    return () => setUnauthorizedHandler(null)
  }, [expireSession])

  // Sign out at the moment the token expires, even if the person is just
  // reading the page and has not made a request.
  useEffect(() => {
    if (!token) return undefined

    const expiresAt = getTokenExpiry(token)
    if (expiresAt === null) return undefined

    const delay = Math.max(expiresAt - Date.now(), 0)
    if (delay > MAX_TIMEOUT_MS) return undefined

    const timerId = setTimeout(expireSession, delay)
    return () => clearTimeout(timerId)
  }, [token, expireSession])

  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password)

    saveSession(data.token, data.user)
    setSession({ token: data.token, user: data.user })
    setNotice('')

    return data.user
  }, [])

  // Registering does not sign the person in: the backend returns only the
  // new user, with no token, so the next step is the login screen.
  const signup = useCallback((name, email, password) => {
    return registerRequest(name, email, password)
  }, [])

  const clearNotice = useCallback(() => setNotice(''), [])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      notice,
      login,
      signup,
      logout,
      clearNotice,
    }),
    [token, user, notice, login, signup, logout, clearNotice],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
