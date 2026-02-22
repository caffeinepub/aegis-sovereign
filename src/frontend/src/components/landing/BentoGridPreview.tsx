import { Shield, Mic, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import BentoCard from '@/components/layout/BentoCard';

function AssetShieldPreview() {
  const [value, setValue] = useState(1241310);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev + Math.floor(Math.random() * 100) + 50);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <Shield className="h-12 w-12 text-emerald-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Asset Shield Status</h3>
      <div className="text-4xl font-bold text-emerald-400">
        ₹{value.toLocaleString('en-IN')}
      </div>
      <p className="text-white/60 text-sm mt-2">Protected Assets</p>
    </div>
  );
}

function VocalFingerprintPreview() {
  const score = 98.4;
  const percentage = (score / 100) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <Mic className="h-12 w-12 text-violet-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-4">Vocal Fingerprint</h3>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
        </div>
      </div>
      <p className="text-white/60 text-sm mt-2">Health Index</p>
    </div>
  );
}

function GlobalNodeMapPreview() {
  const nodes = [
    { name: 'New York', x: 25, y: 35 },
    { name: 'London', x: 50, y: 30 },
    { name: 'Tokyo', x: 80, y: 40 },
    { name: 'Sydney', x: 85, y: 70 },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <Globe className="h-12 w-12 text-cyan-500 mb-4" />
      <h3 className="text-xl font-bold text-white mb-4">Global Node Map</h3>
      <div className="relative w-full h-48 bg-gradient-to-br from-violet-900/20 to-cyan-900/20 rounded-lg overflow-hidden">
        {/* Simplified world map visualization */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Connection lines */}
          {nodes.map((node, i) => (
            nodes.slice(i + 1).map((targetNode, j) => (
              <line
                key={`${i}-${j}`}
                x1={node.x}
                y1={node.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="0.5"
              />
            ))
          ))}
          {/* Node points */}
          {nodes.map((node, i) => (
            <g key={i}>
              <circle
                cx={node.x}
                cy={node.y}
                r="2"
                fill="#06b6d4"
                className="animate-pulse"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </g>
          ))}
        </svg>
      </div>
      <p className="text-white/60 text-sm mt-2">{nodes.length} Active Nodes</p>
    </div>
  );
}

export default function BentoGridPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Sovereign Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoCard className="min-h-[300px]">
            <AssetShieldPreview />
          </BentoCard>
          <BentoCard className="min-h-[300px]">
            <VocalFingerprintPreview />
          </BentoCard>
          <BentoCard className="min-h-[300px]">
            <GlobalNodeMapPreview />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
