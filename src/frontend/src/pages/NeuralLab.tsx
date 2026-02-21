import { useState } from 'react';
import BentoCard from '../components/layout/BentoCard';
import VocalDropZone from '../components/neural/VocalDropZone';
import NeuralProgress from '../components/neural/NeuralProgress';
import VoiceHealthDashboard from '../components/neural/VoiceHealthDashboard';
import AIMirrorStatus from '../components/neural/AIMirrorStatus';
import MagneticButton from '../components/MagneticButton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function NeuralLab() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [personaSpec, setPersonaSpec] = useState('');

  const handleSynthesize = () => {
    if (!personaSpec.trim()) {
      toast.error('Please specify persona characteristics');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);
    toast.info('Neural synthesis initiated...');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsComplete(true);
          toast.success('Neural proxy ready!');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div
      className="min-h-screen bg-black p-6"
      style={{
        backgroundImage: 'url(/assets/generated/neural-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Neural Lab</h1>
        <p className="text-gray-400">Advanced vocal cloning and synthesis</p>
      </div>

      <div className="grid gap-6">
        {/* Persona Specification */}
        <BentoCard>
          <div className="p-6">
            <Label htmlFor="persona" className="text-lg font-semibold mb-4 block">
              PERSONA SPECIFICATION
            </Label>
            <Textarea
              id="persona"
              placeholder="e.g., British inflection, formal tone, confident delivery, slight accent on technical terms..."
              value={personaSpec}
              onChange={(e) => setPersonaSpec(e.target.value)}
              className="min-h-32 font-mono text-sm bg-white/5 border-white/10 focus:border-[#10b981]"
            />
            <MagneticButton
              size="lg"
              onClick={handleSynthesize}
              disabled={isProcessing}
              className="w-full mt-4"
            >
              {isProcessing ? 'SYNTHESIZING...' : 'BEGIN NEURAL SYNTHESIS'}
            </MagneticButton>
          </div>
        </BentoCard>

        <div className="grid gap-6 lg:grid-cols-2">
          <BentoCard>
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Vocal Sample Upload</h3>
              <VocalDropZone />
            </div>
          </BentoCard>

          <BentoCard>
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Neural Synthesis Progress</h3>
              <div className="flex flex-col items-center justify-center space-y-6">
                <NeuralProgress progress={progress} />
              </div>
            </div>
          </BentoCard>
        </div>

        <BentoCard className="lg:col-span-2">
          <VoiceHealthDashboard />
        </BentoCard>

        <BentoCard className="lg:col-span-2">
          <AIMirrorStatus isReady={isComplete} />
        </BentoCard>
      </div>
    </div>
  );
}
