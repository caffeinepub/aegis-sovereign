import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Activity, Users, Zap, TrendingUp, TrendingDown } from 'lucide-react';

export default function Overview() {
  const securityHealth = 98;

  const networkStats = [
    {
      title: 'Active Sessions',
      value: '12',
      icon: Activity,
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Neural Efficiency',
      value: '94%',
      icon: Zap,
      trend: '+8%',
      trendUp: true,
    },
  ];

  const teamAccess = [
    {
      title: 'Team Members',
      value: '8',
      icon: Users,
      trend: '+2',
      trendUp: true,
    },
    {
      title: 'Threats (24h)',
      value: '0',
      icon: Shield,
      trend: '-3%',
      trendUp: false,
    },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg h-full">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          System Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* PRIMARY KPI */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-lg bg-blue-600 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600 font-medium mb-1">Security Health</p>
              <div className="flex items-baseline gap-3">
                <p className="text-5xl font-bold text-blue-600">{securityHealth}%</p>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-semibold">+2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NETWORK STATS */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Network Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {networkStats.map((metric) => {
              const Icon = metric.icon;
              const TrendIcon = metric.trendUp ? TrendingUp : TrendingDown;
              return (
                <div
                  key={metric.title}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-blue-600" />
                    <p className="text-xs text-slate-600 font-medium">{metric.title}</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`h-3 w-3 ${metric.trendUp ? 'text-emerald-600' : 'text-red-500'}`} />
                    <p className={`text-xs font-semibold ${metric.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                      {metric.trend}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TEAM ACCESS */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Team Access
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {teamAccess.map((metric) => {
              const Icon = metric.icon;
              const TrendIcon = metric.trendUp ? TrendingUp : TrendingDown;
              return (
                <div
                  key={metric.title}
                  className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-blue-600" />
                    <p className="text-xs text-slate-600 font-medium">{metric.title}</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`h-3 w-3 ${metric.trendUp ? 'text-emerald-600' : 'text-red-500'}`} />
                    <p className={`text-xs font-semibold ${metric.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                      {metric.trend}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
