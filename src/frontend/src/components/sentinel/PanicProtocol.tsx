import { useEffect, useState } from 'react';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';

interface PanicProtocolProps {
  onClose: () => void;
}

export default function PanicProtocol({ onClose }: PanicProtocolProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Store panic state in sessionStorage
    sessionStorage.setItem('panicActive', 'true');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 300);

    return () => {
      clearInterval(interval);
      sessionStorage.removeItem('panicActive');
    };
  }, []);

  // Hidden keyboard shortcut to dismiss
  useKeyboardShortcut(['Control', 'Shift', 'Q'], () => {
    onClose();
  });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundImage: 'url(/assets/generated/fake-win11-update.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-blue-600/90" />
      <div className="relative z-10 text-center text-white">
        <div className="mb-8">
          <div className="mb-4 text-6xl">⚙️</div>
          <h1 className="mb-4 text-4xl font-light">Working on updates</h1>
          <p className="text-xl font-light">
            {progress}% complete
          </p>
        </div>

        <div className="mx-auto mb-8 h-2 w-96 overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm font-light opacity-80">
          Your PC will restart several times. This might take a while.
        </p>
        <p className="mt-2 text-sm font-light opacity-80">Don't turn off your PC.</p>
      </div>
    </div>
  );
}
