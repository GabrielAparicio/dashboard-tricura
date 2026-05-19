import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { useSearch } from '../hooks/use-search-params';

export default function SearchInput() {
  const [localSearch, setLocalSearch] = useState('');
  const { updateParams } = useSearch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParams((previousParams) => {
        return { ...previousParams, page: 1, search: localSearch || undefined };
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [localSearch]);

  return (
    <Stack
      sx={{
        width: {
          xs: '100%',
          md: '35%',
        },
      }}
    >
      <TextField
        size="small"
        placeholder="Search accounts by name..."
        value={localSearch}
        onChange={(event) => setLocalSearch(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
}
