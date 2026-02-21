import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default function SynopsisEngineCard() {
  return (
    <Card className="bg-white/80 backdrop-blur-md border-[#10b981]/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Brain className="h-6 w-6 text-[#10b981]" />
          SYNOPSIS ENGINE
        </CardTitle>
      </CardHeader>
      <CardContent className="py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#10b981]/30 border-t-[#10b981] animate-spin" />
          </div>
          <p className="text-center font-mono text-sm text-gray-600 animate-pulse-green">
            AWAITING_VERIFIED_INTEL_LINK
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
