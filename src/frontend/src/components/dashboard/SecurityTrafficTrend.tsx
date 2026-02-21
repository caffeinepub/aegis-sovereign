import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SecurityTrafficTrend() {
  // Mock data for the last 7 days
  const data = [
    { day: 'Mon', traffic: 1200 },
    { day: 'Tue', traffic: 1900 },
    { day: 'Wed', traffic: 1600 },
    { day: 'Thu', traffic: 2400 },
    { day: 'Fri', traffic: 2100 },
    { day: 'Sat', traffic: 1800 },
    { day: 'Sun', traffic: 2600 },
  ];

  return (
    <Card className="bg-white shadow-md rounded-lg border border-gray-200 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#001529]">Security Traffic Trend</CardTitle>
        <p className="text-sm text-gray-500">Last 7 days</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              label={{ value: 'Traffic Volume', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#6b7280' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="traffic" 
              stroke="#1890FF" 
              strokeWidth={2}
              dot={{ fill: '#1890FF', r: 4 }}
              activeDot={{ r: 6 }}
              name="Traffic Volume"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
