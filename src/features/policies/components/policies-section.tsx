import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import PoliciesTable from './policies-table.tsx';
import PoliciesToolbar from './policies-toobar.tsx';
import TableTitle from './table-title.tsx';

export default function PoliciesSection() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong with the table...</div>}>
      <Suspense fallback={<div>Loading the table...</div>}>
        <PoliciesToolbar />
        <TableTitle />
        <PoliciesTable />
      </Suspense>
    </ErrorBoundary>
  );
}
