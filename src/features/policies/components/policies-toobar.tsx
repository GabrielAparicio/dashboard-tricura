import Stack from '@mui/material/Stack';
import SearchInput from './search-input';
import Filters from './filters';

export default function PoliciesToolbar() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        width: '100%',
        alignItems: { xs: 'stretch', md: 'center' },
      }}
      spacing={2}
    >
      <SearchInput />
      <Filters />
    </Stack>
  );
}
