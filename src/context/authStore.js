import { createContext } from 'react'

// The context object itself lives in its own plain .js file. A file that
// exports React components (like AuthProvider) should export only
// components, or hot reloading in development stops working reliably.
export const AuthContext = createContext(null)
