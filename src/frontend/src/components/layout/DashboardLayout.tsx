import { ReactNode } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Shield,
  Settings,
  Menu,
  Power,
  Users,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/command-center', icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: 'Security Vault', path: '/dashboard/analytics', icon: <Shield className="h-5 w-5" /> },
  { label: 'Team Management', path: '/dashboard/team-management', icon: <Users className="h-5 w-5" /> },
  { label: 'Pricing', path: '/dashboard/subscriptions', icon: <CreditCard className="h-5 w-5" /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  const userName = userProfile?.name || 'User';

  const handleLogout = async () => {
    localStorage.removeItem('AXON_SESSION');
    sessionStorage.clear();
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#001529]">
      {/* User Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarFallback className="bg-[#1890FF] text-white font-semibold">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <p className="text-xs text-white/60">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate({ to: item.path })}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#10b981]/20 text-[#10b981] font-semibold'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sign Out Button - Fixed at Bottom */}
      <div className="p-4 border-t border-white/10 mt-auto">
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
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarFallback className="bg-[#1890FF] text-white text-xs font-semibold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-white">{userName}</span>
          </div>
          <Sheet>
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
    </div>
  );
}
