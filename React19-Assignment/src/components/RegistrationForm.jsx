import { useActionState, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../context/UserContext'
import FormInput from './FormInput'
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
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  // after a failed validation, put the cursor in the first field with an error
  useEffect(() => {
    if (state.errors.name) nameRef.current.focus()
    else if (state.errors.email) emailRef.current.focus()
    else if (state.errors.password) passwordRef.current.focus()
  }, [state])

  // when registration succeeds, save the user in context
  useEffect(() => {
    if (state.user) {
      setUser(state.user)
    }
  }, [state, setUser])

  return (
    <form action={formAction} className="form">
      <h2>Register</h2>

      <FormInput label="Name" type="text" name="name" ref={nameRef} error={state.errors.name} />
      <FormInput label="Email" type="text" name="email" ref={emailRef} error={state.errors.email} />
      <FormInput
        label="Password"
        type="password"
        name="password"
        ref={passwordRef}
        error={state.errors.password}
      />

      <SubmitButton />

      {state.status === 'success' && (
        <p className="success">Registration successful! Welcome, {state.user.name}.</p>
      )}
    </form>
  )
}
