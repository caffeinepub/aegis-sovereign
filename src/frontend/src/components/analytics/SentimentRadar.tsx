import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface SentimentData {
  time: string;
  stress: number;
  tension: number;
}

export default function SentimentRadar() {
  const [data, setData] = useState<SentimentData[]>([]);

  useEffect(() => {
    const generateData = (): SentimentData[] => {
      const newData: SentimentData[] = [];
      const now = Date.now();
      for (let i = 20; i >= 0; i--) {
        newData.push({
          time: new Date(now - i * 3000).toLocaleTimeString(),
          stress: 30 + Math.random() * 40,
          tension: 25 + Math.random() * 35,
        });
      }
      return newData;
    };

    setData(generateData());

    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint: SentimentData = {
          time: new Date().toLocaleTimeString(),
          stress: 30 + Math.random() * 40,
          tension: 25 + Math.random() * 35,
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Sentiment Pulse</h3>
          <p className="text-sm text-gray-400">Live emotional analysis tracking</p>
        </div>
        <ActiveStatusIndicator />
      </div>
      <ChartContainer
        config={{
          stress: { label: 'Vocal Stress', color: 'oklch(var(--chart-1))' },
          tension: { label: 'Emotional Tension', color: 'oklch(var(--chart-2))' },
        }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="oklch(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTension" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(var(--chart-2))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="oklch(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
            <Tooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="oklch(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorStress)"
            />
            <Area
              type="monotone"
              dataKey="tension"
              stroke="oklch(var(--chart-2))"
              fillOpacity={1}
              fill="url(#colorTension)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
