import { CheckCircle2, Loader2 } from 'lucide-react';

interface AIMirrorStatusProps {
  isReady: boolean;
}

export default function AIMirrorStatus({ isReady }: AIMirrorStatusProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        {isReady ? (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-400" />
            <h3 className="mb-2 text-2xl font-bold text-green-400">Neural Proxy Ready</h3>
            <p className="text-gray-400">Your AI voice twin is active and ready for deployment</p>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-gray-400" />
            <h3 className="mb-2 text-2xl font-bold text-gray-400">Neural Proxy Standby</h3>
            <p className="text-gray-400">Upload vocal samples and synthesize to activate</p>
          </>
        )}
      </div>
    </div>
  );
}
