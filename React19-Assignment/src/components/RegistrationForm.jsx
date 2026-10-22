import { useActionState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import SubmitButton from './SubmitButton'

const initialState = { status: 'idle', errors: {}, user: null }

// The action gets the previous state and the form data, and returns the new state.
async function registerAction(prevState, formData) {
  const name = formData.get('name').trim()
  const email = formData.get('email').trim()
  const password = formData.get('password')

  // basic validation
  const errors = {}
  if (!name) errors.name = 'Name is required.'
  if (!email.includes('@')) errors.email = 'Please enter a valid email.'
  if (!password) errors.password = 'Password is required.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, user: null }
  }

  // fake API request
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return { status: 'success', errors: {}, user: { name, email } }
}

export default function RegistrationForm() {
  const [state, formAction] = useActionState(registerAction, initialState)
  const { setUser } = useContext(UserContext)

  // when registration succeeds, save the user in context
  useEffect(() => {
    if (state.user) {
      setUser(state.user)
    }
  }, [state, setUser])

  return (
    <form action={formAction} className="form">
      <h2>Register</h2>

      <label>
        Name
        <input type="text" name="name" />
        {state.errors.name && <span className="field-error">{state.errors.name}</span>}
      </label>

      <label>
        Email
        <input type="text" name="email" />
        {state.errors.email && <span className="field-error">{state.errors.email}</span>}
      </label>

      <label>
        Password
        <input type="password" name="password" />
        {state.errors.password && (
          <span className="field-error">{state.errors.password}</span>
        )}
      </label>

      <SubmitButton />

      {state.status === 'success' && (
        <p className="success">Registration successful! Welcome, {state.user.name}.</p>
      )}
    </form>
  )
}
