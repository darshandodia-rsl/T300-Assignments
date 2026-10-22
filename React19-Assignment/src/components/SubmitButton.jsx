import { useFormStatus } from 'react-dom'

// useFormStatus must be used in a component that is INSIDE the <form>,
// that is why the button is a separate component.
export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Registering...' : 'Register'}
    </button>
  )
}
