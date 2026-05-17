import { api } from '../../../shared/api/axios-client';
import type { Policy, PolicyPayload } from '../types';

export async function createPolicy(payload: PolicyPayload): Promise<Policy> {
  const response = await api.post('/policies', payload);

  return response.data;
}
