import HeroSection from '@/components/landing/HeroSection';
import AuthorityQuote from '@/components/landing/AuthorityQuote';
import BentoGridPreview from '@/components/landing/BentoGridPreview';
import PricingTable from '@/components/dashboard/PricingTable';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import Footer from '@/components/layout/Footer';

interface LandingPageProps {
  onShowLogin: () => void;
}

export default function LandingPage({ onShowLogin }: LandingPageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
      {/* Hero Section with 3D Nodes */}
      <HeroSection onShowLogin={onShowLogin} />

      {/* Authority Quote Section */}
      <AuthorityQuote />

      {/* Bento Grid Preview */}
      <BentoGridPreview />

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

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Choose Your Shield
          </h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-2xl mx-auto">
            Select the protection tier that matches your sovereignty requirements
          </p>
          <PricingTable />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
