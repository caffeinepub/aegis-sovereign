import { useState } from 'react';
import { Monitor, X } from 'lucide-react';

export default function HardwareMimicry() {
  const [activeOS, setActiveOS] = useState<string | null>(null);

  const osUpdates = [
    { id: 'win11', name: 'Windows 11 Update', image: '/assets/generated/fake-win11-update.dim_1920x1080.png' },
    { id: 'macos', name: 'macOS Update', image: '/assets/generated/fake-macos-update.dim_1920x1080.png' },
  ];

  return (
    <div className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Hardware Mimicry</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {osUpdates.map((os) => (
          <button
            key={os.id}
            onClick={() => setActiveOS(os.id)}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-white/30 hover:bg-white/10"
          >
            <Monitor className="mb-3 h-8 w-8 text-blue-400" />
            <h4 className="mb-2 font-semibold">{os.name}</h4>
            <p className="text-sm text-gray-400">Display fake OS update screen</p>
          </button>
        ))}
      </div>

      {activeOS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <img
            src={osUpdates.find((os) => os.id === activeOS)?.image}
            alt="OS Update"
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => setActiveOS(null)}
            className="fixed right-8 top-8 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
