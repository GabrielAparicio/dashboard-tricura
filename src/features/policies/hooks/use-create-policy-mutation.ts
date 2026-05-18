import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPolicy } from '../api/create-policy';
import { policiesKeys } from '../api/policy-query-keys';

export function useCreatePolicyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPolicy,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: policiesKeys.lists(),
      });
    },
  });
}
