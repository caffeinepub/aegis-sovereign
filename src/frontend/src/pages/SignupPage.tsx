import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [hasAttemptedSignup, setHasAttemptedSignup] = useState(false);
  const { login, isLoggingIn, identity, loginStatus } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const saveProfileMutation = useSaveCallerUserProfile();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim()) {
      toast.error('Please enter a username');
      return;
    }

    try {
      setHasAttemptedSignup(true);
      await login();
      toast.info('Authentication successful, creating profile...');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to authenticate');
      setHasAttemptedSignup(false);
    }
  };

  // Handle profile creation after successful authentication and actor initialization
  useEffect(() => {
    if (
      identity &&
      hasAttemptedSignup &&
      loginStatus === 'success' &&
      actor &&
      !actorFetching &&
      !saveProfileMutation.isPending &&
      !saveProfileMutation.isSuccess
    ) {
      const performSignup = async () => {
        try {
          await saveProfileMutation.mutateAsync({ name: username || 'User' });
          toast.success('Account created successfully!');
          // Small delay to ensure backend state is consistent
          setTimeout(() => {
            navigate({ to: '/dashboard' });
          }, 100);
        } catch (error) {
          console.error('Profile creation error:', error);
          toast.error('Failed to create account');
          setHasAttemptedSignup(false);
        }
      };

      performSignup();
    }
  }, [identity, hasAttemptedSignup, loginStatus, actor, actorFetching, saveProfileMutation, username, navigate]);

  const isProcessing = isLoggingIn || actorFetching || (hasAttemptedSignup && saveProfileMutation.isPending);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="text-center">
          <img src="/assets/generated/aegis-logo.dim_512x512.png" alt="Axon" className="mx-auto mb-4 h-16 w-16" />
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join Axon and secure your meetings</CardDescription>
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
                {isLoggingIn
                  ? 'Authenticating...'
                  : actorFetching
                    ? 'Initializing...'
                    : 'Creating Account...'}
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
