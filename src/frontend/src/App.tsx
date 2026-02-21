import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TelemetryProvider } from '@/contexts/TelemetryContext';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CommandCenter from './pages/CommandCenter';
import NeuralLab from './pages/NeuralLab';
import SentinelProtocol from './pages/SentinelProtocol';
import DeviceSync from './pages/DeviceSync';
import AnalyticsVault from './pages/AnalyticsVault';
import Subscriptions from './pages/Subscriptions';
import TacticalRemote from './pages/TacticalRemote';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import MobileBiometric from './pages/MobileBiometric';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageTransition from './components/transitions/PageTransition';
import ErrorBoundary from './components/errors/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function SessionChecker() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    if (!isInitializing) {
      const axonSession = sessionStorage.getItem('AXON_SESSION');
      if (axonSession && identity) {
        navigate({ to: '/command-center' });
      }
    }
  }, [identity, isInitializing, navigate]);

  return null;
}

const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TelemetryProvider>
        <ErrorBoundary>
          <SessionChecker />
          <Outlet />
          <Toaster />
        </ErrorBoundary>
      </TelemetryProvider>
    </QueryClientProvider>
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

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/landing',
  component: () => (
    <PageTransition>
      <LandingPage />
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
  getParentRoute: () => rootRoute,
  path: '/command-center',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <PageTransition>
          <CommandCenter />
        </PageTransition>
      </DashboardLayout>
    </ProtectedRoute>
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  landingRoute,
  remoteRoute,
  mobileBiometricRoute,
  commandCenterRoute,
  dashboardRoute.addChildren([
    neuralLabRoute,
    sentinelRoute,
    deviceSyncRoute,
    analyticsRoute,
    subscriptionsRoute,
    settingsRoute,
    adminPanelRoute,
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
