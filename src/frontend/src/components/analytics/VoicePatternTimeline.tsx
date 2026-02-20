import { useState, useEffect } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface Speaker {
  id: number;
  name: string;
  color: string;
}

interface Segment {
  speaker: number;
  start: number;
  duration: number;
  volume: number;
}

const SPEAKERS: Speaker[] = [
  { id: 1, name: 'Speaker 1', color: '#10b981' },
  { id: 2, name: 'Speaker 2', color: '#3b82f6' },
  { id: 3, name: 'Speaker 3', color: '#f59e0b' },
  { id: 4, name: 'Speaker 4', color: '#ef4444' },
  { id: 5, name: 'Speaker 5', color: '#8b5cf6' },
  { id: 6, name: 'Speaker 6', color: '#ec4899' },
  { id: 7, name: 'Speaker 7', color: '#06b6d4' },
  { id: 8, name: 'Speaker 8', color: '#84cc16' },
];

export default function VoicePatternTimeline() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const generateSegments = () => {
      const newSegments: Segment[] = [];
      let time = 0;
      
      while (time < 300) {
        const speaker = Math.floor(Math.random() * 8) + 1;
        const duration = 5 + Math.random() * 20;
        const volume = 0.3 + Math.random() * 0.7;
        
        newSegments.push({ speaker, start: time, duration, volume });
        time += duration + Math.random() * 5;
      }
      
      setSegments(newSegments);
    };

    generateSegments();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => (prev + 1) % 300);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Voice Pattern Timeline</h3>
          <p className="text-sm text-gray-400">Speaker vocal signatures and activity</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      <div className="relative">
        {/* Time markers */}
        <div className="mb-2 flex justify-between text-xs text-gray-500">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map(time => (
            <span key={time}>{formatTime(time)}</span>
          ))}
        </div>

        {/* Timeline container */}
        <div className="relative overflow-x-auto">
          <div className="space-y-2" style={{ width: '100%', minWidth: '800px' }}>
            {SPEAKERS.map(speaker => (
              <div key={speaker.id} className="flex items-center gap-3">
                <div className="w-24 flex-shrink-0 text-sm font-medium" style={{ color: speaker.color }}>
                  {speaker.name}
                </div>
                <div className="relative h-12 flex-1 rounded-lg border border-white/10 bg-white/5">
                  {segments
                    .filter(seg => seg.speaker === speaker.id)
                    .map((seg, idx) => (
                      <div
                        key={idx}
                        className="absolute top-1 cursor-pointer rounded transition-all hover:opacity-80"
                        style={{
                          left: `${(seg.start / 300) * 100}%`,
                          width: `${(seg.duration / 300) * 100}%`,
                          height: `${seg.volume * 80}%`,
                          backgroundColor: speaker.color,
                          opacity: 0.7,
                        }}
                        onClick={() => setSelectedSegment(seg)}
                        onMouseEnter={(e) => {
                          const waveform = document.createElement('div');
                          waveform.className = 'absolute -top-8 left-0 h-6 w-full';
                          waveform.innerHTML = `
                            <svg width="100%" height="100%" viewBox="0 0 100 24">
                              <path d="M0,12 Q25,${12 - seg.volume * 8} 50,12 T100,12" 
                                    stroke="${speaker.color}" 
                                    fill="none" 
                                    stroke-width="2"/>
                            </svg>
                          `;
                          e.currentTarget.appendChild(waveform);
                        }}
                        onMouseLeave={(e) => {
                          const waveform = e.currentTarget.querySelector('div');
                          if (waveform) waveform.remove();
                        }}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Current time indicator */}
          <div
            className="pointer-events-none absolute top-0 h-full w-0.5 bg-emerald-400"
            style={{ left: `${(currentTime / 300) * 100}%` }}
          />
        </div>

        {/* Selected segment info */}
        {selectedSegment && (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm">
            <div className="font-semibold">
              {SPEAKERS.find(s => s.id === selectedSegment.speaker)?.name}
            </div>
            <div className="mt-1 text-gray-400">
              Start: {formatTime(selectedSegment.start)} | Duration: {selectedSegment.duration.toFixed(1)}s | 
              Volume: {(selectedSegment.volume * 100).toFixed(0)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
