import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { AuthPage } from "@/features/auth/components/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { requireAuth, requireGuest } from "./route-guards";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/auth",
      replace: true,
    });
  },
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  dashboardRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
