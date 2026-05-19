import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Controller, useWatch, type Control } from 'react-hook-form';
import type { PolicyFormFilters } from '../types';

type RangeSliderProps = {
  label: string;
  minName:
    | 'premiumRange.min'
    | 'claimsTotalRange.min'
    | 'reimbursementRiskRange.min';
  maxName:
    | 'premiumRange.max'
    | 'claimsTotalRange.max'
    | 'reimbursementRiskRange.max';
  sliderMin: number;
  sliderMax: number;
  step: number;
  leftLabel: string;
  rightLabel: string;
  control: Control<PolicyFormFilters>;
};

export default function RangeSlider({
  label,
  minName,
  maxName,
  sliderMin,
  sliderMax,
  step,
  leftLabel,
  rightLabel,
  control,
}: RangeSliderProps) {
  const min = useWatch<PolicyFormFilters>({
    control,
    name: minName,
  }) as number;

  const max = useWatch<PolicyFormFilters>({
    control,
    name: maxName,
  }) as number;

  const marks = useMemo(
    () => [
      {
        value: sliderMin,
        label: leftLabel,
      },
      {
        value: sliderMax,
        label: rightLabel,
      },
    ],
    [leftLabel, rightLabel, sliderMax, sliderMin],
  );

  return (
    <Stack spacing={2}>
      <FormLabel>{label}</FormLabel>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name={minName}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label="Min"
                fullWidth
                value={field.value}
                onChange={(event) => {
                  field.onChange(Number(event.target.value));
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name={maxName}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="number"
                label="Max"
                fullWidth
                value={field.value}
                onChange={(event) => {
                  field.onChange(Number(event.target.value));
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name={minName}
        control={control}
        render={({ field: minField }) => (
          <Controller
            name={maxName}
            control={control}
            render={({ field: maxField }) => (
              <Box
                sx={{
                  px: 1,
                }}
              >
                <Slider
                  value={[min, max]}
                  min={sliderMin}
                  max={sliderMax}
                  step={step}
                  marks={marks}
                  valueLabelDisplay="auto"
                  onChange={(_, value) => {
                    const [nextMin, nextMax] = value as number[];

                    minField.onChange(nextMin);
                    maxField.onChange(nextMax);
                  }}
                />
              </Box>
            )}
          />
        )}
      />
    </Stack>
  );
}
