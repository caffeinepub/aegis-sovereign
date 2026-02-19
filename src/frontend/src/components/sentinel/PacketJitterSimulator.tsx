import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { toast } from 'sonner';

export default function PacketJitterSimulator() {
  const [jitter, setJitter] = useState([0]);

  useKeyboardShortcut(['Control', 'Shift', 'L'], () => {
    setJitter([50]);
    toast.info('Lag simulation activated');
  });

  return (
    <div className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Packet Jitter Simulator</h3>
      <div className="space-y-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">Audio Degradation Level</span>
            <span className="text-2xl font-bold text-blue-400">{jitter[0]}%</span>
          </div>
          <Slider
            value={jitter}
            onValueChange={setJitter}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-green-400">{Math.max(0, 100 - jitter[0])}%</p>
            <p className="text-xs text-gray-400">Quality</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-yellow-400">{Math.floor(jitter[0] * 5)}ms</p>
            <p className="text-xs text-gray-400">Latency</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-red-400">{Math.floor(jitter[0] / 10)}%</p>
            <p className="text-xs text-gray-400">Packet Loss</p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">Hotkey: Ctrl+Shift+L</p>
      </div>
    </div>
  );
}
