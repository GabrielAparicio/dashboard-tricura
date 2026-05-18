import { Route } from '../../../routes/dashboard';
import type { ParamsType } from '../types';

// Base hook
export function useUpdateParams() {
  const navigate = Route.useNavigate();

  const updateParams = (
    updater: (previous: ParamsType) => ParamsType,
    options?: { replace?: boolean },
  ) => {
    navigate({
      search: updater,
      replace: options?.replace ?? true,
    });
  };

  return updateParams;
}

// Specialized hook for the Table/Pagination
export function useTableFilters() {
  const updateParams = useUpdateParams();

  const pagination = Route.useSearch({
    select: (search) => ({
      page: search.page,
      limit: search.limit,
    }),
  });

  return {
    pagination,
    updateParams,
  };
}

// Specialized hook for the Create Modal component
export function useCreateModalState() {
  const updateParams = useUpdateParams();

  const createModal = Route.useSearch({
    select: (search) => search.createModal,
  });

  return {
    isOpen: !!createModal,
    updateParams,
  };
}

// Specialized hook for the Edit Modal component
export function useEditModalState() {
  const updateParams = useUpdateParams();

  const editPolicyId = Route.useSearch({
    select: (search) => search.editPolicyId,
  });

  return {
    isOpen: !!editPolicyId,
    updateParams,
  };
}

// Specialized hook for the expandedId
export function useExpandedPolicyID() {
  const updateParams = useUpdateParams();

  const expandedPolicyID = Route.useSearch({
    select: (search) => search.expandedPolicyId,
  });

  return {
    expandedPolicyID,
    updateParams,
  };
}

export function useParams() {
  const params = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateParams = (
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
    params,
    updateParams,
  };
}
