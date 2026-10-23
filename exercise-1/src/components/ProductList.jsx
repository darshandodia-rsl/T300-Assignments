// import React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isPending, isFetching, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ['products', { search: searchTerm }],
    queryFn: () => fetchProducts(searchTerm),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => refetch()}>Refresh Products</button>
      </div>

      {isPending && <p className="status">Loading products...</p>}

      {isFetching && !isPending && <p className="fetching">Updating in background...</p>}

      {isError && <p className="error">Error: {error.message}</p>}

      {isSuccess && (
        <>
          <p className="success">Products loaded successfully</p>
          <div className="grid">
            {data.map((product) => (
              <div className="card" key={product.id}>
                <h2>{product.title}</h2>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
