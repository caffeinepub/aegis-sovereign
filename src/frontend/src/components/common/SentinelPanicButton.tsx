import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTriggerPanic } from '@/hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export default function SentinelPanicButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const triggerPanic = useTriggerPanic();
  const navigate = useNavigate();

  const handlePanic = async () => {
    try {
      await triggerPanic.mutateAsync('MANUAL');
      toast.error('SENTINEL PANIC ACTIVATED');
      navigate({ to: '/dashboard/sentinel' });
    } catch (error) {
      console.error('Panic trigger failed:', error);
      toast.error('Failed to activate panic protocol');
    }
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowConfirm(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-2xl shadow-red-500/50 animate-pulse-red"
        size="icon"
      >
        <AlertTriangle className="h-8 w-8 text-white" />
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="border-red-500/50 bg-black/95">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              SENTINEL PANIC PROTOCOL
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This will immediately terminate all active sessions and activate emergency countermeasures.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePanic}
              disabled={triggerPanic.isPending}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white"
            >
              {triggerPanic.isPending ? 'ACTIVATING...' : 'ACTIVATE PANIC'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
