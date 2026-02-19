import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MeetingSession } from '../../backend';
import { Lock, Users, Clock, TrendingUp } from 'lucide-react';

interface MeetingLogCardProps {
  meeting: MeetingSession;
}

export default function MeetingLogCard({ meeting }: MeetingLogCardProps) {
  const duration = meeting.endTime
    ? Number(meeting.endTime - meeting.startTime) / 1_000_000_000
    : 0;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{meeting.id}</CardTitle>
          <img src="/assets/generated/encrypted-lock.dim_128x128.png" alt="Encrypted" className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{formatDuration(duration)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users className="h-4 w-4" />
          <span>{meeting.participants.length} participants</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>Sentiment: {meeting.sentimentScore.toFixed(1)}</span>
        </div>
        <div className="pt-2">
          <Badge variant="outline" className="text-xs">
            ₹{meeting.cost.toFixed(2)} cost
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
