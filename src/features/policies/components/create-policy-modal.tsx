import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useModalState } from '../hooks/use-search-params';

export default function CreatePolicyModal() {
  const { isOpen, updateParams } = useModalState();

  function closeCreatePolicyDialog() {
    updateParams((previousParams) => {
      return { ...previousParams, createModal: undefined };
    });
  }

  console.log('Modal Component Rerendered!');

  return (
    <Dialog open={isOpen} onClose={closeCreatePolicyDialog}>
      <DialogTitle sx={{ m: 0, p: 3 }}>Create Policy</DialogTitle>
      <div style={{ padding: '24px' }}>Create policy modal</div>
    </Dialog>
  );
}
