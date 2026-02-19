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
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageTransition from './components/transitions/PageTransition';
import PanicProtocol from './components/sentinel/PanicProtocol';
import ErrorBoundary from './components/errors/ErrorBoundary';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { useState } from 'react';

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

  useKeyboardShortcut(['Control', 'Shift', 'P'], () => {
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
        <AppContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
