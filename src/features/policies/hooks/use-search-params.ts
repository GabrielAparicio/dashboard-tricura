import { Route } from '../../../routes/dashboard';

import type { ParamsType } from '../types';

export function useSearchParams() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (
    updater: (previous: ParamsType) => ParamsType,

    options?: {
      replace?: boolean;
    },
  ) => {
    navigate({
      search: updater,
      replace: options?.replace ?? true,
    });
  };

  return {
    search,
    updateSearch,
  };
}
