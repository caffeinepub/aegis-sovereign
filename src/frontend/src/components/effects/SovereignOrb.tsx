import { useState } from 'react';

export default function SovereignOrb() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute left-4 top-4 z-10">
        <h3 className="text-lg font-semibold text-white">Sovereign Orb</h3>
        <p className="text-sm text-gray-400">Neural core visualization</p>
      </div>

      <div
        className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ripple effects on hover */}
        {isHovered && (
          <>
            <div className="absolute inset-0 animate-ripple-1 rounded-full border-2 border-blue-400/50" />
            <div className="absolute inset-0 animate-ripple-2 rounded-full border-2 border-purple-400/50" />
          </>
        )}

        {/* Main Orb */}
        <div
          className="sovereign-orb h-48 w-48 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #60a5fa, #8b5cf6, #1e1b4b)',
            boxShadow: '0 0 60px rgba(96, 165, 250, 0.6), 0 0 100px rgba(139, 92, 246, 0.4)',
            backdropFilter: 'blur(10px)',
            animation: 'rotate3d 10s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes rotate3d {
          0% {
            transform: rotateY(0deg) rotateX(10deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(10deg);
          }
        }
        @keyframes ripple-1 {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes ripple-2 {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .sovereign-orb {
          transform-style: preserve-3d;
        }
        .animate-ripple-1 {
          animation: ripple-1 1s ease-out infinite;
        }
        .animate-ripple-2 {
          animation: ripple-2 1s ease-out infinite 0.3s;
        }
      `}</style>
    </div>
  );
}
