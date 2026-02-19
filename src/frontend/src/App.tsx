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
import TacticalRemote from './pages/TacticalRemote';
import AdminPanel from './pages/AdminPanel';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import PageTransition from './components/transitions/PageTransition';
import PanicProtocol from './components/sentinel/PanicProtocol';
import ErrorBoundary from './components/errors/ErrorBoundary';
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  remoteRoute,
  dashboardRoute.addChildren([
    commandCenterRoute,
    neuralLabRoute,
    sentinelRoute,
    deviceSyncRoute,
    analyticsRoute,
    adminPanelRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppContent() {
  const [panicActive, setPanicActive] = useState(false);
  const triggerPanic = useTriggerPanic();

  useKeyboardShortcut(['Control', 'Shift', 'P'], () => {
    triggerPanic.mutate('Windows Update');
    setPanicActive(true);
  });

  return (
    <>
      <RouterProvider router={router} />
      {panicActive && <PanicProtocol onClose={() => setPanicActive(false)} />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ErrorBoundary>
        <GhostModeProvider>
          <AppContent />
        </GhostModeProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
