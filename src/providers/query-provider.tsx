import {
  QueryCache,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Used for error logging, debugging, monitoring
      if (import.meta.env.DEV) {
        console.error('Query Error', {
          queryKey: query.queryKey,
          error,
        });
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // Used for mutation logging, debugging, monitoring
      if (import.meta.env.DEV) {
        console.error('Mutation Error', {
          mutationKey: mutation.options.mutationKey,
          error,
        });
      }
    },
  }),

  defaultOptions: {
    queries: {
      throwOnError: true, // Important for error boundaries, QueryErrorResetBoundary
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,

      // Avoid retrying client errors (4xx).
      retry: (failureCount, error) => {
        const status = (
          error as {
            response?: {
              status?: number;
            };
          }
        )?.response?.status;

        // Do not retry invalid requests.
        if (typeof status === 'number' && status >= 400 && status < 500) {
          return false;
        }

        // Retry transient/server failures.
        return failureCount < 2;
      },

      // Exponential backoff.
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),

      structuralSharing: true, // improves render stability for large dashboard datasets
    },

    mutations: {
      retry: false,
      throwOnError: false,
    },
  },
});

// Singleton QueryClient.
export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
