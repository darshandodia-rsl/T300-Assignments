import { formatPrice } from '../formatPrice'
import AddToCart from './AddToCart'

export default function ProductDetails({ product, onBack, cartCount, setCartCount }) {
  // callback ref: React calls this when the section is added to the page.
  // The function we return is the cleanup, React calls it when the section is removed.
  function handleSectionRef() {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onBack()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }

  return (
    <div className="details" ref={handleSectionRef}>
      <button onClick={onBack}>Back to products</button>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      <p>{product.description}</p>
      <AddToCart cartCount={cartCount} setCartCount={setCartCount} />
    </div>
  )
}
