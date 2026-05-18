import type { ParamsType } from '../types';

export const policiesKeys = {
  all: ['policies'] as const,

  lists: () => [...policiesKeys.all, 'list'] as const,

  list: (params: ParamsType) => {
    return [...policiesKeys.all, 'list', params] as const;
  },

  detail: (id: string) => [...policiesKeys.all, 'detail', id] as const,
};
