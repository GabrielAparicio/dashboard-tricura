import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import RangeSlider from './range-slider';
import type { ParamsType, PolicyFormFilters } from '../types';
import { filtersFormSchema } from '../schemas';
import { REGIONS } from '../constants';

const defaultValues: PolicyFormFilters = {
  region: undefined,
  effectiveDateRange: {
    from: null,
    to: null,
  },
  premiumRange: {
    min: 0,
    max: 1_000_000,
  },
  claimsTotalRange: {
    min: 0,
    max: 1_000_000,
  },
  reimbursementRiskRange: {
    min: 0,
    max: 1,
  },
};

interface FilterFormProps {
  onFiltersChange: (params: Partial<ParamsType>) => void;
  closeDialog: () => void;
}

function convertFormFiltersToParams(
  filters: PolicyFormFilters,
): Partial<ParamsType> {
  return {
    region: filters.region,
    effectiveDateFrom: filters.effectiveDateRange.from?.toISOString(),
    effectiveDateTo: filters.effectiveDateRange.to?.toISOString(),
    premiumMin: filters.premiumRange.min,
    premiumMax: filters.premiumRange.max,
    claimsTotalMin: filters.claimsTotalRange.min,
    claimsTotalMax: filters.claimsTotalRange.max,
    reimbursementRiskMin: filters.reimbursementRiskRange.min,
    reimbursementRiskMax: filters.reimbursementRiskRange.max,
  };
}

export default function FiltersForm({
  onFiltersChange,
  closeDialog,
}: FilterFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PolicyFormFilters>({
    resolver: zodResolver(filtersFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (filters: PolicyFormFilters) => {
    console.log('Form filters: ', filters);
    const filterParams = convertFormFiltersToParams(filters);
    onFiltersChange(filterParams);
    // onFiltersChange(filters);
    closeDialog();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: 3,
        }}
      >
        <Stack spacing={5}>
          <FormControl>
            <FormLabel>Region</FormLabel>
            <Divider sx={{ mb: 2 }} />

            <FormGroup row>
              {REGIONS.map((region) => (
                <Controller
                  key={region}
                  name="region"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={region}
                      control={
                        <Radio
                          checked={field.value === region}
                          onChange={() => {
                            field.onChange(region);
                          }}
                        />
                      }
                    />
                  )}
                />
              ))}
            </FormGroup>

            {errors.region && (
              <Typography variant="caption" color="error">
                {errors.region.message}
              </Typography>
            )}
          </FormControl>

          <Stack spacing={2}>
            <FormLabel>Effective Date Range</FormLabel>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="effectiveDateRange.from"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="From"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />

                {errors.effectiveDateRange?.from && (
                  <Typography variant="caption" color="error">
                    {errors.effectiveDateRange.from.message}
                  </Typography>
                )}
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="effectiveDateRange.to"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="To"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />

                {errors.effectiveDateRange?.to && (
                  <Typography variant="caption" color="error">
                    {errors.effectiveDateRange.to.message}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {errors.effectiveDateRange && (
              <Typography variant="caption" color="error">
                {errors.effectiveDateRange.message}
              </Typography>
            )}
          </Stack>

          <RangeSlider
            label="Premium Range"
            minName="premiumRange.min"
            maxName="premiumRange.max"
            sliderMin={0}
            sliderMax={1_000_000}
            step={1}
            leftLabel="0"
            rightLabel="1M"
            control={control}
          />

          <RangeSlider
            label="Total Claims Range"
            minName="claimsTotalRange.min"
            maxName="claimsTotalRange.max"
            sliderMin={0}
            sliderMax={1_000_000}
            step={1}
            leftLabel="0"
            rightLabel="1M"
            control={control}
          />

          <RangeSlider
            label="Reimbursement Risk Range"
            minName="reimbursementRiskRange.min"
            maxName="reimbursementRiskRange.max"
            sliderMin={0}
            sliderMax={1}
            step={0.01}
            leftLabel="0"
            rightLabel="1.0"
            control={control}
          />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Button
              size="large"
              sx={{ whiteSpace: 'nowrap' }}
              onClick={() => reset()}
            >
              Reset all
            </Button>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              sx={{
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                width: '100%',
              }}
              spacing={2}
            >
              <Button size="large" onClick={closeDialog}>
                Cancel
              </Button>

              <Button type="submit" variant="contained" size="large">
                Apply Filters
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
