import { Database, Server, Shield } from 'lucide-react';
import ControlPanel from '@/components/dashboard/ControlPanel';
import ActivePlanCard from '@/components/dashboard/ActivePlanCard';
import TelemetryFeed from '@/components/dashboard/TelemetryFeed';
import TeamStatusCard from '@/components/dashboard/TeamStatusCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { getCurrentSession } from '@/utils/localStorageAuth';
import { useTelemetry } from '@/contexts/TelemetryContext';

export default function CommandCenter() {
  const session = getCurrentSession();
  const { logEvent } = useTelemetry();

  useEffect(() => {
    logEvent('Dashboard initialized', 'success');
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px]">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">
          Welcome back, {session?.name || 'User'}
        </h1>
        <p className="text-muted-foreground">Command Center Overview</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Metrics & Controls */}
        <div className="lg:col-span-8 space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Encrypted Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">2.4 TB</p>
                    <p className="text-xs text-emerald-500 mt-1">+12.5% this month</p>
                  </div>
                  <Database className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Sentinel Nodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">47</p>
                    <p className="text-xs text-emerald-500 mt-1">+3 nodes online</p>
                  </div>
                  <Server className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Security Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">98.2%</p>
                    <p className="text-xs text-emerald-500 mt-1">Excellent</p>
                  </div>
                  <Shield className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel & Active Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlPanel />
            <ActivePlanCard />
          </div>

          {/* Team Status */}
          <TeamStatusCard />
        </div>

        {/* Right Column - Telemetry Feed */}
        <div className="lg:col-span-4">
          <TelemetryFeed />
        </div>
      </div>
    </div>
  );
}
