import { QueryProvider } from './query-provider';
import AppRouterProvider from './router-provider';

export default function AppProvider() {
  return (
    <QueryProvider>
      <AppRouterProvider />
    </QueryProvider>
  );
}
