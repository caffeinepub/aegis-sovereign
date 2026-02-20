import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from '../errors/ErrorBoundary';
import { isAuthenticated } from '@/utils/localStorageAuth';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check authentication status
    const authenticated = isAuthenticated();
    
    if (!authenticated) {
      navigate({ to: '/login' });
    } else {
      setIsChecking(false);
    }
  }, [navigate]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
