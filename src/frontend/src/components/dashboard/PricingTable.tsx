import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';

export default function PricingTable() {
  const { tier, setTier } = useSubscriptionTier();

  const handleSubscribe = (plan: 'free' | 'core' | 'shield') => {
    setTier(plan);
    const planNames = {
      free: 'FREE',
      core: 'SOVEREIGN CORE (₹299/month)',
      shield: 'GLOBAL SHIELD (₹499/month)',
    };
    toast.success(`Subscribed to ${planNames[plan]}`, {
      duration: 3000,
    });
  };

  const tiers = [
    {
      name: 'FREE',
      price: '₹0',
      period: '',
      plan: 'free' as const,
      features: [
        'Command Center Access',
        'Basic Asset Shield',
        'Device Sync',
        'Community Support',
      ],
    },
    {
      name: 'SOVEREIGN CORE',
      price: '₹299',
      period: '/month',
      plan: 'core' as const,
      features: [
        'Everything in FREE',
        'Neural Lab Access',
        'Advanced Analytics',
        'Priority Support',
        'Custom Integrations',
      ],
    },
    {
      name: 'GLOBAL SHIELD',
      price: '₹499',
      period: '/month',
      plan: 'shield' as const,
      features: [
        'Everything in CORE',
        'Sentinel Protocol Access',
        'Tactical Countermeasures',
        'Acoustic Matrix',
        'Panic Protocol',
        'White-Glove Support',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tierData) => {
        const isCurrentPlan = tier === tierData.plan;
        const isRecommended = tierData.plan === 'core';

        return (
          <div
            key={tierData.plan}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all ${
              isRecommended
                ? 'border-[#10b981] relative'
                : isCurrentPlan
                ? 'border-[#1890FF]'
                : 'border-gray-200'
            }`}
          >
            {isRecommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tierData.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">{tierData.price}</span>
                {tierData.period && (
                  <span className="text-gray-600 text-sm">{tierData.period}</span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {tierData.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSubscribe(tierData.plan)}
              disabled={isCurrentPlan}
              className={`w-full ${
                isCurrentPlan
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : isRecommended
                  ? 'bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white'
                  : 'bg-[#1890FF] hover:bg-[#1677CC] text-white'
              }`}
            >
              {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
