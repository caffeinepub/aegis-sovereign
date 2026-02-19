import BentoCard from '../components/layout/BentoCard';
import EnvironmentSpoofing from '../components/sentinel/EnvironmentSpoofing';
import PacketJitterSimulator from '../components/sentinel/PacketJitterSimulator';
import HardwareMimicry from '../components/sentinel/HardwareMimicry';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import PanicProtocol from '../components/sentinel/PanicProtocol';

export default function SentinelProtocol() {
  const [panicActive, setPanicActive] = useState(false);

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
        {/* Emergency Panic Button */}
        <BentoCard className="border-red-500/30 bg-red-500/5">
          <div className="p-8 text-center">
            <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-400" />
            <h2 className="mb-4 text-2xl font-bold text-red-400">EMERGENCY PROTOCOL</h2>
            <button
              onClick={() => setPanicActive(true)}
              className="h-32 w-full max-w-2xl rounded-lg bg-gradient-to-r from-red-600 to-red-800 text-2xl font-bold uppercase tracking-wider shadow-lg shadow-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/70"
            >
              Activate Panic Mode
            </button>
            <p className="mt-4 text-sm text-gray-400">Hotkey: Ctrl+Shift+P</p>
          </div>
        </BentoCard>

        {/* Environment Spoofing */}
        <BentoCard>
          <EnvironmentSpoofing />
        </BentoCard>

        {/* Packet Jitter */}
        <BentoCard>
          <PacketJitterSimulator />
        </BentoCard>

        {/* Hardware Mimicry */}
        <BentoCard>
          <HardwareMimicry />
        </BentoCard>
      </div>

      {panicActive && <PanicProtocol onClose={() => setPanicActive(false)} />}
    </div>
  );
}
