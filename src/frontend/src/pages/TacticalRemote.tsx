import { useState } from 'react';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import { AlertTriangle, Radio, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function TacticalRemote() {
  const { heavy, medium } = useHapticFeedback();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const handlePanic = () => {
    heavy();
    setActiveFeature('panic');
    toast.error('Panic protocol activated!');
  };

  const handleLag = () => {
    medium();
    setActiveFeature('lag');
    toast.info('Lag simulation activated');
  };

  const handleEnvironment = () => {
    medium();
    setActiveFeature('environment');
    toast.info('Environment spoofing active');
  };

  return (
    <div className="flex min-h-screen flex-col bg-black p-6 text-white">
      <div className="mb-8 text-center">
        <img src="/assets/generated/aegis-logo.dim_512x512.png" alt="Aegis" className="mx-auto mb-4 h-16 w-16" />
        <h1 className="text-2xl font-bold">Tactical Remote</h1>
        <p className="text-sm text-gray-400">Mobile Command Interface</p>
      </div>

      <div className="flex flex-1 flex-col gap-6">
        <button
          onClick={handlePanic}
          className={`flex h-48 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-2xl transition-all active:scale-95 ${
            activeFeature === 'panic' ? 'ring-4 ring-red-400' : ''
          }`}
        >
          <AlertTriangle className="mb-4 h-16 w-16" />
          <span className="text-2xl font-bold uppercase tracking-wider">Panic Mode</span>
        </button>

        <button
          onClick={handleLag}
          className={`flex h-32 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-600 to-orange-600 shadow-2xl transition-all active:scale-95 ${
            activeFeature === 'lag' ? 'ring-4 ring-yellow-400' : ''
          }`}
        >
          <Zap className="mb-3 h-12 w-12" />
          <span className="text-xl font-bold uppercase tracking-wider">Lag Simulation</span>
        </button>

        <button
          onClick={handleEnvironment}
          className={`flex h-32 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl transition-all active:scale-95 ${
            activeFeature === 'environment' ? 'ring-4 ring-blue-400' : ''
          }`}
        >
          <Radio className="mb-3 h-12 w-12" />
          <span className="text-xl font-bold uppercase tracking-wider">Environment Spoof</span>
        </button>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Aegis Sovereign Tactical Remote v1.0</p>
        <p className="mt-1">Encrypted Connection Active</p>
      </div>
    </div>
  );
}
