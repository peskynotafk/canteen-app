import { apiRequest } from './api'

// The backend lower-cases emails when it stores them, so we send them
// trimmed and lower-cased too, and "Sam@Mail.com" never differs from
// "sam@mail.com".
function cleanEmail(email) {
  return email.trim().toLowerCase()
}

export function loginRequest(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    auth: false,
    body: JSON.stringify({ email: cleanEmail(email), password }),
  })
}

export function registerRequest(name, email, password) {
  return apiRequest('/auth/register', {
    method: 'POST',
    auth: false,
    body: JSON.stringify({ name: name.trim(), email: cleanEmail(email), password }),
  })
}
