import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useFiltersModalState } from '../hooks/use-search-params';
import FiltersForm from './filters-form';
import type { ParamsType } from '../types';

export default function FiltersModal() {
  const { isOpen, updateParams } = useFiltersModalState();

  function closeFiltersDialog() {
    updateParams((previousParams) => {
      return { ...previousParams, filtersModal: undefined };
    });
  }

  const onSubmit = (params: Partial<ParamsType>) => {
    updateParams((previousParams) => {
      return { ...previousParams, ...params };
    });
  };

  return (
    <Dialog open={isOpen} onClose={closeFiltersDialog}>
      <DialogTitle sx={{ m: 0, p: 3 }}>Create Policy</DialogTitle>
      <FiltersForm
        closeDialog={closeFiltersDialog}
        onFiltersChange={onSubmit}
      />
      ;
    </Dialog>
  );
}

/*
export default function CreatePolicyModal() {
  const { isOpen, updateParams } = useCreateModalState();
  const { mutateAsync } = useCreatePolicyMutation();

  const onSubmit = async (policyPayload: PolicyPayload) => {
    mutateAsync(policyPayload);
  };

  function closeCreatePolicyDialog() {
    updateParams((previousParams) => {
      return { ...previousParams, createModal: undefined };
    });
  }

  return (
    <Dialog open={isOpen} onClose={closeCreatePolicyDialog}>
      <DialogTitle sx={{ m: 0, p: 3 }}>Create Policy</DialogTitle>
      <PolicyForm
        closeHandler={closeCreatePolicyDialog}
        onSubmitHandler={onSubmit}
      />
      ;
    </Dialog>
  );
}
*/
