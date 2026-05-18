import { useSuspenseQuery } from '@tanstack/react-query';
import { policiesKeys } from '../api/policy-query-keys';
import { getPolicy } from '../api/get-policy';

export default function usePolicyQuery(id: string) {
  return useSuspenseQuery({
    queryKey: policiesKeys.detail(id),
    queryFn: () => getPolicy(id),
  });
}
