import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface NodeLocation {
  name: string;
  x: number;
  y: number;
}

const nodes: NodeLocation[] = [
  { name: 'NYC', x: 25, y: 35 },
  { name: 'London', x: 50, y: 30 },
  { name: 'Tokyo', x: 80, y: 35 },
];

export default function GlobalNodeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    let animationFrame: number;
    let pulsePhase = 0;

    const animate = () => {
      // Clear canvas with Deep Onyx background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Draw pulsing nodes (no grid lines for reduced noise)
      pulsePhase += 0.05;
      const pulseSize = Math.sin(pulsePhase) * 3 + 8;

      nodes.forEach((node) => {
        const x = (width * node.x) / 100;
        const y = (height * node.y) / 100;

        // Outer glow with high contrast emerald
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize * 2);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.4)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner dot with high contrast
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(x, y, pulseSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Label with high contrast
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, x, y + pulseSize * 2 + 15);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <Card className="bg-card border-emerald-500/20 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Globe className="h-5 w-5 text-emerald-500" />
          Global Nodes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[300px] bg-[#050505] rounded-lg overflow-hidden border border-emerald-500/10">
          <canvas
            ref={canvasRef}
            width={800}
            height={300}
            className="w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
