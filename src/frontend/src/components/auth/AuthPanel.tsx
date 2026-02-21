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
      
      {/* AXON Logo with triple-click handler */}
      <div className="text-center mb-8 relative z-10">
        <h1 
          className="text-4xl font-bold text-white cursor-pointer select-none"
          onClick={onLogoClick}
          title="AXON SOVEREIGN"
        >
          AXON
        </h1>
        <p className="text-xs text-white/50 mt-1">SOVEREIGN</p>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
