import { useUsers, useDeleteUser } from '../hooks/useUsers';

function UserList() {
  const { data, isPending, isError, error } = useUsers();
  const deleteMutation = useDeleteUser();

  if (isPending) {
    return <p className="message">Loading users...</p>;
  }

  if (isError) {
    return <p className="error">Error: {error.message}</p>;
  }

  return (
    <div>
      {deleteMutation.isPending && <p className="message">Deleting user...</p>}
      {deleteMutation.isSuccess && <p className="message">User deleted successfully</p>}
      {deleteMutation.isError && (
        <p className="error">Error: {deleteMutation.error.message}. User restored.</p>
      )}

      <div className="list">
        {data.map((user) => (
          <div className="user" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <small>{user.role}</small>
            </div>
            <button onClick={() => deleteMutation.mutate(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
