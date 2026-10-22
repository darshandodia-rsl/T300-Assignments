// Fake "add to cart" request. It takes 1.5 seconds and fails about 1 in 3 times.
export function addToCart() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error('Could not add the item to the cart. Please try again.'))
      } else {
        resolve()
      }
    }, 1500)
  })
}
