import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface PanicProtocolProps {
  onClose: () => void;
}

export default function PanicProtocol({ onClose }: PanicProtocolProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch((prev) => !prev);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className={`text-center ${glitch ? 'animate-pulse' : ''}`}>
        <AlertTriangle className="mx-auto mb-8 h-32 w-32 text-red-500" />
        <h1 className="mb-4 text-6xl font-bold text-red-500">SYSTEM UPDATE</h1>
        <p className="mb-8 text-2xl text-gray-400">Critical security patch in progress...</p>
        <div className="mx-auto mb-8 h-4 w-96 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-pulse bg-red-500" />
        </div>
        <p className="text-sm text-gray-500">Please do not turn off your computer</p>
      </div>

      <button
        onClick={onClose}
        className="fixed right-8 top-8 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
      `}</style>
    </div>
  );
}
