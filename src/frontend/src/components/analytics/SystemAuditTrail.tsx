import { useEffect, useState, useRef } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface LogEntry {
  id: number;
  timestamp: string;
  category: string;
  message: string;
}

const LOG_CATEGORIES = ['ENCRYPT', 'SENSORY', 'AUTH', 'NETWORK', 'BIOMETRIC', 'PACKET'];

const LOG_MESSAGES: Record<string, string[]> = {
  ENCRYPT: ['AES-256 Key Rotated', 'TLS 1.3 Handshake Complete', 'Certificate Validated'],
  SENSORY: ['Microphone Input Detected', 'Audio Buffer Flushed', 'Noise Cancellation Active'],
  AUTH: ['Session Token Refreshed', 'Identity Verified', 'Biometric Match Confirmed'],
  NETWORK: ['WebSocket Connected', 'Latency: 12ms', 'Bandwidth: 98.5 Mbps'],
  BIOMETRIC: ['Voice Pattern Updated', 'Stress Level: Normal', 'Vocal Hash Generated'],
  PACKET: ['Integrity Check Passed', 'Checksum Verified', 'Packet Loss: 0.01%'],
};

export default function SystemAuditTrail() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    const generateLog = (): LogEntry => {
      const category = LOG_CATEGORIES[Math.floor(Math.random() * LOG_CATEGORIES.length)];
      const messages = LOG_MESSAGES[category];
      const message = messages[Math.floor(Math.random() * messages.length)];

      return {
        id: idCounter.current++,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        category,
        message,
      };
    };

    const initialLogs = Array.from({ length: 15 }, generateLog);
    setLogs(initialLogs);

    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLog();
        const updated = [...prev, newLog];
        return updated.slice(-50);
      });
    }, 2000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-green-400">System Audit Trail</h3>
          <p className="text-sm text-gray-400">Live security event log</p>
        </div>
        <ActiveStatusIndicator />
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-lg border border-green-500/20 bg-black p-4 font-mono text-xs"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#00FF00 #000000',
        }}
      >
        {logs.map((log) => (
          <div key={log.id} className="mb-1 flex gap-2 text-green-400">
            <span className="text-gray-500">{log.timestamp}</span>
            <span className="font-bold text-green-300">[{log.category}]</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
