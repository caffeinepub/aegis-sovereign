import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ThreeBackground from '@/components/auth/ThreeBackground';
import AuthPanel from '@/components/auth/AuthPanel';
import SignInView from '@/components/auth/SignInView';
import RegisterView from '@/components/auth/RegisterView';
import { registerUser, signInUser, masterBypass } from '@/utils/localStorageAuth';
import { Loader2 } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [view, setView] = useState<'signin' | 'register'>('signin');
  const [shake, setShake] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Register state
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Master bypass state
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimer, setLogoClickTimer] = useState<NodeJS.Timeout | null>(null);

  // Handle logo triple-click for master bypass
  const handleLogoClick = () => {
    // Clear existing timer
    if (logoClickTimer) {
      clearTimeout(logoClickTimer);
    }

    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount === 3) {
      // Trigger master bypass
      masterBypass();
      toast.success('Master Bypass Activated - Sovereign Administrator', {
        duration: 2000,
        style: {
          background: '#10b981',
          color: 'white',
          border: '1px solid #059669',
        },
      });
      // Navigate to dashboard
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
      setLogoClickCount(0);
      return;
    }

    // Set timer to reset count after 2 seconds
    const timer = setTimeout(() => {
      setLogoClickCount(0);
    }, 2000);
    setLogoClickTimer(timer);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (logoClickTimer) {
        clearTimeout(logoClickTimer);
      }
    };
  }, [logoClickTimer]);

  const handleSignIn = () => {
    if (!signInEmail || !signInPassword) {
      toast.error('Please fill in all fields', { duration: 3000 });
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = signInUser(signInEmail, signInPassword);

      if (user) {
        toast.success('Login successful!', { duration: 2000 });
        setIsLoading(false);
        // Navigate to dashboard
        onLoginSuccess();
      } else {
        // Trigger shake animation
        setShake(true);
        setTimeout(() => setShake(false), 500);

        // Show red error toast
        toast.error('Invalid Credentials', {
          duration: 3000,
          style: {
            background: '#dc2626',
            color: 'white',
            border: '1px solid #b91c1c',
          },
        });
        setIsLoading(false);
      }
    }, 800);
  };

  const handleRegister = () => {
    if (!registerFullName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast.error('Please fill in all fields', { duration: 3000 });
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match', { duration: 3000 });
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('Password must be at least 6 characters', { duration: 3000 });
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = registerUser(registerFullName, registerEmail, registerPassword);

      if (success) {
        // Show provisioning animation
        setIsLoading(false);
        setIsProvisioning(true);

        // Wait 1.5 seconds then auto-login and navigate to dashboard
        setTimeout(() => {
          // Automatically sign in the user
          const user = signInUser(registerEmail, registerPassword);
          if (user) {
            toast.success('Registration successful!', {
              duration: 2000,
            });
            setIsProvisioning(false);
            // Navigate to dashboard immediately
            onLoginSuccess();
          }
        }, 1500);
      } else {
        toast.error('Email already registered', { duration: 3000 });
        setIsLoading(false);
      }
    }, 800);
  };

  // Show provisioning overlay
  if (isProvisioning) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-[#001529] via-[#002140] to-[#001529]">
        <div className="text-center space-y-6">
          <Loader2 className="h-16 w-16 text-[#10b981] animate-spin mx-auto" />
          <p className="text-2xl font-bold text-white">Provisioning Sovereign Identity...</p>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-[#10b981] to-[#059669] animate-pulse" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <ThreeBackground />

      <AuthPanel shake={shake} onLogoClick={handleLogoClick}>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Sign In */}
          <div className={view === 'signin' ? 'block' : 'hidden md:block opacity-50'}>
            <SignInView
              email={signInEmail}
              password={signInPassword}
              rememberMe={rememberMe}
              onEmailChange={setSignInEmail}
              onPasswordChange={setSignInPassword}
              onRememberMeChange={setRememberMe}
              onSubmit={handleSignIn}
              isLoading={isLoading}
            />
            <div className="mt-6 text-center">
              <button
                onClick={() => setView('register')}
                className="text-white/70 hover:text-white text-sm md:hidden"
              >
                Don't have an account? Register
              </button>
            </div>
          </div>

          {/* Right Side - Register */}
          <div className={view === 'register' ? 'block' : 'hidden md:block opacity-50'}>
            <RegisterView
              fullName={registerFullName}
              email={registerEmail}
              password={registerPassword}
              confirmPassword={registerConfirmPassword}
              onFullNameChange={setRegisterFullName}
              onEmailChange={setRegisterEmail}
              onPasswordChange={setRegisterPassword}
              onConfirmPasswordChange={setRegisterConfirmPassword}
              onSubmit={handleRegister}
              isLoading={isLoading}
            />
            <div className="mt-6 text-center">
              <button
                onClick={() => setView('signin')}
                className="text-white/70 hover:text-white text-sm md:hidden"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </div>
      </AuthPanel>
    </div>
  );
}
