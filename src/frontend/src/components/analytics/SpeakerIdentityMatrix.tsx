import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface Speaker {
  id: number;
  name: string;
  frequency: string;
  activity: number;
}

export default function SpeakerIdentityMatrix() {
  const [speakers, setSpeakers] = useState<Speaker[]>([
    { id: 1, name: 'Speaker Alpha', frequency: '180-220 Hz', activity: 85 },
    { id: 2, name: 'Speaker Beta', frequency: '140-180 Hz', activity: 62 },
    { id: 3, name: 'Speaker Gamma', frequency: '200-240 Hz', activity: 45 },
    { id: 4, name: 'Speaker Delta', frequency: '160-200 Hz', activity: 38 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeakers((prev) =>
        prev.map((speaker) => ({
          ...speaker,
          activity: Math.max(20, Math.min(100, speaker.activity + (Math.random() - 0.5) * 20)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Speaker Identity Matrix</h3>
          <p className="text-sm text-gray-400">Vocal frequency tracking</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      <div className="space-y-3">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <User className="h-6 w-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-medium">{speaker.name}</span>
                <span className="text-sm text-gray-400">{speaker.activity}%</span>
              </div>
              <div className="mb-2 text-xs text-gray-500">{speaker.frequency}</div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${speaker.activity}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
