import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function KPIMetricsRow() {
  // Mock data for Threats Neutralized bar chart
  const threatsData = [
    { value: 45 },
    { value: 62 },
    { value: 38 },
    { value: 71 },
    { value: 55 },
    { value: 68 },
    { value: 82 },
  ];

  // Mock data for Sovereign Health Score radial gauge
  const healthData = [{ value: 98, fill: '#10b981' }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1: Total Secured Meetings */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 mb-2">Total Secured Meetings</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-bold text-[#001529]">1,247</h2>
              <div className="flex items-center gap-1 text-[#10b981] text-sm font-semibold">
                <TrendingUp className="h-4 w-4" />
                <span>+12%</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">vs last week</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Active Global Nodes */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 mb-2">Active Global Nodes</p>
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold text-[#001529]">24</h2>
              <div className="relative h-4 w-4">
                <div className="absolute inset-0 animate-pulse-green rounded-full bg-[#10b981] opacity-75"></div>
                <div className="relative h-4 w-4 rounded-full bg-[#10b981]"></div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Worldwide coverage</p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Threats Neutralized */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 mb-2">Threats Neutralized</p>
            <h2 className="text-4xl font-bold text-[#001529] mb-3">342</h2>
            <ResponsiveContainer width="100%" height={40}>
              <BarChart data={threatsData}>
                <Bar dataKey="value" fill="#1890FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Card 4: Sovereign Health Score */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Sovereign Health Score</p>
              <h2 className="text-4xl font-bold text-[#10b981]">98%</h2>
              <p className="text-xs text-gray-400 mt-1">Excellent</p>
            </div>
            <div className="w-20 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  data={healthData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    fill="#10b981"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
