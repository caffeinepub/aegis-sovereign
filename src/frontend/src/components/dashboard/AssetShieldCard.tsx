import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function AssetShieldCard() {
  const [amount, setAmount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetAmount = 1241310.20;
  const animationRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Listen for dashboard initialization event
  useEffect(() => {
    const handleDashboardInit = () => {
      if (!isAnimating) {
        startCounterAnimation();
      }
    };

    window.addEventListener('dashboard-initialized', handleDashboardInit);
    
    // Also start if already visible
    const dashboardView = document.getElementById('dashboard-view');
    if (dashboardView && dashboardView.style.display === 'block' && !isAnimating) {
      startCounterAnimation();
    }

    return () => {
      window.removeEventListener('dashboard-initialized', handleDashboardInit);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating]);

  const startCounterAnimation = () => {
    setIsAnimating(true);
    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();
    const startAmount = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentAmount = startAmount + (targetAmount - startAmount) * easeOutQuart;
      
      setAmount(currentAmount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Start auto-increment after initial animation
        setIsAnimating(false);
        startAutoIncrement();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAutoIncrement = () => {
    intervalRef.current = setInterval(() => {
      setAmount((prev) => prev + Math.random() * 150 + 50);
    }, 2000);
  };

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <Card className="bg-white border-[#10b981]/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#10b981]" />
          Asset Shield
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-[#10b981] tabular-nums">
          {formattedAmount}
        </div>
        <p className="text-xs text-gray-500 mt-1">Protected Assets</p>
      </CardContent>
    </Card>
  );
}
