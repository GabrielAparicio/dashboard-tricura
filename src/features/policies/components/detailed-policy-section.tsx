import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import DetailedPolicy from './detailed-policy';

interface DetailedPolicySectionProps {
  policyId: string;
}

function PolicySkeleton() {
  return (
    <Stack>
      <Typography variant="h6" gutterBottom align="center">
        Policy details loading...
      </Typography>
    </Stack>
  );
}

export default function DetailedPolicySection({
  policyId,
}: DetailedPolicySectionProps) {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong with policy details...</div>}
    >
      <Suspense fallback={<PolicySkeleton />}>
        <DetailedPolicy policyID={policyId} />
      </Suspense>
    </ErrorBoundary>
  );
}
