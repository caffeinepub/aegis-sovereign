import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  frequency: string;
  activity: number;
}

export default function SpeakerIdentityMatrix() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    const generateSpeakers = () => {
      const names = ['Alice Chen', 'Bob Kumar', 'Carol Smith', 'David Lee', 'Emma Wilson'];
      return names.map((name, i) => ({
        id: `speaker-${i}`,
        name,
        frequency: `${(200 + Math.random() * 300).toFixed(0)} Hz`,
        activity: Math.random() * 100,
      }));
    };

    setSpeakers(generateSpeakers());

    const interval = setInterval(() => {
      setSpeakers((prev) =>
        prev.map((speaker) => ({
          ...speaker,
          frequency: `${(200 + Math.random() * 300).toFixed(0)} Hz`,
          activity: Math.random() * 100,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Speaker Identity Matrix</h3>
        <p className="text-sm text-gray-400">Vocal frequency analysis</p>
      </div>

      <ScrollArea className="h-48">
        <div className="space-y-3">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{speaker.name}</p>
                <p className="text-sm text-gray-400">Frequency: {speaker.frequency}</p>
              </div>
              <div className="text-right">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${speaker.activity}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">{speaker.activity.toFixed(0)}% active</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
