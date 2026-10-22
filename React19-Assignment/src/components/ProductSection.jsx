import { Suspense, useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import ErrorBoundary from './ErrorBoundary'
import ProductDetails from './ProductDetails'
import ProductList from './ProductList'

// Products are only shown once a user has registered.
export default function ProductSection({ productsPromise }) {
  const { user } = useContext(UserContext)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartCount, setCartCount] = useState(0)

  if (!user) {
    return (
      <section>
        <h2>Products</h2>
        <p>Please register to see the products.</p>
      </section>
    )
  }

  if (selectedProduct) {
    return (
      <section>
        <h2>Product Details</h2>
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          cartCount={cartCount}
          setCartCount={setCartCount}
        />
      </section>
    )
  }

  return (
    <section>
      <h2>Products</h2>
      <p>Cart: {cartCount}</p>
      <ErrorBoundary>
        <Suspense fallback={<p className="loading">Loading products...</p>}>
          <ProductList productsPromise={productsPromise} onSelect={setSelectedProduct} />
        </Suspense>
      </ErrorBoundary>
    </section>
  )
}
