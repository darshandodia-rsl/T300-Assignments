# Mini E-Commerce Store (React 19)

The products are hidden until the user registers. `ProductSection` checks the user from context and shows "Please register to see the products." until then.

## use()

There is no real API, so `fetchProducts()` returns a Promise that resolves with the product array after 2 seconds (using `setTimeout`). `ProductList` gets that promise as a prop and does:

```jsx
const products = use(productsPromise)
```

`use()` gives back the value once the promise is done. Until then the component pauses, and if the promise fails the error goes up to the error boundary.

The promise must not be created inside the render. I do `useState(fetchProducts)` in `App`, so it is created only once. Otherwise every render makes a new promise and it keeps loading forever.

## Suspense

In `ProductSection`, `ProductList` is wrapped like this:

```jsx
<Suspense fallback={<p>Loading products...</p>}>
  <ProductList productsPromise={productsPromise} />
</Suspense>
```

While `use()` is waiting, the "Loading products..." text is shown. Suspense doesn't handle errors, so I also put a small `ErrorBoundary` around it. It has to be a class component (that is still the only way for error boundaries). It shows the error message if the promise fails.

## useActionState()

In `RegistrationForm`:

```jsx
const [state, formAction] = useActionState(registerAction, initialState)
```

`registerAction(prevState, formData)` reads the fields from the form, checks them, waits 2 seconds with `setTimeout` to pretend it is calling a server, and returns the new state: `{ status, errors, user }`. The form shows `state.errors` under the fields and a success message when `state.status` is `'success'`.

The form is `<form action={formAction}>`, no `onSubmit` anywhere.

## useFormStatus()

`SubmitButton` does:

```jsx
const { pending } = useFormStatus()
```

and when `pending` is true the button is disabled and says "Registering...". It has to be its own component inside the form, because `useFormStatus` only works for a form that is a parent of the component.

## Context

`UserContext.jsx` creates the context with `createContext(null)`. In React 19 you can use the context directly as the provider:

```jsx
<UserContext value={{ user, setUser }}>{children}</UserContext>
```

instead of `<UserContext.Provider ...>`. When the registration succeeds, `RegistrationForm` calls `setUser` with the name and email. `UserInfo` reads it with `useContext(UserContext)` and shows it.

## Asset loading APIs

I used `preconnect`, `preinit` and `preload` from `react-dom`, all called in `App`:

- `preconnect('https://fonts.googleapis.com')` - the font stylesheet comes from another website, so the connection to it is opened early.
- `preinit(FONT_URL, { as: 'style' })` - the font stylesheet is needed for sure, so this fetches it and applies it straight away.
- `preload('/images/<name>.svg', { as: 'image' })` - the product images only show up after the data arrives (2 seconds), so I download them early in the meantime. `preload` only downloads the file, it doesn't "run" it, which is what you want for images.

## Document metadata

I wrote the tags straight inside `App`'s JSX:

```jsx
<title>Mini E-Commerce Store – Products</title>
<meta name="description" content="..." />
```

React 19 moves them into `<head>` by itself, so I don't need react-helmet.

# Task 2

## Product details

Each product card has a "View details" button. `ProductSection` keeps the clicked product in state (`selectedProduct`) and shows `ProductDetails` (name, price, description, image) instead of the list. "Back to products" sets it back to `null`.

## Add to Cart with useOptimistic()

The cart count lives in `ProductSection` (`cartCount`). `AddToCart` does:

```jsx
const [optimisticCount, addOptimisticItem] = useOptimistic(cartCount, (count, amount) => count + amount)
```

The button is inside a `<form action={addAction}>`. In `addAction`:

1. `addOptimisticItem(1)` - the count goes up immediately and "(updating...)" is shown.
2. `await addToCart()` - fake request in `api/cart.js`, takes 1.5 seconds and fails randomly about 1 time in 3.
3. If it works, the real `cartCount` is increased, so the final number is the same as the optimistic one.
4. If it fails, I don't change `cartCount`. When the action ends React drops the optimistic value, so the count goes back to the real number, and an error message is shown.

## Ref as a prop

`FormInput` is a reusable input with a label and an error message. It takes `ref` like any other prop, no `forwardRef()`:

```jsx
export default function FormInput({ label, error, ref, ...props }) {
  return (
    <label>
      {label}
      <input ref={ref} {...props} />
      ...
```

`RegistrationForm` gives the three inputs refs and, after a failed validation, calls `.focus()` on the first input that has an error.

## Ref cleanup

In `ProductDetails` the details `<div>` has a callback ref (`handleSectionRef`). When the div is added, it adds a `keydown` listener to the document so pressing Escape goes back to the list. The function returns a cleanup that removes the listener. React 19 calls that cleanup when the div is removed (or when the ref function changes), so the listener doesn't stay after leaving the details page.

## Server and Client Components (conceptual)

This app uses Vite, so everything here is a Client Component. Real Server Components need a framework like Next.js. This is how I would split it:

- **Server Components:** the product list page and `ProductDetails`. They only show data (name, price, description, image) and don't need state or event handlers. As Server Components they can read the product from the database directly, the code for them is not sent to the browser, and the page can load faster.
- **Client Components:** `AddToCart` (it needs `useOptimistic`, `useState` and a form action that updates the cart), `RegistrationForm` (state, `useActionState`, refs) and the context provider. Anything with state, effects, refs or browser events has to be a Client Component (`'use client'`).
- **Together:** the Server Component fetches the product and renders the page, and inside it puts the Client Component `<AddToCart productId={product.id} />`. The server passes plain props (like the id) to the client component. When the user clicks, the client component updates the UI right away and calls the server (for example a Server Action) to save the cart.

## React Compiler

React Compiler is a build tool that reads the components and automatically memoizes values and functions, like adding `useMemo`, `useCallback` and `React.memo` for you. So React skips re-rendering parts that didn't change, and I don't have to write the memoization by hand. I did not install it in this project, this is only an explanation.

Examples from this app:

- In `ProductDetails`, `handleSectionRef` is a new function on every render, so React runs its cleanup and re-attaches the Escape listener each time the component renders. The compiler would keep the same function between renders (as long as `onBack` is the same), so the listener is not removed and added again for no reason. Without the compiler I would wrap it in `useCallback`.
- In `ProductList`, the `ProductCard`s are re-rendered when the parent re-renders, even if the product didn't change (for example when `cartCount` changes in `ProductSection`). The compiler can skip the cards whose props are the same.
