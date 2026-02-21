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

      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
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
    <Card className="bg-white/80 backdrop-blur-md border-[#10b981]/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Radio className="h-6 w-6 text-[#10b981]" />
          SPECTRAL ANALYSIS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 bg-gray-50 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-mono text-gray-600">SIGNAL_LINK: STABLE</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
