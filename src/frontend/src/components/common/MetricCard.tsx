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
    <Card className="bg-card border-emerald-500/10 transition-all hover:border-emerald-500/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-emerald-500">{icon}</div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <TrendIcon className={`h-4 w-4 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`} />
                <p className={`text-sm font-medium ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
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
