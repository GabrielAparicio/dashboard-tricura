import { api } from '../../../shared/api/axios-client';
import type { Policy } from '../types';

export async function getPolicy(id: string) {
  const response = await api.get<Policy>(`/policies/${id}`);
  return response.data;
}
