import { useEffect, useState, useRef } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

interface LogEntry {
  id: number;
  timestamp: string;
  category: string;
  message: string;
}

const LOG_CATEGORIES = ['ENCRYPT', 'PACKET', 'NEURAL', 'QUANTUM'];

const LOG_MESSAGES: Record<string, string[]> = {
  ENCRYPT: [
    'AES-256 Key Rotated',
    'RSA-4096 Handshake Complete',
    'Quantum-Resistant Layer Active',
    'End-to-End Encryption Verified',
    'Certificate Chain Validated',
  ],
  PACKET: [
    'Integrity Check Passed',
    'Checksum Verified',
    'Packet Loss: 0.02%',
    'Latency: 12ms',
    'Bandwidth: 98.5 Mbps',
  ],
  NEURAL: [
    'Biometric Hash Updated',
    'Voice Pattern Analyzed',
    'Sentiment Model Refreshed',
    'Neural Network Sync Complete',
    'AI Model v2.4.1 Loaded',
  ],
  QUANTUM: [
    'Quantum Key Distribution Active',
    'Entanglement Verified',
    'Q-Bit Stability: 99.8%',
    'Quantum Tunnel Established',
    'Post-Quantum Cipher Engaged',
  ],
};

export default function NeuralPacketStream() {
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

    // Initialize with some logs
    const initialLogs = Array.from({ length: 10 }, generateLog);
    setLogs(initialLogs);

    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLog();
        const updated = [...prev, newLog];
        // Keep last 50 logs
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
    <div className="relative h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-green-400">Neural Packet Stream</h3>
          <p className="text-sm text-gray-400">Real-time security event log</p>
        </div>
        <ActiveStatusIndicator />
      </div>
      <div
        ref={scrollRef}
        className="h-[calc(100%-4rem)] overflow-y-auto rounded-lg border border-green-500/20 bg-black p-4 font-mono text-xs"
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
