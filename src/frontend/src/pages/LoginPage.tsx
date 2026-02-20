import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import {
  authenticateUser,
  setCurrentSession,
  initializeStorage,
  isAuthenticated,
} from '@/utils/localStorageAuth';
import NeuralScanTransition from '@/components/transitions/NeuralScanTransition';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    initializeStorage();
    if (isAuthenticated()) {
      navigate({ to: '/dashboard' });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = authenticateUser(email, password);

      if (user) {
        setCurrentSession(user);
        
        // Check if neural scan has been played this session
        const scanPlayed = sessionStorage.getItem('NEURAL_SCAN_PLAYED');
        
        if (!scanPlayed) {
          sessionStorage.setItem('NEURAL_SCAN_PLAYED', 'true');
          setShowTransition(true);
        } else {
          toast.success('Welcome back!');
          navigate({ to: '/dashboard' });
        }
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    navigate({ to: '/dashboard' });
  };

  if (showTransition) {
    return <NeuralScanTransition onComplete={handleTransitionComplete} />;
  }

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
            <p className="text-sm text-muted-foreground">Sign in to your sovereign account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-background border-border text-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-background font-semibold"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={() => navigate({ to: '/signup' })}
                className="text-emerald-500 hover:text-emerald-400 font-medium"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
