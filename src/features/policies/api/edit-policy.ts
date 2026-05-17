import { api } from '../../../shared/api/axios-client';
import type { Policy, PolicyPayload } from '../types';

export async function editPolicy(
  id: string,
  payload: PolicyPayload,
): Promise<Policy> {
  const response = await api.patch(`/policies/${id}`, payload);

  return response.data;
}
