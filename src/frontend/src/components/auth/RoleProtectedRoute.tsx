import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetCallerUserRole } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { UserRole } from '../../backend';
import { Loader2 } from 'lucide-react';

interface RoleProtectedRouteProps {
  children: ReactNode;
  requiredRole: 'admin' | 'user';
}

export default function RoleProtectedRoute({ children, requiredRole }: RoleProtectedRouteProps) {
  const navigate = useNavigate();
  const { data: userRole, isLoading, isFetched, error } = useGetCallerUserRole();
  const [hasCheckedAccess, setHasCheckedAccess] = useState(false);

  useEffect(() => {
    // Only check access once data is fetched
    if (!isFetched || hasCheckedAccess) {
      return;
    }

    // Handle error case
    if (error) {
      console.error('Role check error:', error);
      toast.error('Failed to verify permissions');
      navigate({ to: '/command-center' });
      setHasCheckedAccess(true);
      return;
    }

    // Check if user has required access
    if (userRole) {
      const hasAccess =
        requiredRole === 'admin'
          ? userRole === UserRole.admin
          : userRole === UserRole.admin || userRole === UserRole.user;

      if (!hasAccess) {
        toast.error('Access Denied: Insufficient permissions');
        navigate({ to: '/command-center' });
        setHasCheckedAccess(true);
      } else {
        setHasCheckedAccess(true);
      }
    }
  }, [userRole, isFetched, hasCheckedAccess, requiredRole, navigate, error]);

  // Show loading state while checking permissions
  if (isLoading || !isFetched || !hasCheckedAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-400" />
          <p className="text-gray-400">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  // Check access one more time before rendering
  const hasAccess =
    requiredRole === 'admin'
      ? userRole === UserRole.admin
      : userRole === UserRole.admin || userRole === UserRole.user;

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}
