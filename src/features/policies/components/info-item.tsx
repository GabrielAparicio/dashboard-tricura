import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface InfoItemProps {
  label: string;
  value: string;
  large?: boolean;
}

export default function InfoItem({
  label,
  value,
  large = false,
}: InfoItemProps) {
  return (
    <Box
      sx={{
        minWidth: 140,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant={large ? 'h2' : 'h6'}
        sx={{
          fontWeight: 'bold',
          lineHeight: 1.2,
          fontSize: large ? 28 : undefined,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
