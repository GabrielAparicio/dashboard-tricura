import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useCreateModalState } from '../hooks/use-search-params';
import { useCreatePolicyMutation } from '../hooks/use-create-policy-mutation';
import PolicyForm from './policy-form';
import type { PolicyPayload } from '../types';

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
      <DialogTitle sx={{ m: 0, p: 3 }}>Create New Policy</DialogTitle>
      <PolicyForm
        submitLabel="Create Policy"
        closeHandler={closeCreatePolicyDialog}
        onSubmitHandler={onSubmit}
      />
      ;
    </Dialog>
  );
}
