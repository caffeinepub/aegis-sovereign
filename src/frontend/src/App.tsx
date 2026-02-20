import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CommandCenter from './pages/CommandCenter';
import NeuralLab from './pages/NeuralLab';
import SentinelProtocol from './pages/SentinelProtocol';
import DeviceSync from './pages/DeviceSync';
import AnalyticsVault from './pages/AnalyticsVault';
import Subscriptions from './pages/Subscriptions';
import TacticalRemote from './pages/TacticalRemote';
import AdminPanel from './pages/AdminPanel';
import DevMetrics from './pages/DevMetrics';
import Settings from './pages/Settings';
import MobileBiometric from './pages/MobileBiometric';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageTransition from './components/transitions/PageTransition';
import ErrorBoundary from './components/errors/ErrorBoundary';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <PageTransition>
      <LandingPage />
    </PageTransition>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <PageTransition>
      <LoginPage />
    </PageTransition>
  ),
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: () => (
    <PageTransition>
      <SignupPage />
    </PageTransition>
  ),
});

const remoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote',
  component: () => (
    <PageTransition>
      <TacticalRemote />
    </PageTransition>
  ),
});

const mobileBiometricRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mobile-biometric',
  component: () => (
    <PageTransition>
      <MobileBiometric />
    </PageTransition>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const commandCenterRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: () => (
    <PageTransition>
      <CommandCenter />
    </PageTransition>
  ),
});

const neuralLabRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/neural-lab',
  component: () => (
    <PageTransition>
      <NeuralLab />
    </PageTransition>
  ),
});

const sentinelRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/sentinel',
  component: () => (
    <PageTransition>
      <SentinelProtocol />
    </PageTransition>
  ),
});

const deviceSyncRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/device-sync',
  component: () => (
    <PageTransition>
      <DeviceSync />
    </PageTransition>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/analytics',
  component: () => (
    <PageTransition>
      <AnalyticsVault />
    </PageTransition>
  ),
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/subscriptions',
  component: () => (
    <PageTransition>
      <Subscriptions />
    </PageTransition>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/settings',
  component: () => (
    <PageTransition>
      <Settings />
    </PageTransition>
  ),
});

const adminPanelRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/admin-panel',
  component: () => (
    <PageTransition>
      <AdminPanel />
    </PageTransition>
  ),
});

const devMetricsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/dev-metrics',
  component: () => (
    <PageTransition>
      <DevMetrics />
    </PageTransition>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  remoteRoute,
  mobileBiometricRoute,
  dashboardRoute.addChildren([
    commandCenterRoute,
    neuralLabRoute,
    sentinelRoute,
    deviceSyncRoute,
    analyticsRoute,
    subscriptionsRoute,
    settingsRoute,
    adminPanelRoute,
    devMetricsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
