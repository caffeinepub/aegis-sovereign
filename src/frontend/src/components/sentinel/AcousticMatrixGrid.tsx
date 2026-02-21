import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Play, Square } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  image: string;
}

const environments: Environment[] = [
  { id: 'office', name: 'Open Office', image: '/assets/generated/env-office.dim_256x256.png' },
  { id: 'jet', name: 'Private Jet', image: '/assets/generated/env-jet.dim_256x256.png' },
  { id: 'airport', name: 'Heathrow', image: '/assets/generated/env-airport.dim_256x256.png' },
  { id: 'cafe', name: 'NYC Street', image: '/assets/generated/env-cafe.dim_256x256.png' },
  { id: 'rain', name: 'Rain', image: '/assets/generated/env-office.dim_256x256.png' },
  { id: 'terminal', name: 'Airport Terminal', image: '/assets/generated/env-airport.dim_256x256.png' },
  { id: 'conference', name: 'Conference Room', image: '/assets/generated/env-office.dim_256x256.png' },
  { id: 'datacenter', name: 'Datacenter', image: '/assets/generated/env-office.dim_256x256.png' },
];

export default function AcousticMatrixGrid() {
  const [activeEnv, setActiveEnv] = useState<string | null>(null);

  const toggleEnvironment = (id: string) => {
    setActiveEnv(activeEnv === id ? null : id);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {environments.map((env) => {
        const isActive = activeEnv === env.id;
        return (
          <Card
            key={env.id}
            className={`relative overflow-hidden cursor-pointer transition-all ${
              isActive
                ? 'border-[#10b981] shadow-lg shadow-[#10b981]/50'
                : 'border-white/10 hover:border-white/30'
            }`}
            onClick={() => toggleEnvironment(env.id)}
          >
            <div className="aspect-square relative">
              <img
                src={env.image}
                alt={env.name}
                className={`w-full h-full object-cover ${isActive ? 'opacity-100' : 'opacity-60'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm mb-2">{env.name}</p>
                <div className="flex items-center gap-2">
                  {isActive ? (
                    <>
                      <Square className="h-4 w-4 text-[#10b981]" />
                      <span className="text-xs text-[#10b981] font-semibold">ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 text-white/60" />
                      <span className="text-xs text-white/60">INACTIVE</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
