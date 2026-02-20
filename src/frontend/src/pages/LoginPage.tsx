import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  authenticateUser,
  registerUser,
  setCurrentSession,
  isAuthenticated,
} from '@/utils/localStorageAuth';

type AuthMode = 'signin' | 'signup';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sign In form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  // Check for existing session
  useEffect(() => {
    if (isAuthenticated()) {
      navigate({ to: '/dashboard' });
    }
  }, [navigate]);

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = authenticateUser(signInEmail, signInPassword);
      
      if (user) {
        setCurrentSession(user);
        toast.success('Welcome back!');
        navigate({ to: '/dashboard' });
      } else {
        toast.error('Invalid email or password');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (signUpPassword !== signUpConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password length
    if (signUpPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = registerUser(signUpName, signUpEmail, signUpPassword);
      
      if (result.success) {
        toast.success('Account created successfully! Please sign in.');
        // Switch to sign in mode
        setMode('signin');
        setSignInEmail(signUpEmail);
        // Clear sign up form
        setSignUpName('');
        setSignUpEmail('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
      } else {
        toast.error(result.message || 'Registration failed');
      }
      setIsLoading(false);
    }, 800);
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(mode === 'signin' ? 'signup' : 'signin');
      setIsLoading(false);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="flex min-h-screen animate-fade-in">
      {/* Left Side - Neural Network Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 p-12 flex-col justify-center items-center relative overflow-hidden">
        {/* Neural Network Background */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/generated/neural-network-abstract.dim_800x1200.png"
            alt="Neural Network"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <img
            src="/assets/generated/axon-logo.dim_800x800.png"
            alt="AXON SOVEREIGN"
            className="w-24 h-24 mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-4">AXON SOVEREIGN</h1>
          <p className="text-xl text-indigo-100 leading-relaxed">
            Secure your enterprise sovereignty.
          </p>
          <div className="mt-12 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
              <p className="text-indigo-100">End-to-end encrypted communications</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
              <p className="text-indigo-100">Real-time threat detection</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
              <p className="text-indigo-100">Enterprise-grade security protocols</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-gray-600">
              {mode === 'signin'
                ? 'Sign in to your AXON SOVEREIGN account'
                : 'Join AXON SOVEREIGN and secure your enterprise'}
            </p>
          </div>

          <div className="relative overflow-hidden">
            {mode === 'signin' ? (
              <form
                key="signin"
                onSubmit={handleSignIn}
                className={`space-y-6 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                }`}
              >
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-700 font-medium">
                    Work Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@company.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-700 font-medium">
                    Security Password
                  </Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            ) : (
              <form
                key="signup"
                onSubmit={handleSignUp}
                className={`space-y-6 transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                }`}
              >
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-gray-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700 font-medium">
                    Work Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@company.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700 font-medium">
                    Security Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 rounded-xl border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password" className="text-gray-700 font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 rounded-xl border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={toggleMode}
                disabled={isTransitioning}
                className="text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50"
              >
                {mode === 'signin' ? 'Create Account' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              By {mode === 'signin' ? 'signing in' : 'creating an account'}, you agree to our Terms
              of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
