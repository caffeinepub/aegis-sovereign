import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu, Power, Lock as LockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';
import { clearSession, getCurrentUserEmail } from '@/utils/localStorageAuth';
import AssetShieldCard from '@/components/dashboard/AssetShieldCard';
import NeuralIngestInput from '@/components/dashboard/NeuralIngestInput';
import VocalHealthCard from '@/components/dashboard/VocalHealthCard';
import SpectralAnalysisCard from '@/components/dashboard/SpectralAnalysisCard';
import SynopsisEngineCard from '@/components/dashboard/SynopsisEngineCard';
import PricingTable from '@/components/dashboard/PricingTable';

export default function UnifiedDashboard() {
  const queryClient = useQueryClient();
  const { tier, isFree } = useSubscriptionTier();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userEmail = getCurrentUserEmail();
  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  const handleLogout = () => {
    clearSession();
    queryClient.clear();
    toast.success('Signed out successfully');
    // Reload to reset to login view
    window.location.reload();
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
          {tier === 'free' ? 'FREE' : tier === 'core' ? 'SOVEREIGN CORE' : 'GLOBAL SHIELD'}
        </div>
      </div>

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
            <h1 className="text-3xl font-bold text-gray-900">AXON SOVEREIGN</h1>
            <p className="text-gray-600">Command Center Dashboard</p>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AssetShieldCard />
            <NeuralIngestInput />
            <VocalHealthCard />
          </div>

          {/* Center Modules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spectral Analysis - Locked for FREE users */}
            {isFree ? (
              <div className="relative">
                <div className="blur-sm pointer-events-none">
                  <SpectralAnalysisCard />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
                  <div className="text-center p-6">
                    <LockIcon className="h-12 w-12 text-white mx-auto mb-4" />
                    <p className="text-white font-semibold mb-2">Spectral Analysis Locked</p>
                    <p className="text-white/70 text-sm">Upgrade to GLOBAL SHIELD to unlock</p>
                  </div>
                </div>
              </div>
            ) : (
              <SpectralAnalysisCard />
            )}
            <SynopsisEngineCard />
          </div>

          {/* Secure Vault Section */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-bold text-gray-900">SECURE VAULT</h2>
              <p className="text-gray-600 text-sm">Subscription Plans</p>
            </div>
            <PricingTable />
          </div>
        </div>
      </main>
    </div>
  );
}
