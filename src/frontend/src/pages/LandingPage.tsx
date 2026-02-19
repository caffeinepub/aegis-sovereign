import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Fingerprint, Check } from 'lucide-react';
import { SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { useNavigate } from '@tanstack/react-router';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/aegis-logo.dim_512x512.png" alt="Aegis Sovereign" className="h-8 w-8" />
            <span className="text-xl font-bold">Aegis Sovereign</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate({ to: '/login' })}>
              Login
            </Button>
            <Button onClick={() => navigate({ to: '/signup' })}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
            Neural Meeting Intelligence
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              for Global Leaders
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Enterprise-grade meeting intelligence with quantum-resistant encryption and biometric integrity
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate({ to: '/signup' })} className="text-lg">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/login' })}>
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold">Absolute Trust Architecture</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <Shield className="mb-4 h-12 w-12 text-blue-400" />
                <CardTitle>Quantum-Resistant Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Post-quantum cryptographic algorithms protect your data against future quantum computing threats.
                  Military-grade encryption ensures your meetings remain confidential.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <Lock className="mb-4 h-12 w-12 text-purple-400" />
                <CardTitle>SOC2 Type II Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Independently audited security controls meet the highest industry standards. Continuous monitoring
                  and compliance reporting for enterprise peace of mind.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <Fingerprint className="mb-4 h-12 w-12 text-green-400" />
                <CardTitle>Biometric Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Advanced biometric authentication ensures only authorized personnel access sensitive meeting data.
                  Multi-factor verification with voice and behavioral analysis.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/10 bg-gradient-to-b from-black to-gray-900 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold">Enterprise Pricing</h2>
          <p className="mb-16 text-center text-xl text-gray-400">Choose the plan that fits your organization</p>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Professional */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold">Free</span>
                </div>
                <CardDescription className="mt-2">Perfect for individual professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Up to 10 meetings/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Basic sentiment analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Meeting transcripts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>7-day data retention</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" variant="outline" onClick={() => navigate({ to: '/signup' })}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="relative border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-purple-500/10 backdrop-blur-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold">$49</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <CardDescription className="mt-2">For growing teams and organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Unlimited meetings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Advanced AI analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Neural voice cloning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>90-day data retention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" onClick={() => navigate({ to: '/signup' })}>
                  Start Trial
                </Button>
              </CardContent>
            </Card>

            {/* Sovereign */}
            <Card className="border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-pink-500/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Sovereign</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold">$149</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <CardDescription className="mt-2">Maximum security and control</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Everything in Enterprise</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Sentinel Protocol access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Environment spoofing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Unlimited data retention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="mt-6 w-full" onClick={() => navigate({ to: '/signup' })}>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {new Date().getFullYear()} Aegis Sovereign. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Built with ❤️ using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  window.location.hostname
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <SiX className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <SiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <SiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
