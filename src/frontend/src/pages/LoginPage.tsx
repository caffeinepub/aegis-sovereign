import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onForceDashboard: () => void;
}

export default function LoginPage({ onLoginSuccess, onForceDashboard }: LoginPageProps) {
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
      } else if (userProfile) {
        // User has profile, set session and navigate to dashboard
        localStorage.setItem('AXON_SESSION', 'ACTIVE');
        localStorage.setItem('AXON_USER_NAME', userProfile.name);
        // Initialize subscription tier if not present
        if (!localStorage.getItem('AXON_SUBSCRIPTION_TIER')) {
          localStorage.setItem('AXON_SUBSCRIPTION_TIER', 'free');
        }
        onLoginSuccess();
      }
    }
  }, [isAuthenticated, userProfile, profileLoading, isFetched, onLoginSuccess]);

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
      // Store name in localStorage for dashboard
      localStorage.setItem('AXON_USER_NAME', fullName.trim());
      localStorage.setItem('AXON_SESSION', 'ACTIVE');
      // Initialize subscription tier
      localStorage.setItem('AXON_SUBSCRIPTION_TIER', 'free');
      toast.success('Profile created successfully!', { duration: 2000 });
      onLoginSuccess();
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('Failed to create profile. Please try again.', { duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-white/70">Initializing authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Glassmorphic Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/assets/generated/axon-logo.dim_400x120.png" 
              alt="AXON" 
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white mb-2">
              {showProfileSetup ? 'Complete Your Profile' : 'Welcome to AXON'}
            </h1>
            <p className="text-white/60">
              {showProfileSetup ? 'Tell us your name to continue' : 'Secure your digital sovereignty'}
            </p>
          </div>

          {showProfileSetup ? (
            /* Profile Setup Form */
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-white/90 mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  disabled={isSubmitting}
                />
              </div>
              <Button
                onClick={handleProfileSetup}
                disabled={isSubmitting || !fullName.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold py-6 rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  'Continue to Dashboard'
                )}
              </Button>
            </div>
          ) : (
            /* Login Button */
            <div className="space-y-6">
              <Button
                onClick={handleLogin}
                disabled={loginStatus === 'logging-in'}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white font-semibold py-6 rounded-xl"
              >
                {loginStatus === 'logging-in' ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Sign In with Internet Identity'
                )}
              </Button>

              <p className="text-center text-white/50 text-sm">
                Secure authentication powered by Internet Computer
              </p>
            </div>
          )}

          {/* Dev Force Dashboard Button */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Button
              onClick={onForceDashboard}
              variant="outline"
              className="w-full border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
            >
              Force Dashboard (Dev)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
