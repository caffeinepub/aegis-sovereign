import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isSessionActive } from '@/utils/localStorageAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isSessionActive()) {
        navigate({ to: '/login' });
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <Loader2 className="h-8 w-8 text-[#10b981] animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
