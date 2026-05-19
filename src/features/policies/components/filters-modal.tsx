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
      <DialogTitle sx={{ m: 0, p: 3 }}>Filters</DialogTitle>
      <FiltersForm
        closeDialog={closeFiltersDialog}
        onFiltersChange={onSubmit}
      />
    </Dialog>
  );
}
