import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Clock, Users } from 'lucide-react';

export default function QuantumInterlinkCard() {
  return (
    <Card className="bg-white border-[#10b981]/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Quantum Interlink</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Mic className="h-4 w-4 text-[#10b981]" />
          <span className="text-sm text-gray-600">MIC:</span>
          <span className="text-sm font-semibold text-gray-900">STANDBY</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#10b981]" />
          <span className="text-sm text-gray-600">LATENCY:</span>
          <span className="text-sm font-semibold text-gray-900">14MS</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#10b981]" />
          <span className="text-sm text-gray-600">PARTICIPANTS:</span>
          <span className="text-sm font-semibold text-gray-900">12</span>
        </div>
      </CardContent>
    </Card>
  );
}
