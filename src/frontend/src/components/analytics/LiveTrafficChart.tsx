import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface TrafficData {
  time: string;
  traffic: number;
}

export default function LiveTrafficChart() {
  const [data, setData] = useState<TrafficData[]>(() => {
    const initialData: TrafficData[] = [];
    for (let i = 0; i < 20; i++) {
      initialData.push({
        time: `${i}:00`,
        traffic: Math.floor(Math.random() * 100) + 50,
      });
    }
    return initialData;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        newData.push({
          time: `${newData.length}:00`,
          traffic: Math.floor(Math.random() * 100) + 50,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-900">Live Traffic</CardTitle>
        <p className="text-sm text-slate-600">Real-time network activity monitoring</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="time" stroke="#64748B" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#4F46E5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTraffic)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
