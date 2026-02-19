import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MeetingLog } from '../../backend';
import { Lock, Users, Clock, TrendingUp } from 'lucide-react';

interface MeetingLogCardProps {
  meeting: MeetingLog;
}

export default function MeetingLogCard({ meeting }: MeetingLogCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/30">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{meeting.title}</CardTitle>
          <img src="/assets/generated/encrypted-lock.dim_128x128.png" alt="Encrypted" className="h-6 w-6" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{formatDuration(Number(meeting.duration))}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users className="h-4 w-4" />
          <span>{meeting.participants.length} participants</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>Sentiment: {meeting.sentiment.toFixed(1)}</span>
        </div>
        <div className="pt-2">
          <Badge variant="outline" className="text-xs">
            ₹{meeting.cost.toFixed(2)} cost
          </Badge>
        </div>
        {meeting.summary && (
          <p className="text-xs text-gray-500 line-clamp-2">{meeting.summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
