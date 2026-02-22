import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useQueries';
import ThreeBackground from '@/components/auth/ThreeBackground';
import AuthPanel from '@/components/auth/AuthPanel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginStatus, identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = !!identity;

  // Check if user needs to set up profile
  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched) {
      if (userProfile === null) {
        setShowProfileSetup(true);
      } else {
        // User has profile, navigate to dashboard
        navigate({ to: '/command-center' });
      }
    }
  }, [isAuthenticated, userProfile, profileLoading, isFetched, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.', {
        duration: 3000,
        style: {
          background: '#dc2626',
          color: 'white',
          border: '1px solid #b91c1c',
        },
      });
    }
  };

  const handleProfileSetup = async () => {
    if (!fullName.trim()) {
      toast.error('Please enter your name', { duration: 3000 });
      return;
    }

    setIsSubmitting(true);
    try {
      await saveProfileMutation.mutateAsync({ name: fullName.trim() });
      toast.success('Profile created successfully!', { duration: 2000 });
      navigate({ to: '/command-center' });
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('Failed to create profile. Please try again.', { duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while initializing
  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-[#001529] via-[#002140] to-[#001529]">
        <div className="text-center space-y-6">
          <Loader2 className="h-16 w-16 text-[#10b981] animate-spin mx-auto" />
          <p className="text-2xl font-bold text-white">Initializing Sovereign Identity...</p>
        </div>
      </div>
    );
  }

  // Show profile setup if needed
  if (showProfileSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <ThreeBackground />
        <AuthPanel shake={false} onLogoClick={() => {}}>
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome to AXON</h2>
              <p className="text-white/70">Please set up your profile to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullname" className="text-white/90 mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleProfileSetup();
                    }
                  }}
                />
              </div>

              <Button
                onClick={handleProfileSetup}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  'Continue to Dashboard'
                )}
              </Button>
            </div>
          </div>
        </AuthPanel>
      </div>
    );
  }

  // Show login screen
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <ThreeBackground />
      <AuthPanel shake={false} onLogoClick={() => {}}>
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
            <p className="text-white/70">Secure authentication with Internet Identity</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
              disabled={loginStatus === 'logging-in'}
            >
              {loginStatus === 'logging-in' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>

            <p className="text-xs text-white/50 text-center">
              Powered by Internet Computer's decentralized authentication
            </p>
          </div>
        </div>
      </AuthPanel>
    </div>
  );
}
