import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductList from './components/ProductList';
import './styles.css';

const queryClient = new QueryClient();

function App() {
  const [showProducts, setShowProducts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <h1>Exercise 1: Product Listing</h1>
        <button onClick={() => setShowProducts(!showProducts)}>
          {showProducts ? 'Hide Products' : 'Show Products'}
        </button>
        {showProducts && <ProductList />}
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
