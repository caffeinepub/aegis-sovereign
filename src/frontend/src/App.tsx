import { StrictMode, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { TelemetryProvider } from '@/contexts/TelemetryContext';
import { GhostModeProvider } from '@/contexts/GhostModeContext';
import { initializeStorage } from '@/utils/localStorageAuth';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import UnifiedDashboard from '@/pages/UnifiedDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

type ViewType = 'homepage-view' | 'login' | 'dashboard';

export default function App() {
  // Force-reset to 'homepage-view' as primary entry point
  const [currentView, setCurrentView] = useState<ViewType>('homepage-view');

  // Initialize storage and view on mount
  useEffect(() => {
    // Initialize localStorage with default values
    initializeStorage();
    
    // Check if user is already logged in
    try {
      const session = localStorage.getItem('AXON_SESSION');
      if (session === 'ACTIVE') {
        setCurrentView('dashboard');
      } else {
        // Force homepage as default
        setCurrentView('homepage-view');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setCurrentView('homepage-view');
    }
  }, []);

  const handleShowLogin = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    // Clear all session data
    try {
      localStorage.removeItem('AXON_SESSION');
      localStorage.removeItem('AXON_CURRENT_USER');
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing session:', error);
    }
    setCurrentView('homepage-view');
  };

  const handleForceDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientProvider client={queryClient}>
            <TelemetryProvider>
              <GhostModeProvider>
                <div id="homepage-view" style={{ display: currentView === 'homepage-view' ? 'block' : 'none' }}>
                  <LandingPage onShowLogin={handleShowLogin} />
                </div>
                <div id="login-view" style={{ display: currentView === 'login' ? 'block' : 'none' }}>
                  <LoginPage onLoginSuccess={handleLoginSuccess} onForceDashboard={handleForceDashboard} />
                </div>
                <div id="dashboard-view" style={{ display: currentView === 'dashboard' ? 'block' : 'none' }}>
                  <UnifiedDashboard onLogout={handleLogout} />
                </div>
                <Toaster />
              </GhostModeProvider>
            </TelemetryProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
