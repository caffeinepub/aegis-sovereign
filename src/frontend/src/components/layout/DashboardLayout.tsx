import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Lock,
  FileText,
  Settings,
  Menu,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentSession, clearCurrentSession } from '@/utils/localStorageAuth';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const router = useRouterState();
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setUserName(session.name);
    } else {
      navigate({ to: '/login' });
    }
  }, [navigate]);

  const navItems: NavItem[] = [
    { name: 'Command Center', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Analytics Vault', path: '/dashboard/analytics', icon: <Lock className="h-5 w-5" /> },
    { name: 'Neural Lab', path: '/dashboard/neural-lab', icon: <FileText className="h-5 w-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    clearCurrentSession();
    queryClient.clear();
    toast.success('Logged out successfully');
    navigate({ to: '/login' });
  };

  const NavContent = () => (
    <div className="flex h-full flex-col bg-background border-r border-border">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/axon-logo.dim_800x800.png" alt="AXON" className="h-10 w-10" />
          <div>
            <h2 className="text-lg font-bold text-foreground">AXON</h2>
            <p className="text-xs text-emerald-500">SOVEREIGN</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = router.location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate({ to: item.path });
                setMobileOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 text-foreground">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-background">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
