import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Lock,
  FileText,
  Settings,
  Menu,
  LogOut,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentSession, clearCurrentSession } from '@/utils/localStorageAuth';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const router = useRouterState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');
  const [userRole, setUserRole] = useState<string>('Member');

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setUserName(session.name);
      setUserRole(session.role);
    } else {
      navigate({ to: '/login' });
    }
  }, [navigate]);

  const navItems: NavItem[] = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Vault', path: '/dashboard/analytics', icon: <Lock className="h-5 w-5" /> },
    { name: 'Neural Logs', path: '/dashboard/neural-lab', icon: <FileText className="h-5 w-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    clearCurrentSession();
    toast.success('Logged out successfully');
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

  const NavContent = () => (
    <div className="flex h-full flex-col bg-slate-950">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/axon-logo.dim_800x800.png" alt="AXON" className="h-10 w-10" />
          <div>
            <h2 className="text-lg font-bold text-white">AXON</h2>
            <p className="text-xs text-slate-400">SOVEREIGN</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="px-6 py-4 border-b border-slate-800">
        <p className="text-sm text-slate-400">Welcome back,</p>
        <p className="text-lg font-semibold text-white">{userName}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
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
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-slate-800 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-slate-200 bg-slate-950">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <NavContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 h-10 rounded-lg border-slate-300 focus:border-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-slate-900">{userName}</p>
                <p className="text-xs text-slate-500">{userRole}</p>
              </div>
              <Avatar className="h-10 w-10 bg-indigo-600">
                <AvatarFallback className="bg-indigo-600 text-white font-semibold">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-slate-50">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
