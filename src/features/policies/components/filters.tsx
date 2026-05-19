import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTableFilters } from '../hooks/use-search-params';
import FiltersModal from './filters-modal';

export default function Filters() {
  const { activeFilters, clearAllFilters, updateParams } = useTableFilters();
  const activeFiltersCount = activeFilters.length;

  const openFilterModalHandler = () => {
    updateParams((previousParams) => {
      return { ...previousParams, filtersModal: true };
    });
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ width: '100%' }}
      >
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={openFilterModalHandler}
        >
          Filters
          {activeFiltersCount > 0 ? ` ${activeFiltersCount}` : ''}
        </Button>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Stack direction="row" sx={{ flex: 9 }}>
            {activeFilters.map((filter) => (
              <Chip
                key={filter.label}
                size="small"
                label={`${filter.label}: ${filter.value}`}
                onDelete={filter.deleteHandler}
                sx={{
                  color: `filter.main`,
                  bgcolor: `filter.transparent`,
                  fontWeight: 700,
                }}
              />
            ))}
          </Stack>

          <Button
            sx={{ flex: 2, flexWrap: 'nowrap' }}
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </Stack>
      </Stack>

      <FiltersModal />
    </>
  );
}

/*
<Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={openDialog}
          >
            Filters
            {activeFiltersCount > 0 ? ` ${activeFiltersCount}` : ''}
          </Button>

          <ActiveFilters
            filters={filters}
            onDeleteRegion={handleDeleteRegion}
            onDeleteEffectiveDate={handleDeleteEffectiveDate}
            onDeleteRisk={handleDeleteRisk}
            onDeletePremium={handleDeletePremium}
            onDeleteClaims={handleDeleteClaims}
          />
*/
