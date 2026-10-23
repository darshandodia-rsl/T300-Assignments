import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './styles.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <h1>Exercise 2: User Management</h1>
        <UserForm />
        <UserList />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
