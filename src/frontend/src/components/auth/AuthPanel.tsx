import { ReactNode } from 'react';

interface AuthPanelProps {
  children: ReactNode;
  shake: boolean;
  onLogoClick: () => void;
}

export default function AuthPanel({ children, shake, onLogoClick }: AuthPanelProps) {
  return (
    <div
      className={`relative w-full max-w-5xl mx-auto tactical-glass rounded-[20px] border border-white/10 shadow-2xl p-8 ${
        shake ? 'animate-shake' : ''
      }`}
    >
      {/* Tactical scanlines overlay */}
      <div className="absolute inset-0 tactical-scanlines pointer-events-none rounded-[20px] opacity-30" />
      
      {/* AXON Logo */}
      <div className="text-center mb-8 relative z-10">
        <img 
          src="/assets/generated/axon-logo.dim_400x120.png" 
          alt="AXON SOVEREIGN" 
          className="h-16 mx-auto cursor-pointer select-none"
          onClick={onLogoClick}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
