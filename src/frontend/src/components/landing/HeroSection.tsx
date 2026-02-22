import { Button } from '@/components/ui/button';
import FloatingNodes3D from './FloatingNodes3D';

interface HeroSectionProps {
  onShowLogin: () => void;
}

export default function HeroSection({ onShowLogin }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block">
            <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
              🛡️ Sovereign Digital Security
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Your Voice.
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Your Rules.
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl">
            AXON SOVEREIGN delivers military-grade meeting security, voice synthesis, and tactical countermeasures for the modern professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={onShowLogin}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg shadow-emerald-600/30 transition-all hover:shadow-xl hover:shadow-emerald-600/50"
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          <div className="flex items-center gap-8 justify-center lg:justify-start text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Zero Trust Architecture</span>
            </div>
          </div>
        </div>

        {/* Right Column - Floating Nodes Visualization */}
        <div className="relative h-[500px] lg:h-[600px]">
          <FloatingNodes3D />
        </div>
      </div>
    </section>
  );
}
