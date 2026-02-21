import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function PricingTable() {
  const basicFeatures = [
    'Up to 50 meetings/month',
    'Basic encryption',
    'Email support',
    '1 GB storage',
  ];

  const premiumFeatures = [
    'Unlimited meetings',
    'Advanced encryption',
    'Priority 24/7 support',
    '10 GB storage',
    'Team collaboration',
    'Custom integrations',
    'Advanced analytics',
    'Dedicated account manager',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Tier */}
      <Card className="bg-white shadow-md rounded-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#001529]">Basic</CardTitle>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#001529]">$299</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-6">
            {basicFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full bg-[#1890FF] hover:bg-[#1890FF]/90 text-white">
            Subscribe
          </Button>
        </CardContent>
      </Card>

      {/* Premium Tier */}
      <Card className="bg-white shadow-md rounded-lg border-2 border-[#10b981] relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#10b981] text-white text-xs font-semibold px-3 py-1 rounded-full">
            RECOMMENDED
          </span>
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#001529]">Premium</CardTitle>
          <div className="mt-2">
            <span className="text-3xl font-bold text-[#001529]">$499</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 mb-6">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white">
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
