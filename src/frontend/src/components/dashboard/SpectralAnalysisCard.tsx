import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio } from 'lucide-react';

export default function SpectralAnalysisCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.fillStyle = 'rgba(248, 250, 252, 0.3)';
      ctx.fillRect(0, 0, width, height);

      // Draw gradient waveform
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(0.5, '#8b5cf6');
      gradient.addColorStop(1, '#3b82f6');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();

      const points = 100;
      for (let i = 0; i < points; i++) {
        const x = (i / points) * width;
        const y =
          height / 2 +
          Math.sin((i / points) * Math.PI * 4 + time) * 30 +
          Math.sin((i / points) * Math.PI * 8 + time * 1.5) * 15;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      time += 0.05;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg h-full">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Radio className="h-5 w-5 text-indigo-600" />
          </div>
          Spectral Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative h-48 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl overflow-hidden border border-slate-200">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-700 font-medium">SIGNAL: STABLE</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
