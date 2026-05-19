import Stack from '@mui/material/Stack';
import SearchInput from './search-input';
import Filters from './filters';

export default function PoliciesToolbar() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        alignItems: { xs: 'stretch', md: 'center' },
        border: 1,
        borderColor: 'grey.300',
        borderRadius: 3,
        px: 1,
        py: 1,
      }}
      spacing={2}
    >
      <SearchInput />
      <Filters />
    </Stack>
  );
}
