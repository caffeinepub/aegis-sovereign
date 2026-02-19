import { useState } from 'react';
import { Play, Square } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  image: string;
}

export default function EnvironmentSpoofing() {
  const [activeEnv, setActiveEnv] = useState<string | null>(null);

  const environments: Environment[] = [
    { id: 'office', name: 'Office', image: '/assets/generated/env-office.dim_256x256.png' },
    { id: 'jet', name: 'Private Jet', image: '/assets/generated/env-jet.dim_256x256.png' },
    { id: 'cafe', name: 'Cafe', image: '/assets/generated/env-cafe.dim_256x256.png' },
    { id: 'airport', name: 'Airport', image: '/assets/generated/env-airport.dim_256x256.png' },
    { id: 'library', name: 'Library', image: '/assets/generated/env-office.dim_256x256.png' },
    { id: 'restaurant', name: 'Restaurant', image: '/assets/generated/env-cafe.dim_256x256.png' },
    { id: 'train', name: 'Train', image: '/assets/generated/env-airport.dim_256x256.png' },
    { id: 'park', name: 'Park', image: '/assets/generated/env-office.dim_256x256.png' },
    { id: 'gym', name: 'Gym', image: '/assets/generated/env-office.dim_256x256.png' },
    { id: 'mall', name: 'Shopping Mall', image: '/assets/generated/env-cafe.dim_256x256.png' },
    { id: 'hotel', name: 'Hotel Lobby', image: '/assets/generated/env-jet.dim_256x256.png' },
    { id: 'conference', name: 'Conference', image: '/assets/generated/env-office.dim_256x256.png' },
    { id: 'street', name: 'Street', image: '/assets/generated/env-airport.dim_256x256.png' },
    { id: 'car', name: 'Car', image: '/assets/generated/env-jet.dim_256x256.png' },
    { id: 'beach', name: 'Beach', image: '/assets/generated/env-cafe.dim_256x256.png' },
    { id: 'mountain', name: 'Mountain', image: '/assets/generated/env-office.dim_256x256.png' },
  ];

  const toggleEnvironment = (id: string) => {
    setActiveEnv(activeEnv === id ? null : id);
  };

  return (
    <div className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Environment Audio Spoofing</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {environments.map((env) => {
          const isActive = activeEnv === env.id;
          return (
            <button
              key={env.id}
              onClick={() => toggleEnvironment(env.id)}
              className={`group relative overflow-hidden rounded-lg border transition-all ${
                isActive
                  ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/30'
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
            >
              <div className="aspect-square">
                <img src={env.image} alt={env.name} className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  {isActive ? (
                    <Square className="h-8 w-8 text-blue-400" />
                  ) : (
                    <Play className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </div>
              </div>
              <div className="p-2 text-center">
                <p className="text-xs font-medium">{env.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
