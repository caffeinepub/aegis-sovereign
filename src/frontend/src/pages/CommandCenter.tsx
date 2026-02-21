import KPIMetricsRow from '@/components/dashboard/KPIMetricsRow';
import SecurityTrafficTrend from '@/components/dashboard/SecurityTrafficTrend';
import ActiveIdentitiesCard from '@/components/dashboard/ActiveIdentitiesCard';
import ControlPanel from '@/components/dashboard/ControlPanel';

export default function CommandCenter() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      {/* KPI Metrics Row */}
      <div className="mb-6">
        <KPIMetricsRow />
      </div>

      {/* Main Stage: Trends and Team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Security Traffic Trend - Left Large Card */}
        <div className="lg:col-span-2">
          <SecurityTrafficTrend />
        </div>

        {/* Active Identities - Right Card */}
        <div className="lg:col-span-1">
          <ActiveIdentitiesCard />
        </div>
      </div>

      {/* Control Panel */}
      <div className="mb-6">
        <ControlPanel />
      </div>
    </div>
  );
}
