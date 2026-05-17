import { RouterProvider } from '@tanstack/react-router';
import { router } from '../router';

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
