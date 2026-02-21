import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, LogOut } from 'lucide-react';
import { useGhostMode } from '@/contexts/GhostModeContext';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function QuickActionsCard() {
  const { isGhostMode, toggleGhostMode } = useGhostMode();
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleTacticalExit = async () => {
    localStorage.removeItem('AXON_SESSION');
    sessionStorage.clear();
    await clear();
    queryClient.clear();
    toast.success('Tactical exit complete');
    navigate({ to: '/login' });
  };

  return (
    <Card className="bg-white border-[#10b981]/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={toggleGhostMode}
          className={`w-full ${
            isGhostMode
              ? 'bg-[#10b981] hover:bg-[#059669] text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          {isGhostMode ? 'GHOST MODE: ON' : 'GHOST MODE: OFF'}
        </Button>
        <Button
          onClick={handleTacticalExit}
          variant="destructive"
          className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
        >
          <LogOut className="h-4 w-4 mr-2" />
          TACTICAL EXIT
        </Button>
      </CardContent>
    </Card>
  );
}
