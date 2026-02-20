import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetSystemHealthMetrics } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface MemoryData {
  time: string;
  heap: number;
  stable: number;
}

export default function DevMetrics() {
  const { data: metrics, isLoading, refetch } = useGetSystemHealthMetrics();
  const [memoryHistory, setMemoryHistory] = useState<MemoryData[]>([]);

  useEffect(() => {
    if (metrics) {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setMemoryHistory(prev => {
        const next = [
          ...prev,
          {
            time: timeStr,
            heap: Number(metrics.heapMemory) / 1000000, // Convert to MB
            stable: Number(metrics.stableMemory) / 1000000,
          },
        ];
        return next.slice(-20); // Keep last 20 data points
      });
    }
  }, [metrics]);

  if (isLoading || !metrics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-gray-400">Loading metrics...</p>
        </div>
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

  const showCriticalAlert = cyclesInTC < 0.1 || heapMB > 400 || stableMB > 160;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Developer Performance Metrics</h1>
          <p className="text-gray-400">System health and performance monitoring</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {showCriticalAlert && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <div>
            <div className="font-semibold text-red-400">Critical Threshold Exceeded</div>
            <div className="text-sm text-gray-400">
              One or more metrics have crossed critical thresholds. Immediate attention required.
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* Cycles Balance */}
        <div className={`rounded-lg border p-6 ${getCyclesColor()}`}>
          <div className="mb-2 text-sm font-medium">Cycles Balance</div>
          <div className="text-3xl font-bold">{cyclesInTC.toFixed(2)} TC</div>
          <Badge variant="outline" className="mt-2">
            {cyclesInTC > 1 ? 'Healthy' : cyclesInTC > 0.1 ? 'Warning' : 'Critical'}
          </Badge>
        </div>

        {/* Heap Memory */}
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

        {/* Stable Memory */}
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

        {/* Query Calls */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-gray-400">Query Calls</div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-emerald-400">{Number(metrics.queryCallCount)}</div>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="mt-2 text-xs text-gray-500">Total queries executed</div>
        </div>

        {/* Update Calls */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-gray-400">Update Calls</div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-orange-400">{Number(metrics.updateCallCount)}</div>
            <TrendingDown className="h-5 w-5 text-orange-400" />
          </div>
          <div className="mt-2 text-xs text-gray-500">Total updates executed</div>
        </div>
      </div>

      {/* Memory History Chart */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 text-lg font-semibold">Memory Usage History (Last 24 Hours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={memoryHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" label={{ value: 'MB', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#000',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="heap" stroke="#06b6d4" strokeWidth={2} name="Heap Memory" />
            <Line type="monotone" dataKey="stable" stroke="#a855f7" strokeWidth={2} name="Stable Memory" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
        <p className="text-sm text-blue-400">
          <strong>Note:</strong> This dashboard shows real-time backend performance metrics. 
          Auto-refreshes every 30 seconds. Use Ctrl+Shift+F to toggle the FPS overlay on any page.
        </p>
      </div>
    </div>
  );
}
