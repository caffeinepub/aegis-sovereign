import { CheckCircle2, CreditCard } from 'lucide-react';
import BentoCard from '@/components/layout/BentoCard';
import PrimaryCTA from '@/components/common/PrimaryCTA';
import { toast } from 'sonner';

export default function Subscriptions() {
  const handleSubscribe = (tier: string) => {
    toast.info(`Subscription flow is currently simulated. Payment integration coming soon!`, {
      description: `You selected the ${tier} plan`,
    });
  };

  const basicFeatures = [
    'Neural Frequency Visualizer',
    'Sentiment Analysis',
    'Meeting ROI Tracking',
    'Speaker Identity Matrix',
    'Voice Pattern Recognition',
    'Up to 10 meeting recordings/month',
  ];

  const premiumFeatures = [
    'All Basic features',
    'Sentinel Protocol access',
    'Panic Mode',
    'Environment Spoofing',
    'Packet Jitter Simulator',
    'Dark Web Monitoring',
    'Threat Detection Matrix',
    'Executive Briefing Generator',
    'Unlimited meeting recordings',
    'Priority support',
  ];

  return (
    <div className="min-h-screen bg-black p-6 md:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <CreditCard className="h-10 w-10 text-emerald-400" />
            <h1 className="text-4xl font-bold text-white md:text-5xl">Subscriptions</h1>
          </div>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your security needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Basic Tier */}
          <BentoCard className="flex flex-col">
            <div className="flex-1 p-8">
              <div className="mb-6">
                <h2 className="mb-2 text-3xl font-bold text-white">Basic</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-emerald-400">₹300</span>
                  <span className="text-xl text-gray-400">/month</span>
                </div>
                <p className="mt-3 text-gray-400">Essential features for individual professionals</p>
              </div>

              <div className="mb-8 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PrimaryCTA
                onClick={() => handleSubscribe('Basic')}
                className="w-full"
              >
                Subscribe to Basic
              </PrimaryCTA>
            </div>
          </BentoCard>

          {/* Premium Tier */}
          <BentoCard className="flex flex-col border-emerald-500/30">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-1.5 text-sm font-semibold text-white shadow-lg">
              Most Popular
            </div>
            <div className="flex-1 p-8">
              <div className="mb-6">
                <h2 className="mb-2 text-3xl font-bold text-white">Premium</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-emerald-400">₹500</span>
                  <span className="text-xl text-gray-400">/month</span>
                </div>
                <p className="mt-3 text-gray-400">Advanced security for power users and teams</p>
              </div>

              <div className="mb-8 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PrimaryCTA
                onClick={() => handleSubscribe('Premium')}
                className="w-full"
              >
                Subscribe to Premium
              </PrimaryCTA>
            </div>
          </BentoCard>
        </div>

        {/* Additional Info */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-gray-400">
            All plans include end-to-end encryption, secure cloud storage, and 24/7 system monitoring.
            <br />
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
