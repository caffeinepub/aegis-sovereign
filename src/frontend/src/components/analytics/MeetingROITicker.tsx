import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function MeetingROITicker() {
  const [cost, setCost] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCost((prev) => prev + 12.5); // ₹12.5 per second
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <h3 className="text-lg font-semibold">Meeting ROI Tracker</h3>
        <p className="text-sm text-gray-400">Live cost calculation</p>
      </div>

      <div className="my-6">
        <div className="mb-2 flex items-baseline gap-2">
          <span className="text-5xl font-bold text-blue-400">₹{cost.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>₹12.5/second</span>
        </div>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20"
      >
        {isActive ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
