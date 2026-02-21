import { CheckCircle2, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <CreditCard className="h-10 w-10 text-emerald-500" />
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">Pricing</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Choose the plan that fits your security needs
          </p>
        </div>

        {/* Pricing Cards - Side by Side */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Basic Tier */}
          <Card className="flex flex-col bg-card border-emerald-500/20">
            <CardHeader className="border-b border-emerald-500/10">
              <CardTitle className="text-2xl font-bold text-foreground">Basic</CardTitle>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-bold text-emerald-500">₹299</span>
                <span className="text-xl text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Essential features for individual professionals</p>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-foreground">{feature}</span>
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
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="flex flex-col bg-card border-2 border-emerald-500/30 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-1.5 text-sm font-semibold text-white shadow-lg">
              Most Popular
            </div>
            <CardHeader className="border-b border-emerald-500/10">
              <CardTitle className="text-2xl font-bold text-foreground">Premium</CardTitle>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-bold text-emerald-500">₹499</span>
                <span className="text-xl text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Advanced security for power users and teams</p>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-foreground">{feature}</span>
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
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 rounded-2xl border border-emerald-500/20 bg-card p-8 text-center max-w-5xl mx-auto">
          <p className="text-muted-foreground">
            All plans include end-to-end encryption, secure cloud storage, and 24/7 system monitoring.
            <br />
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
