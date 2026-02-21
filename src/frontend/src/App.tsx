import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TelemetryProvider } from '@/contexts/TelemetryContext';
import { GhostModeProvider } from '@/contexts/GhostModeContext';
import ErrorBoundary from './components/errors/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import UnifiedDashboard from './pages/UnifiedDashboard';
import { isSessionActive } from './utils/localStorageAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [currentView, setCurrentView] = useState<'auth' | 'dashboard'>('auth');

  useEffect(() => {
    // Check if user is already logged in
    if (isSessionActive()) {
      setCurrentView('dashboard');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TelemetryProvider>
        <GhostModeProvider>
          <ErrorBoundary>
            <Toaster />
            <div id="auth-page" style={{ display: currentView === 'auth' ? 'block' : 'none' }}>
              <LoginPage onLoginSuccess={() => setCurrentView('dashboard')} />
            </div>
            <div id="dashboard-page" style={{ display: currentView === 'dashboard' ? 'block' : 'none' }}>
              <UnifiedDashboard onLogout={() => setCurrentView('auth')} />
            </div>
          </ErrorBoundary>
        </GhostModeProvider>
      </TelemetryProvider>
    </QueryClientProvider>
  );
}
