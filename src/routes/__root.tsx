import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { QueryClient } from '@tanstack/react-query';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
