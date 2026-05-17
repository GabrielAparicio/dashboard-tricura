import { createFileRoute } from '@tanstack/react-router';
import { paramsSchema } from '../router/schemas/params-schema';
import PoliciesDashboardPage from '../features/policies/components/policies-dashboard-page';

export const Route = createFileRoute('/dashboard')({
  validateSearch: paramsSchema,
  component: PoliciesDashboardPage,
});
