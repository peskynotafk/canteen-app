// Roles as the backend defines them (models/User.js).
// The frontend uses them only to decide which screens to show.
// The server still enforces every permission on every request.
export const STUDENT_ROLES = ['student']
export const STAFF_ROLES = ['staff', 'admin']
export const KNOWN_ROLES = [...STUDENT_ROLES, ...STAFF_ROLES]

// Where each role lands after signing in.
export function getHomePath(role) {
  if (STUDENT_ROLES.includes(role)) return '/student'
  if (STAFF_ROLES.includes(role)) return '/staff'
  return '/login'
}

export function roleLabel(role) {
  if (role === 'admin') return 'Admin'
  if (role === 'staff') return 'Staff'
  return 'Student'
}
