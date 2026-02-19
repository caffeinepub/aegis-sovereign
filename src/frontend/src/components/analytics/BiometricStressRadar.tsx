import { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface BiometricData {
  metric: string;
  value: number;
  fullMark: number;
}

export default function BiometricStressRadar() {
  const [data, setData] = useState<BiometricData[]>([
    { metric: 'Executive Stress', value: 65, fullMark: 100 },
    { metric: 'Vocal Stability', value: 78, fullMark: 100 },
    { metric: 'Background Noise', value: 42, fullMark: 100 },
    { metric: 'Packet Health', value: 88, fullMark: 100 },
    { metric: 'Privacy Score', value: 92, fullMark: 100 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          value: Math.max(30, Math.min(100, item.value + (Math.random() - 0.5) * 15)),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Biometric Stress Radar</h3>
          <p className="text-sm text-gray-400">5-axis health monitoring</p>
        </div>
        <ActiveStatusIndicator />
      </div>
      <ChartContainer
        config={{
          value: { label: 'Value', color: 'oklch(var(--chart-1))' },
        }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(255,255,255,0.3)" />
            <Radar
              name="Biometric"
              dataKey="value"
              stroke="oklch(var(--chart-1))"
              fill="oklch(var(--chart-1))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
