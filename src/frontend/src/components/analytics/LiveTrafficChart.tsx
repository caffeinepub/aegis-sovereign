import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
    <Card className="bg-card border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Live Traffic</CardTitle>
        <p className="text-sm text-muted-foreground">Real-time network activity</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="#10b981" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#10b981' }}
            />
            <YAxis 
              stroke="#10b981" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#10b981' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#050505',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                color: '#10b981',
              }}
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#10b981"
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
