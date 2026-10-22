import { Suspense, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import ErrorBoundary from './ErrorBoundary'
import ProductList from './ProductList'

// Products are only shown once a user has registered.
export default function ProductSection({ productsPromise }) {
  const { user } = useContext(UserContext)

  return (
    <section>
      <h2>Products</h2>
      {user ? (
        <ErrorBoundary>
          <Suspense fallback={<p className="loading">Loading products...</p>}>
            <ProductList productsPromise={productsPromise} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <p>Please register to see the products.</p>
      )}
    </section>
  )
}
