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
  Vault,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';
import AssetShieldCard from '@/components/dashboard/AssetShieldCard';
import NeuralIngestInput from '@/components/dashboard/NeuralIngestInput';
import VocalHealthCard from '@/components/dashboard/VocalHealthCard';
import LiveSpectralAnalysis from '@/components/dashboard/LiveSpectralAnalysis';
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
  const { tier, isFree, canAccessSpectralAnalysis, canAccessSentinel } = useSubscriptionTier();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('command');
  const [userName, setUserName] = useState('User');
  const [dashboardInitialized, setDashboardInitialized] = useState(false);

  // Initialize dashboard components when view becomes visible
  useEffect(() => {
    const dashboardView = document.getElementById('dashboard-view');
    if (dashboardView && dashboardView.style.display === 'block' && !dashboardInitialized) {
      setDashboardInitialized(true);
      
      // Trigger component initializations
      const initEvent = new CustomEvent('dashboard-initialized');
      window.dispatchEvent(initEvent);
    }
  }, [dashboardInitialized]);

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('AXON_USER_NAME');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AXON_SESSION');
    localStorage.removeItem('AXON_MASTER_USER');
    localStorage.removeItem('AXON_CURRENT_USER');
    localStorage.removeItem('AXON_USER_NAME');
    sessionStorage.clear();
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

  const getTierBadgeColor = () => {
    if (tier === 'shield') return 'bg-gradient-to-r from-emerald-600 to-teal-600';
    if (tier === 'core') return 'bg-gradient-to-r from-blue-600 to-indigo-600';
    return 'bg-gradient-to-r from-slate-500 to-slate-600';
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-tight">AXON</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">SOVEREIGN</p>
      </div>

      {/* User Profile Section with Sovereign Badge */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-11 w-11 border-2 border-emerald-500 shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white font-bold text-sm">
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
        {/* Sovereign Badge */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-lg">
          <Crown className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-bold text-emerald-400">Sovereign: {userName}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.section;

          return (
            <button
              key={item.section}
              onClick={() => {
                setActiveSection(item.section);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
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
      <aside className="hidden md:flex w-64 shrink-0 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-white/10 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-emerald-500">
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white text-xs font-bold">
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
        <div className="p-6 max-w-7xl mx-auto">
          {/* Command Center Section */}
          {activeSection === 'command' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Command Center</h1>
                <p className="text-slate-600">Your sovereign control dashboard</p>
              </div>

              {/* KPI Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AssetShieldCard />
                <VocalHealthCard />
              </div>

              {/* Neural Ingest Input */}
              <NeuralIngestInput />

              {/* Live Spectral Analysis */}
              <div className="relative">
                <LiveSpectralAnalysis />
                {!canAccessSpectralAnalysis && (
                  <div className="absolute inset-0 backdrop-blur-md bg-white/30 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <LockIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Spectral Analysis Locked</h3>
                      <p className="text-slate-600 mb-4">Upgrade to GLOBAL SHIELD (₹499/month) to unlock</p>
                      <Button
                        onClick={() => setActiveSection('vault')}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Synopsis Engine */}
              <SynopsisEngineCard />
            </div>
          )}

          {/* Neural Lab Section */}
          {activeSection === 'neural' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Neural Lab</h1>
                <p className="text-slate-600">Voice synthesis and neural processing</p>
              </div>
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Cpu className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Neural Lab</h3>
                <p className="text-slate-600">Advanced voice synthesis features coming soon</p>
              </div>
            </div>
          )}

          {/* Sentinel Protocol Section */}
          {activeSection === 'sentinel' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Sentinel Protocol</h1>
                <p className="text-slate-600">Tactical countermeasures and privacy controls</p>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Sentinel Protocol</h3>
                  <p className="text-slate-600">Advanced security features and countermeasures</p>
                </div>
                {!canAccessSentinel && (
                  <div className="absolute inset-0 backdrop-blur-md bg-white/30 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <LockIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Sentinel Protocol Locked</h3>
                      <p className="text-slate-600 mb-4">Upgrade to GLOBAL SHIELD (₹499/month) to unlock</p>
                      <Button
                        onClick={() => setActiveSection('vault')}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Device Sync Section */}
          {activeSection === 'device' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Device Sync</h1>
                <p className="text-slate-600">Synchronize your tactical mobile devices</p>
              </div>
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Smartphone className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Device Sync</h3>
                <p className="text-slate-600">Connect and manage your mobile devices</p>
              </div>
            </div>
          )}

          {/* Vault Section */}
          {activeSection === 'vault' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Subscription Tiers</h1>
                <p className="text-slate-600">Choose your protection level</p>
              </div>
              <PricingTable />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
