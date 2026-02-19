import { Activity, Mic, Volume2 } from 'lucide-react';

export default function VoiceHealthDashboard() {
  const metrics = [
    { label: 'Pitch Stability', value: 87, icon: <Mic className="h-5 w-5" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Clarity Index', value: 92, icon: <Volume2 className="h-5 w-5" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Tone Quality', value: 78, icon: <Activity className="h-5 w-5" />, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Voice Health Dashboard</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                {metric.icon}
              </div>
              <span className="text-2xl font-bold">{metric.value}%</span>
            </div>
            <p className="mb-2 text-sm font-medium">{metric.label}</p>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full bg-gradient-to-r ${metric.color}`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
