import { api } from '../../../shared/api/axios-client';

import type { ParamsType, PoliciesResponse } from '../types';

export async function getPolicies(policiesParams: ParamsType) {
  const response = await api.get<PoliciesResponse>('/policies', {
    params: policiesParams,
  });

  return response.data;
}
