import { Route } from '../../../routes/dashboard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { policiesKeys } from '../api/policy-query-keys';
import { getPolicies } from '../api/get-policies';

export function usePoliciesQuery() {
  const params = Route.useSearch({
    select: (s) => ({
      page: s.page,
      limit: s.limit,
      search: s.search,
      region: s.region,
      effectiveDateFrom: s.effectiveDateFrom,
      effectiveDateTo: s.effectiveDateTo,
      reimbursementRiskMin: s.reimbursementRiskMin,
      reimbursementRiskMax: s.reimbursementRiskMax,
      premiumMin: s.premiumMin,
      premiumMax: s.premiumMax,
      claimsTotalMin: s.claimsTotalMin,
      claimsTotalMax: s.claimsTotalMax,
    }),
  });

  return useSuspenseQuery({
    queryKey: policiesKeys.list(params),
    queryFn: () => getPolicies(params),
  });
}
