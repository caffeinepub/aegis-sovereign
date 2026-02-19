import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSignUp } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [hasAttemptedSignup, setHasAttemptedSignup] = useState(false);
  const { login, isLoggingIn, identity, loginStatus } = useInternetIdentity();
  const signUpMutation = useSignUp();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    try {
      setHasAttemptedSignup(true);
      login();
      toast.info('Redirecting to Internet Identity...');
    } catch (error) {
      toast.error('Failed to sign up');
      setHasAttemptedSignup(false);
    }
  };

  // Handle signup after successful authentication
  useEffect(() => {
    if (identity && hasAttemptedSignup && loginStatus === 'success' && !signUpMutation.isPending) {
      const performSignup = async () => {
        try {
          await signUpMutation.mutateAsync(username || 'User');
          toast.success('Account created successfully!');
          navigate({ to: '/dashboard' });
        } catch (error) {
          toast.error('Failed to create account');
          setHasAttemptedSignup(false);
        }
      };

      performSignup();
    }
  }, [identity, hasAttemptedSignup, loginStatus, signUpMutation, username, navigate]);

  const isProcessing = isLoggingIn || (hasAttemptedSignup && signUpMutation.isPending);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="text-center">
          <img src="/assets/generated/aegis-logo.dim_512x512.png" alt="Aegis" className="mx-auto mb-4 h-16 w-16" />
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join Aegis Sovereign and secure your meetings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-white/10 bg-white/5"
              disabled={isProcessing}
            />
          </div>
          <Button className="w-full" size="lg" onClick={handleSignup} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLoggingIn ? 'Authenticating...' : 'Creating Account...'}
              </>
            ) : (
              'Sign Up with Internet Identity'
            )}
          </Button>
          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate({ to: '/login' })}
              className="text-blue-400 hover:text-blue-300"
              disabled={isProcessing}
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
