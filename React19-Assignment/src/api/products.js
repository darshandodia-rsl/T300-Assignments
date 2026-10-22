// Mock product data. Images are local SVG files in public/images.
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 6499,
    category: 'Electronics',
    image: '/images/headphones.svg',
    description: 'Over-ear headphones with 30 hours of battery life.',
  },
  {
    id: 2,
    name: 'Running Shoes',
    price: 4999,
    category: 'Footwear',
    image: '/images/shoes.svg',
    description: 'Lightweight shoes made for daily runs.',
  },
  {
    id: 3,
    name: 'Coffee Mug',
    price: 999,
    category: 'Home',
    image: '/images/mug.svg',
    description: 'Ceramic mug that keeps your coffee warm for longer.',
  },
  {
    id: 4,
    name: 'Backpack',
    price: 2499,
    category: 'Accessories',
    image: '/images/backpack.svg',
    description: 'Water resistant backpack with a laptop pocket.',
  },
  {
    id: 5,
    name: 'Smart Watch',
    price: 10999,
    category: 'Electronics',
    image: '/images/watch.svg',
    description: 'Tracks steps, sleep and heart rate.',
  },
  {
    id: 6,
    name: 'Desk Lamp',
    price: 1799,
    category: 'Home',
    image: '/images/lamp.svg',
    description: 'LED lamp with three brightness levels.',
  },
]

// Simulates an API call with a 2 second delay.
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 2000)
  })
}
