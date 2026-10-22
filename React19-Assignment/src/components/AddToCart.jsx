import { startTransition, useOptimistic, useState } from 'react'
import { addToCart } from '../api/cart'

export default function AddToCart({ cartCount, setCartCount }) {
  // optimisticCount is cartCount + whatever we added optimistically.
  // When the action finishes, React goes back to the real cartCount.
  const [optimisticCount, addOptimisticItem] = useOptimistic(
    cartCount,
    (count, amount) => count + amount
  )
  const [error, setError] = useState('')

  const isPending = optimisticCount !== cartCount

  async function addAction() {
    setError('')
    addOptimisticItem(1)
    try {
      await addToCart()
      startTransition(() => setCartCount((count) => count + 1))
    } catch (err) {
      // we do not touch cartCount, so the optimistic +1 disappears by itself
      setError(err.message)
    }
  }

  return (
    <form action={addAction}>
      <p>
        Cart: {optimisticCount} {isPending && '(updating...)'}
      </p>
      <button type="submit" disabled={isPending}>
        Add to Cart
      </button>
      {error && <p className="field-error">{error}</p>}
    </form>
  )
}
