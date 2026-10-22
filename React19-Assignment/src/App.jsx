import { useState } from 'react'
import { preconnect, preinit, preload } from 'react-dom'
import { fetchProducts } from './api/products'
import { UserProvider } from './context/UserContext'
import ProductSection from './components/ProductSection'
import RegistrationForm from './components/RegistrationForm'
import UserInfo from './components/UserInfo'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap'
const PRODUCT_IMAGES = ['headphones', 'shoes', 'mug', 'backpack', 'watch', 'lamp']

export default function App() {
  // The promise is kept in state so it is created only once.
  // (If we called fetchProducts() directly in render, a new promise would be
  // created on every render and use() would suspend forever.)
  const [productsPromise] = useState(fetchProducts)

  // Asset loading APIs - they tell the browser to start loading things early.
  // preconnect: the font CSS comes from another website, so open the
  //   connection to it now instead of when the stylesheet is first needed.
  preconnect('https://fonts.googleapis.com')
  // preinit: the font stylesheet is definitely needed, so React fetches it
  //   AND applies it right away.
  preinit(FONT_URL, { as: 'style' })
  // preload: the product images are only shown after the data arrives (2s),
  //   so download them in the meantime. Images can not be "initialized",
  //   only preloaded.
  PRODUCT_IMAGES.forEach((name) => preload(`/images/${name}.svg`, { as: 'image' }))

  return (
    <UserProvider>
      {/* Document metadata: React moves these tags into <head> for us */}
      <title>Mini E-Commerce Store – Products</title>
      <meta
        name="description"
        content="Browse products in the Mini E-Commerce Store and register for an account."
      />

      <header>
        <h1>Mini E-Commerce Store</h1>
      </header>

      <main>
        <ProductSection productsPromise={productsPromise} />

        <aside>
          <RegistrationForm />
          <UserInfo />
        </aside>
      </main>
    </UserProvider>
  )
}
