import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    toast.info('Redirecting to Internet Identity...');
  };

  if (identity) {
    navigate({ to: '/dashboard' });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="text-center">
          <img src="/assets/generated/aegis-logo.dim_512x512.png" alt="Axon" className="mx-auto mb-4 h-16 w-16" />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your Axon dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" size="lg" onClick={handleLogin} disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Sign In with Internet Identity'
            )}
          </Button>
          <div className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => navigate({ to: '/signup' })} className="text-blue-400 hover:text-blue-300">
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
