import { useEffect, useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SiGoogle } from 'react-icons/si';

export default function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    const axonSession = localStorage.getItem('AXON_SESSION');
    if (!axonSession && !identity) {
      // Show sign in page
      return;
    }
    if (axonSession && identity) {
      navigate({ to: '/command-center' });
    }
  }, [identity, navigate]);

  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
      localStorage.setItem('AXON_SESSION', JSON.stringify({
        timestamp: Date.now(),
        authenticated: true
      }));
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

  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    try {
      await login();
      localStorage.setItem('AXON_SESSION', JSON.stringify({
        timestamp: Date.now(),
        authenticated: true
      }));
      toast.success('Account created successfully');
      navigate({ to: '/command-center' });
    } catch (error: any) {
      console.error('Account creation error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg p-8 shadow-lg">
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
            <h1 className="text-2xl font-bold text-[#001529] mb-2">Welcome to AXON</h1>
            <p className="text-sm text-gray-600">Secure your meetings with sovereign intelligence</p>
          </div>

          {/* Sign up with Google Button */}
          <Button
            onClick={handleCreateAccount}
            disabled={isLoggingIn || isCreatingAccount}
            className="w-full bg-[#1890FF] hover:bg-[#1890FF]/90 text-white font-semibold mb-3"
          >
            <SiGoogle className="mr-2 h-4 w-4" />
            {isCreatingAccount ? 'Creating Account...' : 'Sign up with Google'}
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn || isCreatingAccount}
            variant="outline"
            className="w-full border-[#1890FF] text-[#1890FF] hover:bg-[#1890FF]/10 font-semibold"
          >
            {isLoggingIn ? 'Signing in...' : 'Sign in with Internet Identity'}
          </Button>

          {/* Info Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Secure, anonymous authentication powered by Internet Computer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
