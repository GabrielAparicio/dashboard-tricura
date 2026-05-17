import { QueryProvider } from './query-provider';
import AppRouterProvider from './router-provider';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

export default function AppProvider() {
  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <AppRouterProvider />
      </ThemeProvider>
    </QueryProvider>
  );
}
