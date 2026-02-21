import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TelemetryProvider } from '@/contexts/TelemetryContext';
import { GhostModeProvider } from '@/contexts/GhostModeContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CommandCenter from './pages/CommandCenter';
import NeuralLab from './pages/NeuralLab';
import SentinelProtocol from './pages/SentinelProtocol';
import DeviceSync from './pages/DeviceSync';
import AnalyticsVault from './pages/AnalyticsVault';
import Settings from './pages/Settings';
import Subscriptions from './pages/Subscriptions';
import TacticalRemote from './pages/TacticalRemote';
import MobileBiometric from './pages/MobileBiometric';
import TeamManagementPage from './pages/TeamManagementPage';
import AdminPanel from './pages/AdminPanel';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import ErrorBoundary from './components/errors/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster />
    </>
  ),
});

// Public routes
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const tacticalRemoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tactical-remote',
  component: TacticalRemote,
});

const mobileBiometricRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/mobile-biometric',
  component: MobileBiometric,
});

// Protected dashboard routes
const commandCenterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/command-center',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <CommandCenter />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const neuralLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/neural-lab',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <NeuralLab />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const sentinelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/sentinel',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <SentinelProtocol />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const deviceSyncRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/device-sync',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <DeviceSync />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const analyticsVaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/analytics-vault',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <AnalyticsVault />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/settings',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/subscriptions',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <Subscriptions />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const teamManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/team-management',
  component: () => (
    <ProtectedRoute>
      <DashboardLayout>
        <TeamManagementPage />
      </DashboardLayout>
    </ProtectedRoute>
  ),
});

const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard/admin',
  component: () => (
    <ProtectedRoute>
      <RoleProtectedRoute requiredRole="admin">
        <DashboardLayout>
          <AdminPanel />
        </DashboardLayout>
      </RoleProtectedRoute>
    </ProtectedRoute>
  ),
});

// Create route tree
const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  tacticalRemoteRoute,
  mobileBiometricRoute,
  commandCenterRoute,
  neuralLabRoute,
  sentinelRoute,
  deviceSyncRoute,
  analyticsVaultRoute,
  settingsRoute,
  subscriptionsRoute,
  teamManagementRoute,
  adminPanelRoute,
]);

// Create router
const router = createRouter({ routeTree });

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelemetryProvider>
        <GhostModeProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </GhostModeProvider>
      </TelemetryProvider>
    </QueryClientProvider>
  );
}
