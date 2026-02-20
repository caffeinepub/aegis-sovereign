import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Fingerprint } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import PrimaryCTA from '@/components/common/PrimaryCTA';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import VideoWelcomeWidget from '@/components/video/VideoWelcomeWidget';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/axon-logo.dim_800x800.png" alt="AXON" className="h-8 w-8" />
            <span className="text-xl font-bold">AXON</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-gray-300 hover:text-emerald-500 transition-colors">
              Dashboard
            </a>
            <a href="#intelligence" className="text-gray-300 hover:text-emerald-500 transition-colors">
              Intelligence
            </a>
            <a href="#support" className="text-gray-300 hover:text-emerald-500 transition-colors">
              Support
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <PrimaryCTA onClick={() => navigate({ to: '/signup' })}>
              Start Sovereign Trial
            </PrimaryCTA>
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
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Secure Your Corporate Intelligence
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              with Sovereign Neural Defense
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300 leading-relaxed">
            The only decentralized command center that masks acoustic signatures and encrypts executive summaries in real-time.
          </p>
          <div className="flex items-center justify-center gap-4">
            <PrimaryCTA onClick={() => navigate({ to: '/signup' })}>
              Secure My First Meeting
            </PrimaryCTA>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section id="intelligence" className="border-t border-white/10 bg-black py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold">Absolute Trust Architecture</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <Shield className="mb-4 h-12 w-12 text-emerald-400" />
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
                <Lock className="mb-4 h-12 w-12 text-cyan-400" />
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
                <Fingerprint className="mb-4 h-12 w-12 text-emerald-400" />
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

      {/* Testimonials */}
      <section className="border-t border-white/10 bg-black py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold">Verified Operative Feedback</h2>
          <p className="mb-16 text-center text-xl text-gray-400">
            Trusted by security leaders worldwide
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              avatarSrc="/assets/generated/testimonial-avatar-1.dim_80x80.png"
              name="Marcus Chen"
              title="Chief Security Officer, Fortune 500"
              quote="Before Axon, our remote meetings were a security risk; now, we operate with total peace of mind."
            />
            <TestimonialCard
              avatarSrc="/assets/generated/testimonial-avatar-2.dim_80x80.png"
              name="Sarah Mitchell"
              title="VP of Operations, Global Tech Corp"
              quote="The transformation has been remarkable. AXON's neural defense system turned our vulnerable video calls into a fortress of encrypted intelligence."
            />
            <TestimonialCard
              avatarSrc="/assets/generated/testimonial-avatar-3.dim_80x80.png"
              name="David Rodriguez"
              title="Director of IT Security, Financial Services"
              quote="We went from constant anxiety about meeting security to complete confidence. AXON's sovereign architecture is a game-changer for enterprise communications."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Video Welcome Widget */}
      <VideoWelcomeWidget />
    </div>
  );
}
