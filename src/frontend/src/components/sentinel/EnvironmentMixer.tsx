import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Volume2, Coffee, Plane, Building2, Trees, Waves, Car, Server } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  icon: React.ReactNode;
  volume: number;
}

export default function EnvironmentMixer() {
  const [environments, setEnvironments] = useState<Environment[]>([
    { id: 'office', name: 'Office', icon: <Building2 className="h-6 w-6" />, volume: 0 },
    { id: 'rain', name: 'Rain', icon: <Waves className="h-6 w-6" />, volume: 0 },
    { id: 'cafe', name: 'Cafe', icon: <Coffee className="h-6 w-6" />, volume: 0 },
    { id: 'airport', name: 'Airport', icon: <Plane className="h-6 w-6" />, volume: 0 },
    { id: 'forest', name: 'Forest', icon: <Trees className="h-6 w-6" />, volume: 0 },
    { id: 'ocean', name: 'Ocean', icon: <Waves className="h-6 w-6" />, volume: 0 },
    { id: 'city', name: 'City', icon: <Car className="h-6 w-6" />, volume: 0 },
    { id: 'datacenter', name: 'Datacenter', icon: <Server className="h-6 w-6" />, volume: 0 },
  ]);

  const handleVolumeChange = (id: string, value: number[]) => {
    setEnvironments((prev) =>
      prev.map((env) => (env.id === id ? { ...env, volume: value[0] } : env))
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-400">Environment Mixer</h3>
        <p className="text-sm text-gray-400">Tactical audio masking controls</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {environments.map((env) => (
          <div
            key={env.id}
            className="rounded-lg border border-green-500/20 bg-black/50 p-4 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-lg bg-green-500/10 p-2 text-green-400 ${
                    env.volume > 0 ? 'animate-pulse' : ''
                  }`}
                >
                  {env.icon}
                </div>
                <span className="font-medium text-white">{env.name}</span>
              </div>
              <span className="text-sm font-mono text-green-400">{env.volume}%</span>
            </div>
            <Slider
              value={[env.volume]}
              onValueChange={(value) => handleVolumeChange(env.id, value)}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
