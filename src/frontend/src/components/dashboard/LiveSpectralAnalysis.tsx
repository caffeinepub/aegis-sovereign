import { useEffect, useRef, useState } from 'react';

export default function LiveSpectralAnalysis() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [data, setData] = useState<number[]>(Array(100).fill(50));
  const [isAnimating, setIsAnimating] = useState(false);

  // Listen for dashboard initialization event
  useEffect(() => {
    const handleDashboardInit = () => {
      if (!isAnimating) {
        setIsAnimating(true);
      }
    };

    window.addEventListener('dashboard-initialized', handleDashboardInit);
    
    // Also start if already visible
    const dashboardView = document.getElementById('dashboard-view');
    if (dashboardView && dashboardView.style.display === 'block' && !isAnimating) {
      setIsAnimating(true);
    }

    return () => {
      window.removeEventListener('dashboard-initialized', handleDashboardInit);
    };
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateData = () => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        // Generate realistic waveform data
        const newValue = Math.sin(Date.now() / 200) * 30 + 
                        Math.sin(Date.now() / 300) * 20 + 
                        Math.random() * 10 + 50;
        newData.push(newValue);
        return newData;
      });
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)');

      // Draw waveform
      ctx.beginPath();
      ctx.moveTo(0, height);

      data.forEach((value, index) => {
        const x = (index / data.length) * width;
        const y = height - (value / 100) * height;
        
        if (index === 0) {
          ctx.lineTo(x, y);
        } else {
          // Smooth curve using quadratic bezier
          const prevX = ((index - 1) / data.length) * width;
          const prevY = height - (data[index - 1] / 100) * height;
          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;
          ctx.quadraticCurveTo(prevX, prevY, cpX, cpY);
        }
      });

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw line
      ctx.beginPath();
      data.forEach((value, index) => {
        const x = (index / data.length) * width;
        const y = height - (value / 100) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = 'rgba(139, 92, 246, 1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      updateData();
      animationRef.current = requestAnimationFrame(draw);
    };

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [data, isAnimating]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Live Spectral Analysis</h3>
          <p className="text-sm text-slate-600">Real-time frequency monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-emerald-600">ACTIVE</span>
        </div>
      </div>
      <div className="relative h-64 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full grid grid-cols-10 grid-rows-5">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="border-r border-b border-slate-200/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
