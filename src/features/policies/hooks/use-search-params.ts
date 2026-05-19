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
export function useTablePagination() {
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

// Specialized hook for search params
export function useSearch() {
  const updateParams = useUpdateParams();

  const search = Route.useSearch({
    select: (search) => ({
      search: search.search,
    }),
  });

  return {
    search,
    updateParams,
  };
}

// Specialized hook for filters
export function useTableFilters() {
  const updateParams = useUpdateParams();

  const filters = Route.useSearch({
    select: (search) => ({
      region: search.region,
      effectiveDateFrom: search.effectiveDateFrom,
      effectiveDateTo: search.effectiveDateTo,
      reimbursementRiskMin: search.reimbursementRiskMin,
      reimbursementRiskMax: search.reimbursementRiskMax,
      premiumMin: search.premiumMin,
      premiumMax: search.premiumMax,
      claimsTotalMin: search.claimsTotalMin,
      claimsTotalMax: search.claimsTotalMax,
    }),
  });

  const activeFilters = [];

  if (filters.region !== undefined) {
    activeFilters.push({
      label: 'Region',
      value: filters.region,
      deleteHandler: () =>
        updateParams((previous) => ({
          ...previous,
          region: undefined,
          search: undefined,
        })),
    });
  }

  if (
    filters.effectiveDateFrom !== undefined &&
    filters.effectiveDateTo !== undefined
  ) {
    activeFilters.push({
      label: 'Effective',
      value: `${filters.effectiveDateFrom} - ${filters.effectiveDateTo}`,
      deleteHandler: () =>
        updateParams((previous) => ({
          ...previous,
          effectiveDateFrom: undefined,
          effectiveDateTo: undefined,
          search: undefined,
        })),
    });
  }

  if (
    filters.claimsTotalMin !== undefined &&
    filters.claimsTotalMax !== undefined
  ) {
    activeFilters.push({
      label: 'Claims',
      value: `${filters.claimsTotalMin} - ${filters.claimsTotalMax}`,
      deleteHandler: () =>
        updateParams((previous) => ({
          ...previous,
          claimsTotalMin: undefined,
          claimsTotalMax: undefined,
          search: undefined,
        })),
    });
  }

  if (filters.premiumMin !== undefined && filters.premiumMax !== undefined) {
    activeFilters.push({
      label: 'Premium',
      value: `${filters.premiumMin} - ${filters.premiumMax}`,
      deleteHandler: () =>
        updateParams((previous) => ({
          ...previous,
          premiumMin: undefined,
          premiumMax: undefined,
          search: undefined,
        })),
    });
  }

  if (
    filters.reimbursementRiskMin !== undefined &&
    filters.reimbursementRiskMax !== undefined
  ) {
    activeFilters.push({
      label: 'Risk',
      value: `${filters.reimbursementRiskMin} - ${filters.reimbursementRiskMax}`,
      deleteHandler: () =>
        updateParams((previous) => ({
          ...previous,
          reimbursementRiskMin: undefined,
          reimbursementRiskMax: undefined,
          search: undefined,
        })),
    });
  }

  function clearAllFilters() {
    updateParams((previous) => ({
      ...previous,
      region: undefined,
      effectiveDateFrom: undefined,
      effectiveDateTo: undefined,
      claimsTotalMax: undefined,
      claimsTotalMin: undefined,
      premiumMax: undefined,
      premiumMin: undefined,
      reimbursementRiskMax: undefined,
      reimbursementRiskMin: undefined,
      search: undefined,
    }));
  }

  return {
    activeFilters,
    clearAllFilters,
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

// Specialized hook for the Filters Modal component
export function useFiltersModalState() {
  const updateParams = useUpdateParams();

  const filtersModal = Route.useSearch({
    select: (search) => search.filtersModal,
  });

  return {
    isOpen: !!filtersModal,
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
