import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, FileText, BarChart3 } from 'lucide-react';
import type { MeetingLog } from '@/backend';

interface IntelSessionCardProps {
  session: MeetingLog;
}

export default function IntelSessionCard({ session }: IntelSessionCardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-[#10b981]/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">{session.title}</CardTitle>
        <p className="text-xs text-gray-500">
          Duration: {Math.floor(Number(session.duration) / 60)}m | Participants: {session.participants.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAnalysis(!showAnalysis)}
            variant={showAnalysis ? 'default' : 'outline'}
            size="sm"
            className={showAnalysis ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            ANALYSIS
          </Button>
          <Button
            onClick={() => setShowTranscript(!showTranscript)}
            variant={showTranscript ? 'default' : 'outline'}
            size="sm"
            className={showTranscript ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
          >
            <FileText className="h-4 w-4 mr-1" />
            TRANSCRIPT
          </Button>
        </div>

        {showAnalysis && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm text-gray-900">Analysis Summary</h4>
            <p className="text-sm text-gray-700">{session.summary}</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <p className="text-xs text-gray-500">Sentiment</p>
                <p className="text-sm font-semibold text-gray-900">{(session.sentiment * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Cost</p>
                <p className="text-sm font-semibold text-gray-900">₹{session.cost.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {showTranscript && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Transcript</h4>
            <p className="text-sm text-gray-700 font-mono">
              [00:00] Speaker 1: Welcome to the meeting...
              <br />
              [00:15] Speaker 2: Thank you for joining...
              <br />
              [00:30] Speaker 1: Let's discuss the agenda...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
