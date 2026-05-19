import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useEditModalState } from '../hooks/use-search-params';
import { useEditPolicyMutation } from '../hooks/use-edit-policy-mutation';
import PolicyForm from './policy-form';
import type { PolicyPayload, Policy } from '../types';

interface EditPolicyModalProps {
  policy: Policy;
}

export default function EditPolicyModal({ policy }: EditPolicyModalProps) {
  const { isOpen, updateParams } = useEditModalState();

  const { mutateAsync } = useEditPolicyMutation(policy.id);

  const onSubmit = async (payload: PolicyPayload) => {
    mutateAsync(payload);
  };

  function closeEditPolicyDialog() {
    updateParams((previousParams) => {
      return { ...previousParams, editPolicyId: undefined };
    });
  }

  return (
    <Dialog open={isOpen} onClose={closeEditPolicyDialog}>
      <DialogTitle sx={{ m: 0, p: 3 }}>Edit Policy</DialogTitle>
      <PolicyForm
        submitLabel="Save Changes"
        policy={policy}
        closeHandler={closeEditPolicyDialog}
        onSubmitHandler={onSubmit}
      />
      ;
    </Dialog>
  );
}
