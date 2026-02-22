import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Shield,
  Menu,
  Power,
  Cpu,
  Smartphone,
  Lock as LockIcon,
  Users,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';
import SentinelPanicButton from '@/components/common/SentinelPanicButton';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresCore?: boolean;
  requiresShield?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Command Center', path: '/command-center', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Neural Lab', path: '/dashboard/neural-lab', icon: <Cpu className="h-5 w-5" />, requiresCore: true },
  { label: 'Sentinel Protocol', path: '/dashboard/sentinel', icon: <Shield className="h-5 w-5" />, requiresShield: true },
  { label: 'Device Sync', path: '/dashboard/device-sync', icon: <Smartphone className="h-5 w-5" /> },
  { label: 'Secure Vault', path: '/dashboard/analytics-vault', icon: <LockIcon className="h-5 w-5" /> },
  { label: 'Team Management', path: '/dashboard/team-management', icon: <Users className="h-5 w-5" /> },
  { label: 'Subscriptions', path: '/dashboard/subscriptions', icon: <CreditCard className="h-5 w-5" /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { tier, isNeuralLabUnlocked, isSentinelProtocolUnlocked } = useSubscriptionTier();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!identity) {
      navigate({ to: '/login' });
    }
  }, [identity, navigate]);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    toast.success('Signed out successfully');
    navigate({ to: '/login' });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = userProfile?.name || 'User';

  const handleNavClick = (item: NavItem) => {
    if (item.requiresCore && !isNeuralLabUnlocked) {
      toast.error('Neural Lab requires SOVEREIGN CORE tier', { duration: 3000 });
      return;
    }
    if (item.requiresShield && !isSentinelProtocolUnlocked) {
      toast.error('Sentinel Protocol requires GLOBAL SHIELD tier', { duration: 3000 });
      return;
    }
    navigate({ to: item.path });
    setMobileMenuOpen(false);
  };

  const getTierBadgeColor = () => {
    if (tier === 'shield') return 'bg-gradient-to-r from-blue-600 to-indigo-600';
    if (tier === 'core') return 'bg-gradient-to-r from-emerald-600 to-teal-600';
    return 'bg-gradient-to-r from-slate-500 to-slate-600';
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-tight">AXON</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">SOVEREIGN</p>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border-2 border-blue-500 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <Badge className={`mt-1.5 ${getTierBadgeColor()} text-white text-xs font-bold border-0 shadow-md`}>
              {tier === 'free' ? 'FREE' : tier === 'core' ? 'CORE' : 'SHIELD'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const isLocked = (item.requiresCore && !isNeuralLabUnlocked) || (item.requiresShield && !isSentinelProtocolUnlocked);

          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : isLocked
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              disabled={isLocked}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
              {isLocked && <LockIcon className="h-4 w-4 ml-auto" />}
            </button>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 transition-all"
        >
          <Power className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/10 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-blue-500">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-white">{userName}</span>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-slate-900 border-white/10">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-16">
        {children}
      </main>

      {/* Sentinel Panic Button */}
      <SentinelPanicButton />
    </div>
  );
}
