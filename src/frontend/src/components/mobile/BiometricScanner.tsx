import { useState, useEffect } from 'react';
import { useHapticFeedback } from '../../hooks/useHapticFeedback';
import { Fingerprint, ScanFace, Check, X } from 'lucide-react';

type ScanMode = 'fingerprint' | 'face';
type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';

export default function BiometricScanner() {
  const [mode, setMode] = useState<ScanMode>('fingerprint');
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [progress, setProgress] = useState(0);
  const { medium, heavy } = useHapticFeedback();

  const startScan = () => {
    setStatus('scanning');
    setProgress(0);
    medium();

    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        
        // 80% success rate
        if (Math.random() > 0.2) {
          setStatus('success');
          heavy();
        } else {
          setStatus('error');
          heavy();
        }

        setTimeout(() => {
          setStatus('idle');
          setProgress(0);
        }, 2000);
      }
    }, interval);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      {/* Mode Selector */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setMode('fingerprint')}
          className={`rounded-lg px-6 py-3 font-semibold transition-all ${
            mode === 'fingerprint'
              ? 'bg-emerald-500 text-black'
              : 'border border-white/20 text-gray-400'
          }`}
        >
          <Fingerprint className="mx-auto mb-1 h-6 w-6" />
          Fingerprint
        </button>
        <button
          onClick={() => setMode('face')}
          className={`rounded-lg px-6 py-3 font-semibold transition-all ${
            mode === 'face'
              ? 'bg-emerald-500 text-black'
              : 'border border-white/20 text-gray-400'
          }`}
        >
          <ScanFace className="mx-auto mb-1 h-6 w-6" />
          Face ID
        </button>
      </div>

      {/* Scanner Display */}
      <div className="relative mb-8 flex h-96 w-96 items-center justify-center">
        {mode === 'fingerprint' ? (
          <div className={`relative transition-all duration-300 ${status === 'idle' ? 'opacity-100 scale-100' : status === 'scanning' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="relative h-80 w-80 rounded-full border-4 border-emerald-500/30 bg-emerald-500/10">
              <img
                src="/assets/generated/fingerprint-scanner.dim_400x400.png"
                alt="Fingerprint"
                className="absolute inset-0 h-full w-full object-contain opacity-50"
              />
              
              {status === 'scanning' && (
                <div className="absolute inset-0 rounded-full border-4 border-emerald-400 animate-pulse-green" />
              )}
            </div>
          </div>
        ) : (
          <div className={`relative transition-all duration-300 ${status === 'idle' ? 'opacity-100 scale-100' : status === 'scanning' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="relative h-80 w-64 rounded-3xl border-4 border-cyan-500/30 bg-cyan-500/10">
              <img
                src="/assets/generated/face-id-frame.dim_400x500.png"
                alt="Face ID"
                className="absolute inset-0 h-full w-full object-contain opacity-50"
              />
              
              {status === 'scanning' && (
                <>
                  {/* Corner brackets */}
                  <div className="absolute left-2 top-2 h-12 w-12 border-l-4 border-t-4 border-cyan-400 animate-pulse" />
                  <div className="absolute right-2 top-2 h-12 w-12 border-r-4 border-t-4 border-cyan-400 animate-pulse" />
                  <div className="absolute bottom-2 left-2 h-12 w-12 border-b-4 border-l-4 border-cyan-400 animate-pulse" />
                  <div className="absolute bottom-2 right-2 h-12 w-12 border-b-4 border-r-4 border-cyan-400 animate-pulse" />
                </>
              )}
            </div>
          </div>
        )}

        {/* Status Overlay */}
        {status === 'success' && (
          <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="rounded-full bg-green-500 p-8">
              <Check className="h-24 w-24 text-white" />
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-300">
            <div className="rounded-full bg-red-500 p-8">
              <X className="h-24 w-24 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      {status === 'scanning' && (
        <div className="mb-6 w-80">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-sm text-gray-400">Scanning... {Math.round(progress)}%</p>
        </div>
      )}

      {/* Scan Button */}
      <button
        onClick={startScan}
        disabled={status === 'scanning'}
        className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-12 py-4 text-lg font-bold text-black transition-all hover:shadow-lg hover:shadow-emerald-500/50 disabled:opacity-50"
      >
        {status === 'scanning' ? 'Scanning...' : 'Start Scan'}
      </button>

      {status === 'success' && (
        <p className="mt-4 text-green-400">Authentication successful!</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-400">Authentication failed. Please try again.</p>
      )}
    </div>
  );
}
