import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { clearCurrentSession } from '@/utils/localStorageAuth';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function ActivePlanCard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    clearCurrentSession();
    queryClient.clear();
    toast.success('Logged out successfully');
    navigate({ to: '/login' });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Active Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-emerald-500" />
          <Badge variant="outline" className="border-emerald-500 text-emerald-500 font-semibold">
            Sovereign Enterprise
          </Badge>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-border hover:bg-muted text-foreground"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}
