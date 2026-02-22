import { useEffect } from 'react';
import Overview from '@/components/dashboard/Overview';
import KPIMetricsRow from '@/components/dashboard/KPIMetricsRow';
import NeuralIngestInput from '@/components/dashboard/NeuralIngestInput';
import SynopsisEngineCard from '@/components/dashboard/SynopsisEngineCard';
import LiveSpectralAnalysis from '@/components/dashboard/LiveSpectralAnalysis';
import AssetShieldCard from '@/components/dashboard/AssetShieldCard';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';
import { isSessionActive } from '@/utils/localStorageAuth';

export default function CommandCenter() {
  const { canAccessSpectralAnalysis } = useSubscriptionTier();

  // Validate session before rendering
  useEffect(() => {
    if (!isSessionActive()) {
      console.warn('Unauthorized access to Command Center - no active session');
      // Redirect handled by parent component
      return;
    }

    // Dispatch dashboard initialization event
    window.dispatchEvent(new Event('dashboard-initialized'));
  }, []);

  // Early return if no session (prevents store access errors)
  if (!isSessionActive()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Command Center</h1>
          <p className="text-slate-600">Monitor and control your sovereign operations</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Overview (spans 4 columns on large screens) */}
          <div className="lg:col-span-4">
            <Overview />
          </div>

          {/* Right Column - KPI Metrics (spans 8 columns on large screens) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Shield Card - Re-injected */}
              <AssetShieldCard />
              
              {/* Other KPI Metrics */}
              <KPIMetricsRow />
            </div>
          </div>
        </div>

        {/* Neural Ingest - Full Width */}
        <div className="w-full">
          <NeuralIngestInput />
        </div>

        {/* Bottom Row - Synopsis and Spectral Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SynopsisEngineCard />
          
          {/* Live Spectral Analysis - Re-injected with tier gating */}
          {canAccessSpectralAnalysis ? (
            <LiveSpectralAnalysis />
          ) : (
            <div className="bg-white/60 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-slate-700 mb-1">Spectral Analysis</p>
                <p className="text-sm text-slate-500">Upgrade to Shield tier to unlock</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
