import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing) {
      const axonSession = localStorage.getItem('AXON_SESSION');
      if (!identity || !axonSession) {
        navigate({ to: '/login' });
      }
    }
  }, [identity, isInitializing, navigate]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1890FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const axonSession = localStorage.getItem('AXON_SESSION');
  if (!identity || !axonSession) {
    return null;
  }

  return <>{children}</>;
}
