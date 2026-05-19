import { ErrorBoundary } from 'react-error-boundary';
import PoliciesTable from './policies-table.tsx';
import PoliciesToolbar from './policies-toobar.tsx';
import TableTitle from './table-title.tsx';

export default function PoliciesDashboardPage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong with the table...</div>}>
      <PoliciesToolbar />
      <TableTitle />
      <PoliciesTable />
    </ErrorBoundary>
  );
}
