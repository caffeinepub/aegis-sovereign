import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Loader2 } from 'lucide-react';

export default function SynopsisEngineCard() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg h-full">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-100">
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          Synopsis Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
          <div className="text-center">
            <p className="font-mono text-sm text-slate-600 font-medium">
              AWAITING VERIFIED INTEL LINK
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Verify a meeting link to begin analysis
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
