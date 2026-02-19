import { ReactNode, useEffect } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from '../errors/ErrorBoundary';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { identity, isInitializing, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();

  // Handle navigation in useEffect to avoid rendering issues
  useEffect(() => {
    if (!isInitializing && !identity && loginStatus !== 'logging-in') {
      navigate({ to: '/login' });
    }
  }, [identity, isInitializing, loginStatus, navigate]);

  // Show loading state while initializing or during authentication
  if (isInitializing || loginStatus === 'logging-in') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!identity) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
