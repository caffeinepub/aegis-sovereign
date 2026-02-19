import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { useGetCallerUserRole, useGetCallerUserProfile } from '../../hooks/useQueries';
import { useGhostMode } from '../../contexts/GhostModeContext';
import { useQueryClient } from '@tanstack/react-query';
import {
  LayoutDashboard,
  Brain,
  Shield,
  Smartphone,
  BarChart3,
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
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-400" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/aegis-logo.dim_256x256.png" alt="Aegis" className="h-10 w-10" />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold">Aegis Sovereign</h2>
              <p className="text-xs text-gray-400">Enterprise Intelligence</p>
            </div>
          )}
        </div>
        {!collapsed && isAdmin && (
          <Badge variant="default" className="mt-3 bg-gradient-to-r from-blue-500 to-purple-500">
            ADMIN
          </Badge>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-4">
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
                    ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20'
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
            <span className="text-sm font-medium">{isGhostMode ? 'Ghost Mode Active' : 'Ghost Mode'}</span>
          )}
        </button>

        {/* User Profile */}
        {!collapsed && (
          <div className="mb-3 rounded-lg bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{userProfile?.name || 'User'}</p>
                <p className="truncate text-xs text-gray-400">{isAdmin ? 'Administrator' : 'User'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full ${collapsed ? 'justify-center px-2' : 'justify-start'} text-gray-300 hover:bg-red-500/10 hover:text-red-400`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden border-r border-white/10 bg-black/50 backdrop-blur-xl transition-all duration-300 lg:block ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="relative flex h-full flex-col">
          <NavContent collapsed={sidebarCollapsed} />
          {/* Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black text-gray-400 hover:bg-white/5 hover:text-white"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 border-white/10 bg-black/95 p-0 backdrop-blur-xl">
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
