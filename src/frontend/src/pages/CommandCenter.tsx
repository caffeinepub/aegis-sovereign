import BentoCard from '../components/layout/BentoCard';
import NeuralFrequencyVisualizer from '../components/visualizer/NeuralFrequencyVisualizer';
import SentimentRadar from '../components/analytics/SentimentRadar';
import MeetingROITicker from '../components/analytics/MeetingROITicker';
import SpeakerIdentityMatrix from '../components/analytics/SpeakerIdentityMatrix';

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Command Center</h1>
        <p className="text-gray-400">Real-time meeting intelligence dashboard</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Neural Visualizer - Top Full Width */}
        <BentoCard className="lg:col-span-12">
          <div className="h-64">
            <NeuralFrequencyVisualizer />
          </div>
        </BentoCard>

        {/* Sentiment Radar - Large */}
        <BentoCard className="lg:col-span-8">
          <SentimentRadar />
        </BentoCard>

        {/* ROI Ticker */}
        <BentoCard className="lg:col-span-4">
          <MeetingROITicker />
        </BentoCard>

        {/* Speaker Matrix */}
        <BentoCard className="lg:col-span-12">
          <SpeakerIdentityMatrix />
        </BentoCard>
      </div>
    </div>
  );
}
