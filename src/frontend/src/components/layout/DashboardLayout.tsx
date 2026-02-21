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
  Radio,
  Smartphone,
  Lock as LockIcon,
  Users,
  Settings as SettingsIcon,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';
import SentinelPanicButton from '@/components/common/SentinelPanicButton';
import { getCurrentUser, clearSession } from '@/utils/localStorageAuth';

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
  { label: 'COMMAND CENTER', path: '/command-center', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'NEURAL LAB', path: '/dashboard/neural-lab', icon: <Cpu className="h-5 w-5" />, requiresCore: true },
  { label: 'SENTINEL PROTOCOL', path: '/dashboard/sentinel', icon: <Shield className="h-5 w-5" />, requiresShield: true },
  { label: 'DEVICE SYNC', path: '/dashboard/device-sync', icon: <Smartphone className="h-5 w-5" /> },
  { label: 'SECURE VAULT', path: '/dashboard/analytics-vault', icon: <LockIcon className="h-5 w-5" /> },
  { label: 'TEAM MANAGEMENT', path: '/dashboard/team-management', icon: <Users className="h-5 w-5" /> },
  { label: 'SUBSCRIPTIONS', path: '/dashboard/subscriptions', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'SETTINGS', path: '/dashboard/settings', icon: <SettingsIcon className="h-5 w-5" /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { isNeuralLabUnlocked, isSentinelProtocolUnlocked } = useSubscriptionTier();

  // Get user name from AXON_MASTER_USER
  const [userName, setUserName] = useState('User');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.fullName) {
      setUserName(user.fullName);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('AXON_SESSION');
    localStorage.removeItem('AXON_MASTER_USER');
    sessionStorage.clear();
    clearSession();
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#001529]">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">AXON</h1>
        <p className="text-xs text-white/50 mt-1">SOVEREIGN</p>
      </div>

      {/* User Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-[#10b981]">
            <AvatarFallback className="bg-[#10b981] text-white font-semibold">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <Badge className="mt-1 bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-xs font-bold border-0">
              SOVEREIGN
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const isLocked = (item.requiresCore && !isNeuralLabUnlocked) || (item.requiresShield && !isSentinelProtocolUnlocked);

          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-[#10b981] text-white'
                  : isLocked
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
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

      {/* Sign Out Button - Fixed at Bottom */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
        >
          <Power className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F0F2F5] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#001529] border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border-2 border-[#10b981]">
              <AvatarFallback className="bg-[#10b981] text-white text-xs font-semibold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-white">{userName}</span>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-[#001529] border-white/10">
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
