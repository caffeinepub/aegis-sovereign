import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export default function MetricCard({ title, value, icon, trend, trendUp = true }: MetricCardProps) {
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg transition-all hover:shadow-xl hover:border-blue-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">{icon}</div>
              <p className="text-sm font-medium text-slate-600">{title}</p>
            </div>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon className={`h-4 w-4 ${trendUp ? 'text-emerald-600' : 'text-red-500'}`} />
                <p className={`text-sm font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                  {trend}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
