import { useGetSystemHealthMetrics } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertTriangle, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SystemHealthMonitor() {
  const { data: metrics, isLoading, refetch } = useGetSystemHealthMetrics();

  if (isLoading || !metrics) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  const cyclesInTC = Number(metrics.cyclesBalance) / 1_000_000_000_000;
  const heapMB = Number(metrics.heapMemory) / 1_000_000;
  const stableMB = Number(metrics.stableMemory) / 1_000_000;

  const getCyclesColor = () => {
    if (cyclesInTC > 1) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (cyclesInTC > 0.1) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  const showAlert = cyclesInTC < 0.1 || heapMB > 400 || stableMB > 160;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-8 w-8 text-purple-400" />
          <div>
            <h2 className="text-xl font-semibold">System Health</h2>
            <p className="text-sm text-gray-400">Backend performance metrics</p>
          </div>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {showAlert && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <div>
            <div className="font-semibold text-red-400">Critical Threshold Exceeded</div>
            <div className="text-sm text-gray-400">
              One or more metrics require immediate attention.
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className={`rounded-lg border p-6 ${getCyclesColor()}`}>
          <div className="mb-2 text-sm font-medium">Cycles Balance</div>
          <div className="text-3xl font-bold">{cyclesInTC.toFixed(2)} TC</div>
          <Badge variant="outline" className="mt-2">
            {cyclesInTC > 1 ? 'Healthy' : cyclesInTC > 0.1 ? 'Warning' : 'Critical'}
          </Badge>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-gray-400">Heap Memory</div>
          <div className="text-3xl font-bold text-cyan-400">{heapMB.toFixed(1)} MB</div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all"
              style={{ width: `${Math.min((heapMB / 500) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-gray-400">Stable Memory</div>
          <div className="text-3xl font-bold text-purple-400">{stableMB.toFixed(1)} MB</div>
          <div className="mt-2 h-2 w-full rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-purple-400 transition-all"
              style={{ width: `${Math.min((stableMB / 200) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-gray-400">Query Calls</div>
          <div className="text-3xl font-bold text-emerald-400">{Number(metrics.queryCallCount)}</div>
          <div className="mt-2 text-xs text-gray-500">Total queries</div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-gray-400">Update Calls</div>
          <div className="text-3xl font-bold text-orange-400">{Number(metrics.updateCallCount)}</div>
          <div className="mt-2 text-xs text-gray-500">Total updates</div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
        <p className="text-sm text-blue-400">
          <strong>Auto-refresh:</strong> Metrics update every 30 seconds automatically.
        </p>
      </div>
    </div>
  );
}
