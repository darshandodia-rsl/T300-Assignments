import { createContext, useState } from 'react'

// default value is null = nobody has registered yet
export const UserContext = createContext(null)

// React 19: we can render <UserContext value={...}> directly,
// no need for <UserContext.Provider value={...}> anymore.
export function UserProvider({ children }) {
  const [user, setUser] = useState(null)

  return <UserContext value={{ user, setUser }}>{children}</UserContext>
}
