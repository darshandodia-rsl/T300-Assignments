import { use } from 'react'
import ProductCard from './ProductCard'

// use() reads the value of the promise. While the promise is pending
// it "suspends" this component, so the nearest <Suspense> shows its fallback.
// If the promise rejects, the error goes to the nearest error boundary.
export default function ProductList({ productsPromise, onSelect }) {
  const products = use(productsPromise)

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  )
}
