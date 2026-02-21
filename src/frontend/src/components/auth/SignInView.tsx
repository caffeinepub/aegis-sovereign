import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SiGoogle, SiFacebook } from 'react-icons/si';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SignInViewProps {
  email: string;
  password: string;
  rememberMe: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberMeChange: (value: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function SignInView({
  email,
  password,
  rememberMe,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  isLoading,
}: SignInViewProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-white/70">Welcome back! Please enter your details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="signin-email" className="text-white/90 mb-2 block">
            Email/Username
          </Label>
          <Input
            id="signin-email"
            type="text"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="signin-password" className="text-white/90 mb-2 block">
            Password
          </Label>
          <div className="relative">
            <Input
              id="signin-password"
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Enter your password"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => onRememberMeChange(checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-primary"
            disabled={isLoading}
          />
          <Label htmlFor="remember" className="text-white/90 cursor-pointer">
            Remember for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={isLoading}
          >
            <SiGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={isLoading}
          >
            <SiFacebook className="mr-2 h-4 w-4" />
            Sign up with Facebook
          </Button>
        </div>
      </form>
    </div>
  );
}
