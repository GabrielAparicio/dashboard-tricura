import Stack from '@mui/material/Stack';
import SearchInput from './search-input';
import Filters from './filters';
import { usePoliciesQuery } from '../hooks/use-policies-query';

export default function PoliciesToolbar() {
  const { isLoading } = usePoliciesQuery();

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
        pointerEvents: isLoading ? 'none' : 'auto',
        cursor: isLoading ? 'not-allowed' : 'auto',
        userSelect: isLoading ? 'none' : 'auto',
        opacity: isLoading ? 0.4 : 1,
      }}
      spacing={2}
    >
      <SearchInput />
      <Filters />
    </Stack>
  );
}
