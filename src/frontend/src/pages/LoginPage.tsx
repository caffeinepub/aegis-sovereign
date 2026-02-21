import { useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const axonSession = sessionStorage.getItem('AXON_SESSION');
    if (axonSession && identity) {
      navigate({ to: '/command-center' });
    }
  }, [identity, navigate]);

  const isLoggingIn = loginStatus === 'logging-in';
  const buttonText = isLoggingIn ? 'Connecting...' : 'Login with Internet Identity';

  const handleLogin = async () => {
    try {
      await login();
      sessionStorage.setItem('AXON_SESSION', 'active');
      toast.success('Successfully authenticated');
      navigate({ to: '/command-center' });
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        toast.error('Already authenticated. Please refresh the page.');
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border-2 border-emerald-500 rounded-lg p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/axon-logo.dim_800x800.png"
              alt="AXON"
              className="h-16 w-16"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to AXON</h1>
            <p className="text-sm text-muted-foreground">Secure authentication via Internet Identity</p>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-background font-semibold"
          >
            {buttonText}
          </Button>

          {/* Info Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Internet Identity provides secure, anonymous authentication without passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
