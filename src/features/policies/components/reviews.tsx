import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { Review } from '../types';
import { formatDate } from '../utils';

const severityColors = {
  critical: {
    main: 'critical.main',
    transparent: 'critical.transparent',
  },
  high: {
    main: 'high.main',
    transparent: 'high.transparent',
  },
  medium: {
    main: 'medium.main',
    transparent: 'medium.transparent',
  },
  low: {
    main: 'low.main',
    transparent: 'low.transparent',
  },
};

interface ReviewsProps {
  reviewList: Review[];
}

export default function Reviews({ reviewList }: ReviewsProps) {
  return (
    <Stack
      sx={{
        mt: 1,
      }}
    >
      {reviewList.map((review, index) => (
        <Stack key={index}>
          <Stack
            direction="row"
            sx={{
              py: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                }}
              >
                {review.type}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mt: 0.25,
                }}
              >
                {formatDate(review.dueDate)}
              </Typography>
            </Stack>

            <Chip
              label={review.severity}
              size="small"
              sx={{
                height: 28,
                borderRadius: 999,
                fontWeight: 700,
                textTransform: 'lowercase',
                bgcolor: severityColors[review.severity].transparent,
                color: severityColors[review.severity].main,
              }}
            />
          </Stack>

          {index !== reviewList.length - 1 && (
            <Divider
              sx={{
                borderColor: 'grey.100',
              }}
            />
          )}
        </Stack>
      ))}
    </Stack>
  );
}
