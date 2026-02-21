import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Activity, Users, Zap, TrendingUp, TrendingDown } from 'lucide-react';

export default function Overview() {
  // Primary KPI - System Security Health
  const securityHealth = 98;

  // Grouped Metrics
  const networkStats = [
    {
      title: 'Active Sessions',
      value: '12',
      icon: Activity,
      trend: '+12% vs last week',
      trendUp: true,
    },
    {
      title: 'Neural Efficiency',
      value: '94%',
      icon: Zap,
      trend: '+8% vs yesterday',
      trendUp: true,
    },
  ];

  const teamAccess = [
    {
      title: 'Team Members',
      value: '8',
      icon: Users,
      trend: '+2 vs last month',
      trendUp: true,
    },
    {
      title: 'Threats (24h)',
      value: '0',
      icon: Shield,
      trend: '-3% vs last week',
      trendUp: false,
    },
  ];

  return (
    <Card className="bg-card border-emerald-500/20 h-full">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-500" />
          System Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* PRIMARY KPI - Top Left, Largest */}
        <div className="p-6 rounded-lg bg-emerald-500/5 border-2 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground font-medium">System Security Health</p>
              <div className="flex items-baseline gap-3">
                <p className="text-6xl font-bold text-emerald-500">{securityHealth}%</p>
                <div className="flex items-center gap-1 text-emerald-500">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">+2% vs last week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NETWORK STATS GROUP */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Network Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {networkStats.map((metric) => {
              const Icon = metric.icon;
              const TrendIcon = metric.trendUp ? TrendingUp : TrendingDown;
              return (
                <div
                  key={metric.title}
                  className="p-4 rounded-lg bg-background border border-emerald-500/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-emerald-500" />
                    <p className="text-xs text-muted-foreground">{metric.title}</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`h-3 w-3 ${metric.trendUp ? 'text-emerald-500' : 'text-red-500'}`} />
                    <p className={`text-xs ${metric.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {metric.trend}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* USER/TEAM ACCESS GROUP */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            User/Team Access
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {teamAccess.map((metric) => {
              const Icon = metric.icon;
              const TrendIcon = metric.trendUp ? TrendingUp : TrendingDown;
              return (
                <div
                  key={metric.title}
                  className="p-4 rounded-lg bg-background border border-emerald-500/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-emerald-500" />
                    <p className="text-xs text-muted-foreground">{metric.title}</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`h-3 w-3 ${metric.trendUp ? 'text-emerald-500' : 'text-red-500'}`} />
                    <p className={`text-xs ${metric.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
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
