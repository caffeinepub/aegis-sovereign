import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { useGetCallerUserRole, useGetCallerUserProfile } from '../../hooks/useQueries';
import { useGhostMode } from '../../contexts/GhostModeContext';
import { useQueryClient } from '@tanstack/react-query';
import SecurityAuditScheduler from '../scheduling/SecurityAuditScheduler';
import {
  LayoutDashboard,
  Brain,
  Shield,
  Smartphone,
  BarChart3,
  CreditCard,
  Menu,
  LogOut,
  User,
  Settings,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '../../backend';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const router = useRouterState();
  const queryClient = useQueryClient();
  const { clear, identity } = useInternetIdentity();
  const { data: userRole, isLoading: roleLoading, isFetched: roleFetched } = useGetCallerUserRole();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { isGhostMode, toggleGhostMode } = useGhostMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useKeyboardShortcut(['Control', 'Shift', 'G'], () => {
    toggleGhostMode();
    toast.info(isGhostMode ? 'Ghost Mode Deactivated' : 'Ghost Mode Activated');
  });

  const isAdmin = userRole === UserRole.admin;

  const navItems: NavItem[] = [
    { name: 'Command Center', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Neural Lab', path: '/dashboard/neural-lab', icon: <Brain className="h-5 w-5" /> },
    {
      name: 'Sentinel Protocol',
      path: '/dashboard/sentinel',
      icon: <Shield className="h-5 w-5" />,
      adminOnly: true,
    },
    { name: 'Device Sync', path: '/dashboard/device-sync', icon: <Smartphone className="h-5 w-5" /> },
    { name: 'Analytics & Vault', path: '/dashboard/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Subscriptions', path: '/dashboard/subscriptions', icon: <CreditCard className="h-5 w-5" /> },
    {
      name: 'Admin Panel',
      path: '/dashboard/admin-panel',
      icon: <Settings className="h-5 w-5" />,
      adminOnly: true,
    },
  ];

  const handleLogout = () => {
    clear();
    queryClient.clear();
    toast.success('Logged out successfully');
    navigate({ to: '/' });
  };

  // Show loading state while fetching user data
  if (roleLoading || !roleFetched || profileLoading || !profileFetched) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-emerald-400" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/axon-logo.dim_800x800.png" alt="AXON" className="h-10 w-10" />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold">AXON</h2>
              <p className="text-xs text-gray-400">Enterprise Intelligence</p>
            </div>
          )}
        </div>
        {!collapsed && isAdmin && (
          <Badge variant="default" className="mt-3 bg-gradient-to-r from-emerald-500 to-cyan-500">
            ADMIN
          </Badge>
        )}
      </div>

      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-4">
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => {
              const isActive = router.location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate({ to: item.path });
                    setMobileOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'text-gray-300 hover:bg-white/5'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.name : undefined}
                >
                  {item.icon}
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </button>
              );
            })}
        </nav>

        {/* Schedule Security Audit Module */}
        {!collapsed && (
          <div className="px-4 pb-4">
            <SecurityAuditScheduler />
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-white/10 p-4">
        {/* Ghost Mode Toggle */}
        <button
          onClick={toggleGhostMode}
          className={`mb-3 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            isGhostMode ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-300 hover:bg-white/10'
          } ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? (isGhostMode ? 'Ghost Mode Active' : 'Ghost Mode') : undefined}
        >
          {isGhostMode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          {!collapsed && (
            <span className="text-sm font-medium">{isGhostMode ? 'Ghost Mode ON' : 'Ghost Mode'}</span>
          )}
        </button>

        {/* User Profile */}
        {!collapsed && (
          <div className="mb-3 rounded-lg bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{userProfile?.name || 'User'}</p>
                <p className="truncate text-xs text-gray-400">{isAdmin ? 'Administrator' : 'Operative'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition-all hover:bg-red-500/10 ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col border-r border-white/10 bg-black/50 backdrop-blur-xl transition-all duration-300 ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-80'
        }`}
      >
        <NavContent collapsed={sidebarCollapsed} />
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black text-gray-400 hover:text-white"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 border-white/10 bg-black p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className={isGhostMode ? 'ghost-mode-blur' : ''}>{children}</div>
      </main>
    </div>
  );
}
