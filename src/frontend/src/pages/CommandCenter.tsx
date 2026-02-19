import { useEffect, useState } from 'react';
import BentoCard from '../components/layout/BentoCard';
import NeuralFrequencyVisualizer from '../components/visualizer/NeuralFrequencyVisualizer';
import SentimentRadar from '../components/analytics/SentimentRadar';
import MeetingROITicker from '../components/analytics/MeetingROITicker';
import SpeakerIdentityMatrix from '../components/analytics/SpeakerIdentityMatrix';
import SystemAuditTrail from '../components/analytics/SystemAuditTrail';
import BiometricStressRadar from '../components/analytics/BiometricStressRadar';
import GlobalNodeMap from '../components/analytics/GlobalNodeMap';
import NeuralPacketStream from '../components/analytics/NeuralPacketStream';
import WaterfallSpectrogram from '../components/visualizer/WaterfallSpectrogram';
import SovereignOrb from '../components/effects/SovereignOrb';
import { Loader2 } from 'lucide-react';

export default function CommandCenter() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Small delay to ensure all components are ready
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Command Center</h1>
        <p className="text-gray-400">Real-time meeting intelligence dashboard</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sovereign Orb - Centerpiece */}
        <div className="col-span-12 lg:col-span-6">
          <BentoCard showBeam={true}>
            <div className="h-80">
              <SovereignOrb />
            </div>
          </BentoCard>
        </div>

        {/* Neural Packet Stream */}
        <div className="col-span-12 lg:col-span-6">
          <BentoCard>
            <div className="h-80">
              <NeuralPacketStream />
            </div>
          </BentoCard>
        </div>

        {/* Neural Visualizer */}
        <div className="col-span-12 lg:col-span-8">
          <BentoCard>
            <div className="h-64">
              <NeuralFrequencyVisualizer />
            </div>
          </BentoCard>
        </div>

        {/* Waterfall Spectrogram */}
        <div className="col-span-12 lg:col-span-4">
          <BentoCard>
            <div className="h-64">
              <WaterfallSpectrogram />
            </div>
          </BentoCard>
        </div>

        {/* Sentiment Radar */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <BentoCard>
            <SentimentRadar />
          </BentoCard>
        </div>

        {/* ROI Ticker */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <BentoCard>
            <MeetingROITicker />
          </BentoCard>
        </div>

        {/* Biometric Stress Radar */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <BentoCard showBeam={true}>
            <BiometricStressRadar />
          </BentoCard>
        </div>

        {/* Global Node Map */}
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <BentoCard showBeam={true}>
            <GlobalNodeMap />
          </BentoCard>
        </div>

        {/* Speaker Matrix */}
        <div className="col-span-12 lg:col-span-8">
          <BentoCard>
            <SpeakerIdentityMatrix />
          </BentoCard>
        </div>

        {/* System Audit Trail */}
        <div className="col-span-12 lg:col-span-4">
          <BentoCard showBeam={true}>
            <div className="h-96">
              <SystemAuditTrail />
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
