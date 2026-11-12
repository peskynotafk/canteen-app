import { getToken } from './session'

const API_BASE_URL = '/api'

// The backend answers errors in a few slightly different shapes:
//   auth routes:        { message }
//   other routes:       { success: false, message }
//   validation failure: { success: false, message, errors: [{ field, message }] }
// ApiError flattens all of them into one object the screens can rely on.
export class ApiError extends Error {
  constructor(message, status = 0, errors = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

const NETWORK_MESSAGE =
  'Could not reach the server. Please check your connection and that the backend is running.'

function fallbackMessage(status) {
  if (status >= 500) return 'The server ran into a problem. Please try again in a moment.'
  return 'Something went wrong. Please try again.'
}

// The auth context registers a function here. When a request that carried
// a token comes back 401, the token is expired or invalid, so we sign the
// person out. Using a callback keeps this file free of React.
let unauthorizedHandler = null

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

// options.auth === false means "do not attach the token" (login, register).
export async function apiRequest(endpoint, options = {}) {
  const { auth = true, headers, ...fetchOptions } = options
  const token = auth ? getToken() : null

  let response

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    })
  } catch {
    throw new ApiError(NETWORK_MESSAGE, 0)
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    if (response.status === 401 && token && unauthorizedHandler) {
      unauthorizedHandler()
    }

    throw new ApiError(
      data.message || fallbackMessage(response.status),
      response.status,
      Array.isArray(data.errors) ? data.errors : [],
    )
  }

  return data
}
