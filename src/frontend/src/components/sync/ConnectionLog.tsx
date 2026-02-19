import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

export default function ConnectionLog() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: new Date().toLocaleTimeString(), message: 'WebSocket server initialized', type: 'info' },
    { timestamp: new Date().toLocaleTimeString(), message: 'Listening on port 8080', type: 'info' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        'Heartbeat received from client',
        'Device authentication successful',
        'Sync protocol established',
        'Latency: 28ms',
      ];

      setLogs((prev) => [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          message: messages[Math.floor(Math.random() * messages.length)],
          type: 'success',
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <Terminal className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold">Connection Log</h3>
      </div>
      <ScrollArea className="h-96 rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className="mb-2 flex gap-3">
            <span className="text-gray-500">[{log.timestamp}]</span>
            <span
              className={
                log.type === 'success'
                  ? 'text-green-400'
                  : log.type === 'error'
                  ? 'text-red-400'
                  : 'text-gray-300'
              }
            >
              {log.message}
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
