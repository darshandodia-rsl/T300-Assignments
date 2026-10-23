import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, deleteUser } from '../api/users';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id) => {
      // cancel any in-flight users fetch so it doesn't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousUsers = queryClient.getQueryData(['users']);

      queryClient.setQueryData(['users'], (old) => old.filter((user) => user.id !== id));

      return { previousUsers };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(['users'], context.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
