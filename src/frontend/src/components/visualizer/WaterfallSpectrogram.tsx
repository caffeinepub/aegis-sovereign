import { useEffect, useRef } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

export default function WaterfallSpectrogram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const barCount = 40;
    const barWidth = canvas.offsetWidth / barCount;

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Shift existing content down
      const imageData = ctx.getImageData(0, 1, width, height - 1);
      ctx.putImageData(imageData, 0, 2);

      // Clear top row
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, width, 2);

      // Draw new frequency bars at the top
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * 30 + 5;
        const intensity = barHeight / 35;

        // Neon green gradient based on intensity
        ctx.fillStyle = `rgba(0, ${Math.floor(255 * intensity)}, 0, ${intensity})`;
        ctx.fillRect(i * barWidth, 0, barWidth - 1, barHeight);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full rounded-lg" />
      <div className="absolute left-4 top-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Waterfall Spectrogram</h3>
          <p className="text-sm text-gray-400">Frequency analysis</p>
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <ActiveStatusIndicator />
      </div>
    </div>
  );
}
