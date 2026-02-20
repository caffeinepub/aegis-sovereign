import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Wifi } from 'lucide-react';
import { toast } from 'sonner';

type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';

interface QualityPreset {
  level: QualityLevel;
  bandwidth: string;
  description: string;
}

const PRESETS: QualityPreset[] = [
  { level: 'low', bandwidth: '0.5 Mbps', description: 'Minimal data usage, reduced visual quality' },
  { level: 'medium', bandwidth: '1.5 Mbps', description: 'Balanced performance and quality' },
  { level: 'high', bandwidth: '3 Mbps', description: 'High quality visuals, smooth animations' },
  { level: 'ultra', bandwidth: '5+ Mbps', description: 'Maximum quality, all effects enabled' },
];

export default function BandwidthOptimizer() {
  const [selectedQuality, setSelectedQuality] = useState<QualityLevel>(() => {
    return (localStorage.getItem('bandwidthQuality') as QualityLevel) || 'high';
  });
  const [currentUsage, setCurrentUsage] = useState(0);

  useEffect(() => {
    const bandwidthMap: Record<QualityLevel, number> = {
      low: 0.5,
      medium: 1.5,
      high: 3,
      ultra: 5,
    };

    const targetUsage = bandwidthMap[selectedQuality];
    const interval = setInterval(() => {
      setCurrentUsage(prev => {
        const diff = targetUsage - prev;
        return prev + diff * 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [selectedQuality]);

  const handleQualityChange = (level: QualityLevel) => {
    setSelectedQuality(level);
    localStorage.setItem('bandwidthQuality', level);
    
    const preset = PRESETS.find(p => p.level === level);
    toast.success(`Quality set to ${level.toUpperCase()}`, {
      description: `Estimated bandwidth: ${preset?.bandwidth}`,
    });
  };

  const getSavings = (level: QualityLevel) => {
    const bandwidthMap: Record<QualityLevel, number> = {
      low: 0.5,
      medium: 1.5,
      high: 3,
      ultra: 5,
    };
    
    const savings = ((5 - bandwidthMap[level]) / 5) * 100;
    return savings > 0 ? `${savings.toFixed(0)}% savings` : 'Maximum quality';
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Bandwidth Optimization</h2>
        <p className="text-sm text-gray-400">Adjust streaming quality to optimize bandwidth usage</p>
      </div>

      {/* Live Bandwidth Meter */}
      <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-emerald-400" />
            <span className="font-semibold">Current Usage</span>
          </div>
          <span className="text-2xl font-bold text-emerald-400">{currentUsage.toFixed(1)} Mbps</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
            style={{ width: `${(currentUsage / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Quality Presets */}
      <div className="grid gap-4 md:grid-cols-2">
        {PRESETS.map(preset => (
          <button
            key={preset.level}
            onClick={() => handleQualityChange(preset.level)}
            className={`relative rounded-lg border p-4 text-left transition-all ${
              selectedQuality === preset.level
                ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            {selectedQuality === preset.level && (
              <div className="absolute right-3 top-3">
                <Check className="h-5 w-5 text-emerald-400" />
              </div>
            )}
            
            <div className="mb-2 text-lg font-semibold capitalize">{preset.level}</div>
            <div className="mb-1 text-sm text-emerald-400">{preset.bandwidth}</div>
            <div className="mb-3 text-xs text-gray-400">{preset.description}</div>
            <div className="text-xs font-medium text-cyan-400">{getSavings(preset.level)}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
        <p className="text-sm text-blue-400">
          <strong>Tip:</strong> Lower quality settings reduce bandwidth usage and improve performance on slower connections.
          Changes apply immediately to all visualizer components.
        </p>
      </div>
    </div>
  );
}
