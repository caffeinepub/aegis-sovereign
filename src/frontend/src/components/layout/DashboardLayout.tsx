import { ReactNode, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import {
  LayoutDashboard,
  Brain,
  Shield,
  Smartphone,
  BarChart3,
  Menu,
  LogOut,
  User,
} from 'lucide-react';
import { toast } from 'sonner';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  hidden?: boolean;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const router = useRouterState();
  const { clear, identity } = useInternetIdentity();
  const [sentinelVisible, setSentinelVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useKeyboardShortcut(['k'], (e) => {
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      setSentinelVisible(!sentinelVisible);
      toast.info(sentinelVisible ? 'Tactical Layer Hidden' : 'Tactical Layer Activated');
    }
  });

  const navItems: NavItem[] = [
    { name: 'Command Center', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Neural Lab', path: '/dashboard/neural-lab', icon: <Brain className="h-5 w-5" /> },
    {
      name: 'Sentinel Protocol',
      path: '/dashboard/sentinel',
      icon: <Shield className="h-5 w-5" />,
      hidden: !sentinelVisible,
    },
    { name: 'Device Sync', path: '/dashboard/device-sync', icon: <Smartphone className="h-5 w-5" /> },
    { name: 'Analytics & Vault', path: '/dashboard/analytics', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    clear();
    toast.success('Logged out successfully');
    navigate({ to: '/' });
  };

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/aegis-logo.dim_512x512.png" alt="Aegis" className="h-10 w-10" />
          <div>
            <h2 className="text-lg font-bold">Aegis Sovereign</h2>
            <p className="text-xs text-gray-400">Enterprise Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems
          .filter((item) => !item.hidden)
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
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
            <User className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">
              {identity?.getPrincipal().toString().slice(0, 8)}...
            </p>
            <p className="text-xs text-gray-400">Sovereign Tier</p>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-white/10 bg-black lg:block">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 border-white/10 bg-black p-0">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
