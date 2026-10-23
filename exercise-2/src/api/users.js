// in-memory fake server, data lives until the page is reloaded
let users = [
  { id: 1, name: 'Santosh', email: 'santosh@rsl.com', role: 'Admin' },
  { id: 2, name: 'Darshan', email: 'darshan@rsl.com', role: 'Editor' },
  { id: 3, name: 'Purva', email: 'purva@rsl.com', role: 'Viewer' },
];
let nextId = 4;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// run window.simulateFailure = true in the browser console to make create/delete fail
const checkFailure = () => {
  if (window.simulateFailure) {
    throw new Error('Server error: request failed');
  }
};

export const fetchUsers = async () => {
  await wait(500);
  return [...users];
};

export const createUser = async (newUser) => {
  await wait(1000);
  checkFailure();
  const user = { id: nextId++, ...newUser };
  users.push(user);
  return user;
};

export const deleteUser = async (id) => {
  await wait(1000);
  checkFailure();
  users = users.filter((user) => user.id !== id);
  return id;
};
