import { useState, useEffect } from 'react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';
import { AlertTriangle } from 'lucide-react';

type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

interface ThreatCell {
  vector: string;
  category: string;
  count: number;
  level: ThreatLevel;
  active: boolean;
}

const ATTACK_VECTORS = ['Phishing', 'Malware', 'DDoS', 'Zero-Day'];
const CATEGORIES = ['Email', 'Network', 'Application', 'Endpoint'];

export default function ThreatDetectionMatrix() {
  const [threats, setThreats] = useState<ThreatCell[]>([]);

  useEffect(() => {
    const generateThreats = () => {
      const newThreats: ThreatCell[] = [];
      ATTACK_VECTORS.forEach((vector) => {
        CATEGORIES.forEach((category) => {
          const count = Math.floor(Math.random() * 20);
          let level: ThreatLevel = 'low';
          if (count > 15) level = 'critical';
          else if (count > 10) level = 'high';
          else if (count > 5) level = 'medium';
          
          newThreats.push({
            vector,
            category,
            count,
            level,
            active: count > 10 && Math.random() > 0.5,
          });
        });
      });
      setThreats(newThreats);
    };

    generateThreats();
    const interval = setInterval(generateThreats, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: ThreatLevel) => {
    switch (level) {
      case 'low': return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/50 text-orange-400';
      case 'critical': return 'bg-purple-500/20 border-purple-500/50 text-purple-400';
    }
  };

  return (
    <div className="relative h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Threat Detection Matrix</h3>
          <p className="text-sm text-gray-400">Real-time attack vector monitoring</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {threats.map((threat, idx) => (
          <div
            key={idx}
            className={`group relative rounded-lg border p-4 transition-all ${getLevelColor(threat.level)} ${
              threat.active ? 'animate-pulse-green' : ''
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium">{threat.vector}</span>
              {threat.active && <AlertTriangle className="h-3 w-3 animate-pulse" />}
            </div>
            <div className="text-2xl font-bold">{threat.count}</div>
            <div className="text-xs opacity-70">{threat.category}</div>

            {/* Tooltip */}
            <div className="pointer-events-none absolute -top-20 left-1/2 z-10 hidden w-48 -translate-x-1/2 rounded-lg border border-white/20 bg-black/95 p-3 text-xs opacity-0 transition-opacity group-hover:block group-hover:opacity-100">
              <div className="font-semibold">{threat.vector} - {threat.category}</div>
              <div className="mt-1 text-gray-400">
                Detected: {threat.count} threats<br />
                Severity: {threat.level.toUpperCase()}<br />
                Status: {threat.active ? 'Active' : 'Monitoring'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
