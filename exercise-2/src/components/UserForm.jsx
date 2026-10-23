import { useState } from 'react';
import { useCreateUser } from '../hooks/useUsers';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');

  const { mutate, isPending, isError, isSuccess, error } = useCreateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { name, email, role },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
          setRole('Viewer');
        },
      }
    );
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Viewer">Viewer</option>
      </select>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>

      {isPending && <p className="message">Creating user...</p>}
      {isSuccess && <p className="message">User created successfully</p>}
      {isError && <p className="error">Error: {error.message}</p>}
    </form>
  );
}

export default UserForm;
