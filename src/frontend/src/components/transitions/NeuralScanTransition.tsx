import { useEffect, useState } from 'react';

interface NeuralScanTransitionProps {
  onComplete: () => void;
}

export default function NeuralScanTransition({ onComplete }: NeuralScanTransitionProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      <div className="relative w-full max-w-md px-8">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="neural-scan-line absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        </div>

        {/* Content */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img
              src="/assets/generated/axon-logo.dim_800x800.png"
              alt="AXON"
              className="h-20 w-20 animate-pulse"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-emerald-500">Neural Scan</h2>
            <p className="text-sm text-muted-foreground">Initializing secure connection...</p>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
