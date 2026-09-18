import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { AuthPage } from "../features/auth/components/AuthPage";
import { DashboardPage } from "../pages/DashboardPage";

import { requireAuth, requireGuest } from "./route-guards";
import { NotFoundPage } from "../pages/NotFoundPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  beforeLoad: requireGuest,
  component: () => (
    <AuthPage
      onAuthenticated={() => {
        window.location.href = "/dashboard";
      }}
    />
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: requireAuth,
  component: DashboardPage,
});

const routeTree = rootRoute.addChildren([authRoute, dashboardRoute]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
