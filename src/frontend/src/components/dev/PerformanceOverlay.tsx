import { useState, useEffect, useRef } from 'react';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { AlertTriangle } from 'lucide-react';

export default function PerformanceOverlay() {
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem('performanceOverlay') === 'true';
  });
  const [fps, setFps] = useState(60);
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());

  useKeyboardShortcut(['Control', 'Shift', 'F'], () => {
    setVisible(prev => {
      const next = !prev;
      localStorage.setItem('performanceOverlay', String(next));
      return next;
    });
  });

  useEffect(() => {
    if (!visible) return;

    let animationFrameId: number;

    const measureFPS = () => {
      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      frameTimesRef.current.push(delta);
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      const avgDelta = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      const currentFps = Math.round(1000 / avgDelta);
      setFps(currentFps);

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [visible]);

  if (!visible) return null;

  const getFpsColor = () => {
    if (fps > 55) return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (fps >= 30) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    return 'text-red-400 bg-red-500/20 border-red-500/50';
  };

  return (
    <div className={`fixed right-4 top-4 z-50 flex items-center gap-2 rounded-lg border px-3 py-2 backdrop-blur-sm ${getFpsColor()}`}>
      {fps < 30 && <AlertTriangle className="h-4 w-4 animate-pulse" />}
      <span className="font-mono text-sm font-bold">{fps} FPS</span>
    </div>
  );
}
