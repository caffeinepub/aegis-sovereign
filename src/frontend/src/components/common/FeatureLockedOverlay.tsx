import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface FeatureLockedOverlayProps {
  featureName: string;
}

export default function FeatureLockedOverlay({ featureName }: FeatureLockedOverlayProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
      <Card className="max-w-md w-full bg-white/95 backdrop-blur-md border-[#10b981]/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="h-6 w-6 text-gray-400" />
            Feature Locked
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">{featureName}</span> is only available on the Shield tier.
          </p>
          <p className="text-gray-600">
            Upgrade to <span className="font-semibold text-[#10b981]">Shield (₹499/month)</span> to unlock this feature and gain full access to all Sovereign level overrides.
          </p>
          <Button
            onClick={() => navigate({ to: '/dashboard/subscriptions' })}
            className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-semibold"
          >
            UPGRADE NOW
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
