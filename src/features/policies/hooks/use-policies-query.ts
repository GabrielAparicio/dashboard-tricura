import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from './use-search-params';
import { policiesKeys } from '../api/policy-query-keys';
import { getPolicies } from '../api/get-policies';

export function usePoliciesQuery() {
  const { params } = useParams();

  return useSuspenseQuery({
    queryKey: policiesKeys.list(params),
    queryFn: () => getPolicies(params),
  });
}
