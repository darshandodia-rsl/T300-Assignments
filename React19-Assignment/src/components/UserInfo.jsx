import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

// Reads the registered user from context and shows it.
export default function UserInfo() {
  const { user } = useContext(UserContext)

  if (!user) return null

  return (
    <div className="user-info">
      <h2>Registered User</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}
