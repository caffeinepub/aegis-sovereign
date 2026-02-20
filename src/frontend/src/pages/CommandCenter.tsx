import MetricCard from '@/components/common/MetricCard';
import LiveTrafficChart from '@/components/analytics/LiveTrafficChart';
import RecentFilesTable from '@/components/analytics/RecentFilesTable';
import { Database, Server, Shield } from 'lucide-react';

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Overview</h1>
        <p className="text-slate-600">Monitor your enterprise security metrics</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Encrypted Data"
          value="2.4 TB"
          icon={<Database className="h-6 w-6 text-indigo-600" />}
          trend="+12.5%"
        />
        <MetricCard
          title="Active Sentinel Nodes"
          value="47"
          icon={<Server className="h-6 w-6 text-indigo-600" />}
          trend="+3"
        />
        <MetricCard
          title="Security Health"
          value="98.2%"
          icon={<Shield className="h-6 w-6 text-emerald-500" />}
          trend="Excellent"
        />
      </div>

      {/* Live Traffic Chart */}
      <LiveTrafficChart />

      {/* Recent Files Table */}
      <RecentFilesTable />
    </div>
  );
}
