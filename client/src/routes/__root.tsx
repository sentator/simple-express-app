import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { RouterContext } from '../types/router';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
