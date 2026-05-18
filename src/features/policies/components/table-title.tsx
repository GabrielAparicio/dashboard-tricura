import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCreateModalState } from '../hooks/use-search-params';

export default function TableTitle() {
  const { updateParams } = useCreateModalState();

  function openCreatePolicyDialog() {
    updateParams((previousParams) => {
      return { ...previousParams, createModal: true };
    });
  }

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderBottom: 1,
        borderColor: 'grey.300',
      }}
    >
      <Typography variant="h6">Policies</Typography>

      <Button variant="contained" onClick={openCreatePolicyDialog}>
        Add New
      </Button>
    </Stack>
  );
}
