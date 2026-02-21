import Overview from '@/components/dashboard/Overview';
import ControlPanel from '@/components/dashboard/ControlPanel';
import TelemetryFeed from '@/components/dashboard/TelemetryFeed';
import GlobalNodeMap from '@/components/dashboard/GlobalNodeMap';
import TeamManagement from '@/components/dashboard/TeamManagement';

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Security Health KPI - Top Left, Spans 2 columns */}
        <div className="lg:col-span-2">
          <Overview />
        </div>

        {/* Global Node Map - Top Right */}
        <div className="lg:col-span-1 lg:row-span-2">
          <GlobalNodeMap />
        </div>

        {/* Control Panel - Below Overview, adjacent to Telemetry */}
        <div className="lg:col-span-1">
          <ControlPanel />
        </div>

        {/* Telemetry Feed - Next to Control Panel */}
        <div className="lg:col-span-1">
          <TelemetryFeed />
        </div>

        {/* Team Management - Bottom Left */}
        <div className="lg:col-span-1">
          <TeamManagement />
        </div>
      </div>
    </div>
  );
}
