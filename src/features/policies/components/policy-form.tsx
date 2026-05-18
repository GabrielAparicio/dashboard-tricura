import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { policyFormSchema } from '../schemas';
import { REGIONS, REVIEW_TYPES, SEVERITIES } from '../constants';
import type {
  PolicyFormProps,
  PendingReview,
  Policy,
  PolicyPayload,
} from '../types';
import {
  convertFormValuesToPolicyPayload,
  convertPolicyToFormValues,
  getDaysUntilRenewal,
} from '../utils';

const today = new Date();

const createPolicyDefaultValues: PolicyFormProps = {
  accountName: '',
  region: 'Northeast',
  facilityCount: 0,
  effectiveDate: today,
  daysUntilRenewal: getDaysUntilRenewal(today),
  premium: 0,
  claimsTotal: 0,
  reimbursementRisk: 0.5,
  missingDocuments: 0,
  expiredDocuments: 0,
  pendingReviews: [],
};

function SectionTitle({ title }: { title: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: 700,
          color: 'text.secondary',
        }}
      >
        {title}
      </Typography>

      <Divider sx={{ mt: 0.75 }} />
    </Box>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  error,
  helperText,
  readOnly,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
}) {
  return (
    <TextField
      fullWidth
      label={label}
      type="number"
      value={value}
      error={error}
      helperText={helperText}
      onChange={(event) => {
        const parsed = Number(event.target.value);
        onChange(Number.isNaN(parsed) ? 0 : parsed);
      }}
      slotProps={{
        htmlInput: {
          readOnly,
        },
      }}
    />
  );
}

interface PolicyFormComponentProps {
  policy?: Policy;
  onSubmitHandler: (policyPayload: PolicyPayload) => Promise<void>;
  closeHandler: () => void;
}

export default function PolicyForm({
  policy,
  closeHandler,
  onSubmitHandler,
}: PolicyFormComponentProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PolicyFormProps>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: policy
      ? convertPolicyToFormValues(policy)
      : createPolicyDefaultValues,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pendingReviews',
  });

  const newPendingReview: PendingReview = {
    type: 'License',
    dueDate: new Date(),
    severity: 'low',
  };

  const onSubmit = (values: PolicyFormProps) => {
    const payload = convertFormValuesToPolicyPayload(values);
    onSubmitHandler(payload);
    closeHandler();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3 }}>
          <SectionTitle title="Account" />

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                control={control}
                name="accountName"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Account name"
                    error={!!errors.accountName}
                    helperText={errors.accountName?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                control={control}
                name="region"
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.region}>
                    <InputLabel>Region</InputLabel>

                    <Select {...field} label="Region">
                      {REGIONS.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>

                    <FormHelperText>{errors.region?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                control={control}
                name="facilityCount"
                render={({ field }) => (
                  <NumberInput
                    label="Facility count"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.facilityCount}
                    helperText={errors.facilityCount?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <SectionTitle title="Renewal" />

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="effectiveDate"
                render={({ field }) => (
                  <DatePicker
                    label="Effective date"
                    value={field.value}
                    onChange={(date) => {
                      if (date) {
                        field.onChange(date);
                        setValue('daysUntilRenewal', getDaysUntilRenewal(date));
                      }
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.effectiveDate,
                        helperText: errors.effectiveDate?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="daysUntilRenewal"
                render={({ field }) => (
                  <NumberInput
                    label="Days until renewal"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.daysUntilRenewal}
                    helperText={errors.daysUntilRenewal?.message}
                    readOnly
                  />
                )}
              />
            </Grid>
          </Grid>

          <SectionTitle title="Financials" />

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="premium"
                render={({ field }) => (
                  <NumberInput
                    label="Premium ($)"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.premium}
                    helperText={errors.premium?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="claimsTotal"
                render={({ field }) => (
                  <NumberInput
                    label="Claims total ($)"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.claimsTotal}
                    helperText={errors.claimsTotal?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <SectionTitle title="Reimbursement risk" />

          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                  control={control}
                  name="reimbursementRisk"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Value"
                      value={field.value.toFixed(2)}
                    />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <Controller
                  control={control}
                  name="reimbursementRisk"
                  render={({ field }) => (
                    <Slider
                      value={field.value}
                      onChange={(_, value) => {
                        field.onChange(value);
                      }}
                      min={0}
                      max={1}
                      step={0.01}
                      valueLabelDisplay="off"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                0.00
              </Typography>

              <Typography variant="caption" color="text.secondary">
                1.00
              </Typography>
            </Stack>
          </Box>

          <SectionTitle title="Compliance" />

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="missingDocuments"
                render={({ field }) => (
                  <NumberInput
                    label="Missing documents"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.missingDocuments}
                    helperText={errors.missingDocuments?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                control={control}
                name="expiredDocuments"
                render={({ field }) => (
                  <NumberInput
                    label="Expired documents"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.expiredDocuments}
                    helperText={errors.expiredDocuments?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Stack
            direction="row"
            sx={{
              mb: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <SectionTitle title="Pending reviews" />
            </Box>

            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => append(newPendingReview)}
            >
              Add review
            </Button>
          </Stack>

          <Stack spacing={2}>
            {fields.map((fieldItem, index) => (
              <Grid
                key={fieldItem.id}
                container
                spacing={1.5}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Grid size={{ xs: 12, md: 5 }}>
                  <Controller
                    control={control}
                    name={`pendingReviews.${index}.type`}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>

                        <Select {...field} label="Type">
                          {REVIEW_TYPES.map((reviewType) => (
                            <MenuItem key={reviewType} value={reviewType}>
                              {reviewType}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller
                    control={control}
                    name={`pendingReviews.${index}.dueDate`}
                    render={({ field }) => (
                      <DatePicker
                        label="Due date"
                        value={field.value}
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value);
                          }
                        }}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 10, md: 3 }}>
                  <Controller
                    control={control}
                    name={`pendingReviews.${index}.severity`}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Severity</InputLabel>

                        <Select {...field} label="Severity">
                          {SEVERITIES.map((severity) => (
                            <MenuItem key={severity} value={severity}>
                              {severity}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid
                  size={{ xs: 2, md: 1 }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton onClick={() => remove(index)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}
        >
          <Button variant="text" onClick={closeHandler}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Create Policy
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
