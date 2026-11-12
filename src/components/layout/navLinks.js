// Navigation links for each side of the app. A link is added here in the
// same phase as its page, so the navbar never points at something that
// does not exist yet.
const NAV_LINKS = {
  student: [],
  staff: [],
}

export function getNavLinks(role) {
  return role === 'student' ? NAV_LINKS.student : NAV_LINKS.staff
}
