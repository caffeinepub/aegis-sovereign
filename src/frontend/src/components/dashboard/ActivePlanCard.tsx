import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

export default function ActivePlanCard() {
  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Active Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Crown className="h-6 w-6 text-emerald-500" />
          <Badge variant="outline" className="border-emerald-500 text-emerald-500 font-semibold text-base px-4 py-1">
            Sovereign Enterprise
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Full access to all tactical features and unlimited neural processing.
        </p>
      </CardContent>
    </Card>
  );
}
