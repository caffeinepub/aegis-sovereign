import QuantumInterlinkCard from '@/components/dashboard/QuantumInterlinkCard';
import AssetShieldCard from '@/components/dashboard/AssetShieldCard';
import VocalHealthCard from '@/components/dashboard/VocalHealthCard';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import NeuralIngestInput from '@/components/dashboard/NeuralIngestInput';
import SynopsisEngineCard from '@/components/dashboard/SynopsisEngineCard';
import SpectralAnalysisCard from '@/components/dashboard/SpectralAnalysisCard';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';

export default function CommandCenter() {
  const { canAccessSpectralAnalysis } = useSubscriptionTier();

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      {/* Top KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <QuantumInterlinkCard />
        <AssetShieldCard />
        <VocalHealthCard />
        <QuickActionsCard />
      </div>

      {/* Center Stage: Neural Ingest */}
      <div className="mb-6">
        <NeuralIngestInput />
      </div>

      {/* Synopsis Engine and Spectral Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SynopsisEngineCard />
        {canAccessSpectralAnalysis ? (
          <SpectralAnalysisCard />
        ) : (
          <div className="bg-white/50 backdrop-blur-sm border border-gray-300 rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Spectral Analysis</p>
              <p className="text-xs text-gray-400 mt-1">Shield Tier Required</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
