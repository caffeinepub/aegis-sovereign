import { useNavigate } from '@tanstack/react-router';
import { Shield, Lock, Radio, Cpu, Smartphone, Users } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si';
import PrimaryCTA from '@/components/common/PrimaryCTA';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate({ to: '/login' });
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-[#10b981]" />,
      title: 'Sentinel Protocol',
      description: 'Advanced tactical countermeasures for meeting security',
    },
    {
      icon: <Lock className="h-8 w-8 text-[#10b981]" />,
      title: 'Quantum Encryption',
      description: 'Military-grade encryption for all communications',
    },
    {
      icon: <Radio className="h-8 w-8 text-[#10b981]" />,
      title: 'Neural Network',
      description: 'AI-powered voice analysis and synthesis',
    },
    {
      icon: <Cpu className="h-8 w-8 text-[#10b981]" />,
      title: 'Neural Lab',
      description: 'Create your digital voice twin with AI',
    },
    {
      icon: <Smartphone className="h-8 w-8 text-[#10b981]" />,
      title: 'Device Sync',
      description: 'Seamless tactical mobile integration',
    },
    {
      icon: <Users className="h-8 w-8 text-[#10b981]" />,
      title: 'Team Management',
      description: 'Sovereign control over team access',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'CEO, TechCorp',
      avatarSrc: '/assets/generated/testimonial-avatar-1.dim_80x80.png',
      quote: 'AXON transformed how we handle sensitive meetings. The security features are unmatched.',
    },
    {
      name: 'Marcus Rodriguez',
      title: 'Security Director',
      avatarSrc: '/assets/generated/testimonial-avatar-2.dim_80x80.png',
      quote: 'The Sentinel Protocol gives us peace of mind during critical negotiations.',
    },
    {
      name: 'Emily Watson',
      title: 'Product Manager',
      avatarSrc: '/assets/generated/testimonial-avatar-3.dim_80x80.png',
      quote: 'Neural Lab\'s voice synthesis is incredibly accurate. A game-changer for our team.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001529] via-[#002140] to-[#001529]">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/generated/hero-bg.dim_1920x1080.png')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            AXON SOVEREIGN
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Military-grade meeting security with AI-powered voice synthesis and tactical countermeasures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryCTA onClick={handleGetStarted}>
              Get Started
            </PrimaryCTA>
            <PrimaryCTA onClick={handleGetStarted}>
              View Demo
            </PrimaryCTA>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Security Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Trusted by Leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
