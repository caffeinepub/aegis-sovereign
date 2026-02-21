import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Power, 
  Lock as LockIcon, 
  LayoutDashboard,
  Cpu,
  Shield,
  Smartphone,
  Vault
} from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';
import { clearSession, getCurrentUser } from '@/utils/localStorageAuth';
import AssetShieldCard from '@/components/dashboard/AssetShieldCard';
import NeuralIngestInput from '@/components/dashboard/NeuralIngestInput';
import VocalHealthCard from '@/components/dashboard/VocalHealthCard';
import SpectralAnalysisCard from '@/components/dashboard/SpectralAnalysisCard';
import SynopsisEngineCard from '@/components/dashboard/SynopsisEngineCard';
import PricingTable from '@/components/dashboard/PricingTable';

interface UnifiedDashboardProps {
  onLogout: () => void;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  section: string;
}

const navItems: NavItem[] = [
  { label: 'Command Center', icon: <LayoutDashboard className="h-5 w-5" />, section: 'command' },
  { label: 'Neural Lab', icon: <Cpu className="h-5 w-5" />, section: 'neural' },
  { label: 'Sentinel Protocol', icon: <Shield className="h-5 w-5" />, section: 'sentinel' },
  { label: 'Device Sync', icon: <Smartphone className="h-5 w-5" />, section: 'device' },
  { label: 'Vault', icon: <Vault className="h-5 w-5" />, section: 'vault' },
];

export default function UnifiedDashboard({ onLogout }: UnifiedDashboardProps) {
  const queryClient = useQueryClient();
  const { tier, isFree } = useSubscriptionTier();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('command');
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.fullName) {
      setUserName(user.fullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AXON_SESSION');
    localStorage.removeItem('AXON_MASTER_USER');
    localStorage.removeItem('AXON_CURRENT_USER');
    sessionStorage.clear();
    clearSession();
    queryClient.clear();
    toast.success('Signed out successfully');
    onLogout();
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

      {/* Current Plan Display */}
      <div className="p-4 border-b border-white/10">
        <div className="text-xs text-white/50 mb-1">CURRENT PLAN</div>
        <div className="text-sm font-semibold text-white uppercase">
          {tier === 'free' ? 'FREE' : tier === 'core' ? 'SOVEREIGN CORE (₹299)' : 'GLOBAL SHIELD (₹499)'}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.section;

          return (
            <button
              key={item.section}
              onClick={() => {
                setActiveSection(item.section);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                isActive
                  ? 'bg-[#10b981] text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button - Fixed at Bottom */}
      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
        >
          <Power className="h-4 w-4 mr-2" />
          Logout
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
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeSection === 'command' && 'Command Center'}
              {activeSection === 'neural' && 'Neural Lab'}
              {activeSection === 'sentinel' && 'Sentinel Protocol'}
              {activeSection === 'device' && 'Device Sync'}
              {activeSection === 'vault' && 'Secure Vault'}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeSection === 'command' && 'Real-time intelligence dashboard'}
              {activeSection === 'neural' && 'AI voice synthesis laboratory'}
              {activeSection === 'sentinel' && 'Tactical countermeasures'}
              {activeSection === 'device' && 'Mobile device synchronization'}
              {activeSection === 'vault' && 'Subscription plans and secure storage'}
            </p>
          </div>

          {/* Command Center Section */}
          {activeSection === 'command' && (
            <>
              {/* KPI Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AssetShieldCard />
                <NeuralIngestInput />
                <VocalHealthCard />
              </div>

              {/* Center Modules */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpectralAnalysisCard />
                <SynopsisEngineCard />
              </div>
            </>
          )}

          {/* Neural Lab Section */}
          {activeSection === 'neural' && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-600">Neural Lab features coming soon...</p>
            </div>
          )}

          {/* Sentinel Protocol Section */}
          {activeSection === 'sentinel' && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-600">Sentinel Protocol features coming soon...</p>
            </div>
          )}

          {/* Device Sync Section */}
          {activeSection === 'device' && (
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-600">Device Sync features coming soon...</p>
            </div>
          )}

          {/* Vault Section */}
          {activeSection === 'vault' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Plans</h2>
                <p className="text-gray-600">Choose the plan that fits your needs</p>
              </div>
              <PricingTable />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
