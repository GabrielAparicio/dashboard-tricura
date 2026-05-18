import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPolicy } from '../api/edit-policy';
import { policiesKeys } from '../api/policy-query-keys';
import type { PolicyPayload } from '../types';

export function useEditPolicyMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PolicyPayload) => editPolicy(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: policiesKeys.detail(id),
      });
    },
  });
}
