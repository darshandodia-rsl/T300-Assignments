export const fetchProducts = async (search) => {
  const url = search
    ? `https://dummyjson.com/products/search?q=${search}`
    : 'https://dummyjson.com/products';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.products;
};
