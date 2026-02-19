import { ReactNode, useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from '../errors/ErrorBoundary';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { identity, isInitializing, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  // Handle navigation in useEffect to avoid rendering issues
  useEffect(() => {
    // Wait for initialization to complete
    if (isInitializing) {
      setShouldRender(false);
      return;
    }

    // If not authenticated and not in the process of logging in, redirect
    if (!identity && loginStatus !== 'logging-in') {
      setShouldRender(false);
      navigate({ to: '/login' });
      return;
    }

    // If authenticated, allow rendering
    if (identity && loginStatus === 'success') {
      setShouldRender(true);
    }
  }, [identity, isInitializing, loginStatus, navigate]);

  // Show loading state while initializing or during authentication
  if (isInitializing || loginStatus === 'logging-in' || !shouldRender) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-400" />
          <p className="text-gray-400">
            {isInitializing ? 'Initializing...' : loginStatus === 'logging-in' ? 'Authenticating...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Only render children when authenticated and ready
  if (!identity) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
