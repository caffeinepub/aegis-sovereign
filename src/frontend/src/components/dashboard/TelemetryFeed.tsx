import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity } from 'lucide-react';
import { useTelemetry } from '@/contexts/TelemetryContext';

export default function TelemetryFeed() {
  const { events } = useTelemetry();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card border-emerald-500/20 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-500" />
          Telemetry Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]" ref={scrollRef}>
          <div className="space-y-2 font-mono text-xs">
            {events.length === 0 ? (
              <p className="text-muted-foreground">No events logged yet...</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="flex gap-2 items-start">
                  <span className="text-muted-foreground shrink-0 text-[10px]">
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                  <span className={getEventColor(event.type)}>{event.message}</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
