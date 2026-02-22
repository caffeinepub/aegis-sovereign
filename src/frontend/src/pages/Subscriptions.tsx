import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useSubscriptionTier } from '@/hooks/useSubscriptionTier';

export default function Subscriptions() {
  const { tier, setTier } = useSubscriptionTier();

  const handleSubscribe = (selectedTier: 'free' | 'core' | 'shield') => {
    setTier(selectedTier);
    toast.success(`Subscription updated to ${selectedTier.toUpperCase()} tier`, {
      duration: 3000,
    });
  };

  const tiers = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Essential features for getting started',
      features: [
        'Command Center access',
        'Basic meeting logs',
        'Device sync',
        'Secure vault',
        'Community support',
      ],
    },
    {
      id: 'core',
      name: 'Sovereign Core',
      price: '₹299',
      period: 'per month',
      description: 'Advanced features for power users',
      features: [
        'Everything in Free',
        'Neural Lab access',
        'Voice synthesis',
        'AI mirror status',
        'Priority support',
        'Advanced analytics',
      ],
      popular: true,
    },
    {
      id: 'shield',
      name: 'Global Shield',
      price: '₹499',
      period: 'per month',
      description: 'Complete protection and premium features',
      features: [
        'Everything in Core',
        'Sentinel Protocol access',
        'Panic protocol',
        'Environment spoofing',
        'Hardware mimicry',
        'Spectral analysis',
        'Dedicated support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#001529] mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Select the perfect tier for your security needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((planTier) => (
            <Card
              key={planTier.id}
              className={`relative ${
                planTier.popular ? 'border-[#10b981] border-2 shadow-lg' : ''
              }`}
            >
              {planTier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10b981] text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{planTier.name}</CardTitle>
                <CardDescription>{planTier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-[#001529]">{planTier.price}</span>
                  <span className="text-gray-600 ml-2">/ {planTier.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {planTier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(planTier.id as 'free' | 'core' | 'shield')}
                  className={`w-full ${
                    tier === planTier.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#10b981] hover:bg-[#059669]'
                  }`}
                  disabled={tier === planTier.id}
                >
                  {tier === planTier.id ? 'Current Plan' : 'Subscribe'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
