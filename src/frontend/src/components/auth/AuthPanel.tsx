import { ReactNode } from 'react';

interface AuthPanelProps {
  children: ReactNode;
  shake: boolean;
}

export default function AuthPanel({ children, shake }: AuthPanelProps) {
  return (
    <div
      className={`relative w-full max-w-5xl mx-auto tactical-glass rounded-[20px] border border-white/10 shadow-2xl p-8 ${
        shake ? 'animate-shake' : ''
      }`}
    >
      {/* Tactical scanlines overlay */}
      <div className="absolute inset-0 tactical-scanlines pointer-events-none rounded-[20px] opacity-30" />
      
      {/* Logo */}
      <div className="absolute top-6 left-8 z-10">
        <img
          src="/assets/generated/axon-logo.dim_800x800.png"
          alt="AXON SOVEREIGN"
          className="h-12 w-auto"
        />
      </div>

      {/* Content */}
      <div className="mt-16 relative z-10">
        {children}
      </div>
    </div>
  );
}
