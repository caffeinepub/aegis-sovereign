import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Globe, Shield, Activity } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function KPIMetricsRow() {
  const threatsData = [
    { value: 45 },
    { value: 62 },
    { value: 38 },
    { value: 71 },
    { value: 55 },
    { value: 68 },
    { value: 82 },
  ];

  const healthData = [{ value: 98, fill: '#2563eb' }];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {/* Card 1: Total Secured Meetings */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
              <TrendingUp className="h-4 w-4" />
              <span>+12%</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 font-medium mb-1">Secured Meetings</p>
          <h2 className="text-3xl font-bold text-slate-900">1,247</h2>
          <p className="text-xs text-slate-500 mt-1">vs last week</p>
        </CardContent>
      </Card>

      {/* Card 2: Active Global Nodes */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-indigo-100">
              <Globe className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="relative h-3 w-3">
              <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-500 opacity-75"></div>
              <div className="relative h-3 w-3 rounded-full bg-emerald-500"></div>
            </div>
          </div>
          <p className="text-sm text-slate-600 font-medium mb-1">Global Nodes</p>
          <h2 className="text-3xl font-bold text-slate-900">24</h2>
          <p className="text-xs text-slate-500 mt-1">Worldwide coverage</p>
        </CardContent>
      </Card>

      {/* Card 3: Threats Neutralized */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-100">
              <Activity className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-slate-600 font-medium mb-1">Threats Neutralized</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">342</h2>
          <ResponsiveContainer width="100%" height={40}>
            <BarChart data={threatsData}>
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Card 4: Sovereign Health Score */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-slate-600 font-medium mb-1">Health Score</p>
              <h2 className="text-4xl font-bold text-blue-600">98%</h2>
              <p className="text-xs text-slate-500 mt-1">Excellent</p>
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
                    background={{ fill: '#e0e7ff' }}
                    dataKey="value"
                    cornerRadius={10}
                    fill="#2563eb"
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
