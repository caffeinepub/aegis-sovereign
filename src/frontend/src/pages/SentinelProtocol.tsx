import BentoCard from '../components/layout/BentoCard';
import EnvironmentSpoofing from '../components/sentinel/EnvironmentSpoofing';
import PacketJitterSimulator from '../components/sentinel/PacketJitterSimulator';
import HardwareMimicry from '../components/sentinel/HardwareMimicry';
import EnvironmentMixer from '../components/sentinel/EnvironmentMixer';
import AcousticMatrixGrid from '../components/sentinel/AcousticMatrixGrid';
import FeatureLockedOverlay from '../components/common/FeatureLockedOverlay';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import PanicProtocol from '../components/sentinel/PanicProtocol';
import { useTriggerPanic } from '../hooks/useQueries';
import { useSubscriptionTier } from '../hooks/useSubscriptionTier';

export default function SentinelProtocol() {
  const [panicActive, setPanicActive] = useState(false);
  const triggerPanic = useTriggerPanic();
  const { canAccessSentinel } = useSubscriptionTier();

  if (!canAccessSentinel) {
    return <FeatureLockedOverlay featureName="Sentinel Protocol" />;
  }

  const handlePanicActivation = () => {
    triggerPanic.mutate('Windows Update');
    setPanicActive(true);
  };

  return (
    <div
      className="min-h-screen bg-black p-6"
      style={{
        backgroundImage: 'url(/assets/generated/tactical-hud-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-400">Sentinel Protocol</h1>
        <p className="text-gray-400">Tactical countermeasures and privacy controls</p>
      </div>

      <div className="grid gap-6">
        {/* Acoustic Matrix */}
        <BentoCard className="border-[#10b981]/30 bg-[#10b981]/5">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#10b981] mb-4">ACOUSTIC MATRIX</h2>
            <AcousticMatrixGrid />
          </div>
        </BentoCard>

        {/* Emergency Panic Button */}
        <BentoCard className="border-red-500/30 bg-red-500/5">
          <div className="p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-400" />
            <h2 className="mb-4 text-2xl font-bold text-red-400">EMERGENCY PROTOCOL</h2>
            <button
              onClick={handlePanicActivation}
              disabled={triggerPanic.isPending}
              className="h-32 w-full max-w-2xl rounded-lg bg-gradient-to-r from-red-600 to-red-800 text-2xl font-bold uppercase tracking-wider shadow-lg shadow-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/70 disabled:opacity-50"
            >
              {triggerPanic.isPending ? 'Activating...' : 'Activate Panic Mode'}
            </button>
            <p className="mt-4 text-sm text-gray-400">Hotkey: Ctrl+Shift+P</p>
          </div>
        </BentoCard>

        {/* Environment Mixer */}
        <BentoCard className="border-green-500/30 bg-green-500/5">
          <EnvironmentMixer />
        </BentoCard>

        {/* Environment Spoofing */}
        <BentoCard className="border-blue-500/30 bg-blue-500/5">
          <EnvironmentSpoofing />
        </BentoCard>

        {/* Packet Jitter Simulator */}
        <BentoCard className="border-yellow-500/30 bg-yellow-500/5">
          <PacketJitterSimulator />
        </BentoCard>

        {/* Hardware Mimicry */}
        <BentoCard className="border-purple-500/30 bg-purple-500/5">
          <HardwareMimicry />
        </BentoCard>
      </div>

      {panicActive && <PanicProtocol onClose={() => setPanicActive(false)} />}
    </div>
  );
}
