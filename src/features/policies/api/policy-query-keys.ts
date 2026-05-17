import type { ParamsType } from '../types';

export const policiesKeys = {
  all: ['policies'] as const,

  list: (filters: ParamsType) =>
    [...policiesKeys.all, 'list', filters] as const,

  detail: (id: string) => [...policiesKeys.all, 'detail', id] as const,
};
