import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
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
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import PageTransition from './components/transitions/PageTransition';
import PanicProtocol from './components/sentinel/PanicProtocol';
import ErrorBoundary from './components/errors/ErrorBoundary';
import HotkeysReferenceModal from './components/common/HotkeysReferenceModal';
import PerformanceOverlay from './components/dev/PerformanceOverlay';
import { GhostModeProvider } from './contexts/GhostModeContext';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useState } from 'react';
import { useTriggerPanic } from './hooks/useQueries';

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
    <ProtectedRoute>
      <PageTransition>
        <MobileBiometric />
      </PageTransition>
    </ProtectedRoute>
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
    <RoleProtectedRoute requiredRole="admin">
      <PageTransition>
        <SentinelProtocol />
      </PageTransition>
    </RoleProtectedRoute>
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
    <RoleProtectedRoute requiredRole="admin">
      <PageTransition>
        <AdminPanel />
      </PageTransition>
    </RoleProtectedRoute>
  ),
});

const devMetricsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/dev-metrics',
  component: () => (
    <RoleProtectedRoute requiredRole="admin">
      <PageTransition>
        <DevMetrics />
      </PageTransition>
    </RoleProtectedRoute>
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

function App() {
  const [showPanic, setShowPanic] = useState(() => {
    return sessionStorage.getItem('panicActive') === 'true';
  });
  const [showPerformanceOverlay, setShowPerformanceOverlay] = useState(false);
  const { mutate: triggerPanic } = useTriggerPanic();

  const handleClosePanic = () => {
    setShowPanic(false);
    sessionStorage.removeItem('panicActive');
  };

  useKeyboardShortcut(['Control', 'Shift', 'P'], () => {
    setShowPanic(true);
    sessionStorage.setItem('panicActive', 'true');
    triggerPanic('keyboard-shortcut');
  });

  useKeyboardShortcut(['Control', 'Shift', 'M'], () => {
    setShowPerformanceOverlay((prev) => !prev);
  });

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <GhostModeProvider>
          <RouterProvider router={router} />
          {showPanic && <PanicProtocol onClose={handleClosePanic} />}
          <HotkeysReferenceModal />
          {showPerformanceOverlay && <PerformanceOverlay />}
        </GhostModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
