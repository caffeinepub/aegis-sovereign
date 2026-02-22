import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { TelemetryProvider } from '@/contexts/TelemetryContext';
import { GhostModeProvider } from '@/contexts/GhostModeContext';
import ErrorBoundary from './components/errors/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import CommandCenter from './pages/CommandCenter';
import NeuralLab from './pages/NeuralLab';
import SentinelProtocol from './pages/SentinelProtocol';
import DeviceSync from './pages/DeviceSync';
import AnalyticsVault from './pages/AnalyticsVault';
import TeamManagementPage from './pages/TeamManagementPage';
import Subscriptions from './pages/Subscriptions';
import AdminPanel from './pages/AdminPanel';
import TacticalRemote from './pages/TacticalRemote';
import MobileBiometric from './pages/MobileBiometric';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';

// Root route with Outlet
const rootRoute = createRootRoute({
  component: () => (
    <TelemetryProvider>
      <GhostModeProvider>
        <ErrorBoundary>
          <Toaster />
          <Outlet />
        </ErrorBoundary>
      </GhostModeProvider>
    </TelemetryProvider>
  ),
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

// Mobile routes
const remoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/remote',
  component: TacticalRemote,
});

const mobileBiometricRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mobile-biometric',
  component: MobileBiometric,
});

// Dashboard routes
const commandCenterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/command-center',
  component: () => (
    <DashboardLayout>
      <CommandCenter />
    </DashboardLayout>
  ),
});

const neuralLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/neural-lab',
  component: () => (
    <DashboardLayout>
      <NeuralLab />
    </DashboardLayout>
  ),
});

const sentinelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/sentinel',
  component: () => (
    <DashboardLayout>
      <SentinelProtocol />
    </DashboardLayout>
  ),
});

const deviceSyncRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/device-sync',
  component: () => (
    <DashboardLayout>
      <DeviceSync />
    </DashboardLayout>
  ),
});

const analyticsVaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/analytics-vault',
  component: () => (
    <DashboardLayout>
      <AnalyticsVault />
    </DashboardLayout>
  ),
});

const teamManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/team-management',
  component: () => (
    <DashboardLayout>
      <TeamManagementPage />
    </DashboardLayout>
  ),
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/subscriptions',
  component: () => (
    <DashboardLayout>
      <Subscriptions />
    </DashboardLayout>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/admin',
  component: () => (
    <DashboardLayout>
      <RoleProtectedRoute requiredRole="admin">
        <AdminPanel />
      </RoleProtectedRoute>
    </DashboardLayout>
  ),
});

// Index route redirects to command center
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/command-center';
    }
    return null;
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  remoteRoute,
  mobileBiometricRoute,
  commandCenterRoute,
  neuralLabRoute,
  sentinelRoute,
  deviceSyncRoute,
  analyticsVaultRoute,
  teamManagementRoute,
  subscriptionsRoute,
  adminRoute,
]);

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
