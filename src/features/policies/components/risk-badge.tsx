import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface RiskBadgeProps {
  value: number;
}

export default function RiskBadge({ value }: RiskBadgeProps) {
  let label = 'Low';
  let color: 'low' | 'medium' | 'high' = 'low';

  if (value >= 0.7) {
    label = 'High';
    color = 'high';
  } else if (value >= 0.4) {
    label = 'Medium';
    color = 'medium';
  }

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Chip
        size="small"
        label={label}
        sx={{
          color: `${color}.main`,
          bgcolor: `${color}.transparent`,
          fontWeight: 700,
        }}
      />
      <Typography variant="body2">{value.toFixed(2)}</Typography>
    </Stack>
  );
}
