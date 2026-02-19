import { useEffect, useRef } from 'react';

export default function NeuralFrequencyVisualizer() {
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

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const points = 100;
      for (let i = 0; i < points; i++) {
        const x = (i / points) * width;
        const y =
          height / 2 +
          Math.sin((i / points) * Math.PI * 4 + time) * 30 +
          Math.sin((i / points) * Math.PI * 8 + time * 1.5) * 15 +
          Math.sin((i / points) * Math.PI * 16 + time * 2) * 8;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Secondary wave
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let i = 0; i < points; i++) {
        const x = (i / points) * width;
        const y =
          height / 2 +
          Math.sin((i / points) * Math.PI * 6 + time * 1.2) * 20 +
          Math.cos((i / points) * Math.PI * 12 + time * 1.8) * 10;

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
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute left-4 top-4">
        <h3 className="text-lg font-semibold text-white">Neural Frequency Visualizer</h3>
        <p className="text-sm text-gray-400">Real-time audio wave analysis</p>
      </div>
    </div>
  );
}
