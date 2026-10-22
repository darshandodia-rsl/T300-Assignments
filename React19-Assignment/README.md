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
