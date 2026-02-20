import { Card, CardContent } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

export default function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-xl transition-transform hover:-translate-y-1 duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p className="text-sm text-emerald-600 mt-2 font-medium">{trend}</p>
            )}
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
