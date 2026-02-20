import { useState, useEffect } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';
import { Shield, Key, Lock, Zap } from 'lucide-react';

interface EncryptionMetrics {
  keyRotation: number;
  quantumResistance: string;
  latticeStatus: 'active' | 'standby';
  postQuantumReadiness: number;
}

export default function QuantumEncryptionMonitor() {
  const [metrics, setMetrics] = useState<EncryptionMetrics>({
    keyRotation: 42,
    quantumResistance: '256-qubit',
    latticeStatus: 'active',
    postQuantumReadiness: 94,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        keyRotation: 40 + Math.floor(Math.random() * 20),
        quantumResistance: Math.random() > 0.5 ? '256-qubit' : '512-qubit',
        latticeStatus: Math.random() > 0.3 ? 'active' : 'standby',
        postQuantumReadiness: 85 + Math.floor(Math.random() * 15),
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getReadinessColor = (score: number) => {
    if (score >= 91) return 'text-green-400';
    if (score >= 71) return 'text-orange-400';
    return 'text-yellow-400';
  };

  const getReadinessStroke = (score: number) => {
    if (score >= 91) return 'stroke-green-400';
    if (score >= 71) return 'stroke-orange-400';
    return 'stroke-yellow-400';
  };

  return (
    <div className="relative h-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Quantum Encryption</h3>
          <p className="text-sm text-gray-400">Post-quantum cryptography status</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Key Rotation */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Key className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-gray-400">Key Rotation</span>
          </div>
          <div className="text-3xl font-bold text-emerald-400">{metrics.keyRotation}</div>
          <div className="text-xs text-gray-500">rotations/hour</div>
        </div>

        {/* Quantum Resistance */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="text-xs text-gray-400">Quantum Resistance</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">{metrics.quantumResistance}</div>
          <div className="text-xs text-gray-500">strength level</div>
        </div>

        {/* Lattice Crypto Status */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Lock className="h-4 w-4 text-purple-400" />
            <span className="text-xs text-gray-400">Lattice Crypto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${metrics.latticeStatus === 'active' ? 'animate-pulse bg-purple-400' : 'bg-gray-600'}`} />
            <span className="text-lg font-semibold capitalize text-purple-400">{metrics.latticeStatus}</span>
          </div>
        </div>

        {/* Post-Quantum Readiness */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-gray-400">PQ Readiness</span>
          </div>
          <div className="relative flex items-center justify-center">
            <svg className="h-20 w-20 -rotate-90 transform">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - metrics.postQuantumReadiness / 100)}`}
                className={`transition-all duration-1000 ${getReadinessStroke(metrics.postQuantumReadiness)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className={`absolute text-xl font-bold ${getReadinessColor(metrics.postQuantumReadiness)}`}>
              {metrics.postQuantumReadiness}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
