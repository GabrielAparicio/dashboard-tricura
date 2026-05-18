import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import DetailedPolicy from './detailed-policy';

interface DetailedPolicySectionProps {
  policyId: string;
}

export default function DetailedPolicySection({
  policyId,
}: DetailedPolicySectionProps) {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong with policy details...</div>}
    >
      <Suspense fallback={<div>Loading policy details...</div>}>
        <DetailedPolicy policyID={policyId} />
      </Suspense>
    </ErrorBoundary>
  );
}
