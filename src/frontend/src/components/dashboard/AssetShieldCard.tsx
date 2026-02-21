import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function AssetShieldCard() {
  const [amount, setAmount] = useState(1241310.20);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => prev + Math.random() * 150 + 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
