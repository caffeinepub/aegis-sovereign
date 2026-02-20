import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, AlertTriangle } from 'lucide-react';
import ActiveStatusIndicator from '../common/ActiveStatusIndicator';

type ThreatType = 'credential-leak' | 'data-breach' | 'brand-mention';
type Severity = 'low' | 'medium' | 'high' | 'critical';

interface Threat {
  id: string;
  type: ThreatType;
  severity: Severity;
  timestamp: Date;
  source: string;
  description: string;
  actions: string[];
}

const THREAT_TYPES: Record<ThreatType, string> = {
  'credential-leak': 'Credential Leak',
  'data-breach': 'Data Breach',
  'brand-mention': 'Brand Mention',
};

const SOURCES = ['AlphaBay', 'DarkMarket', 'Hydra', 'Empire', 'WhiteHouse', 'Versus'];

export default function DarkWebMonitor() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  useEffect(() => {
    const generateThreat = (): Threat => {
      const types: ThreatType[] = ['credential-leak', 'data-breach', 'brand-mention'];
      const severities: Severity[] = ['low', 'medium', 'high', 'critical'];
      const type = types[Math.floor(Math.random() * types.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      
      const actionMap: Record<Severity, string[]> = {
        low: ['Monitor closely', 'Review logs'],
        medium: ['Reset passwords', 'Enable 2FA'],
        high: ['Contact legal team', 'Notify affected users'],
        critical: ['Immediate lockdown', 'Emergency response', 'Contact authorities'],
      };

      return {
        id: Math.random().toString(36).substr(2, 9),
        type,
        severity,
        timestamp: new Date(),
        source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
        description: `${THREAT_TYPES[type]} detected on dark web marketplace`,
        actions: actionMap[severity],
      };
    };

    // Initial threats
    const initial = Array.from({ length: 5 }, generateThreat);
    setThreats(initial);

    // Generate new threats periodically
    const interval = setInterval(() => {
      setThreats(prev => [generateThreat(), ...prev].slice(0, 20));
    }, Math.random() * 15000 + 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
    }
  };

  const filteredThreats = threats.filter(threat => {
    if (filterType !== 'all' && threat.type !== filterType) return false;
    if (filterSeverity !== 'all' && threat.severity !== filterSeverity) return false;
    return true;
  });

  const severityCounts = {
    low: threats.filter(t => t.severity === 'low').length,
    medium: threats.filter(t => t.severity === 'medium').length,
    high: threats.filter(t => t.severity === 'high').length,
    critical: threats.filter(t => t.severity === 'critical').length,
  };

  const exportReport = () => {
    const report = filteredThreats.map(t => 
      `${t.timestamp.toISOString()},${t.type},${t.severity},${t.source},"${t.description}"`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,Type,Severity,Source,Description\n${report}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `darkweb-threats-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative h-full p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dark Web Monitor</h3>
          <p className="text-sm text-gray-400">Threat intelligence from dark web sources</p>
        </div>
        <ActiveStatusIndicator />
      </div>

      {/* Summary Cards */}
      <div className="mb-4 grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3">
          <div className="text-2xl font-bold text-green-400">{severityCounts.low}</div>
          <div className="text-xs text-gray-400">Low Severity</div>
        </div>
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
          <div className="text-2xl font-bold text-yellow-400">{severityCounts.medium}</div>
          <div className="text-xs text-gray-400">Medium Severity</div>
        </div>
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
          <div className="text-2xl font-bold text-orange-400">{severityCounts.high}</div>
          <div className="text-xs text-gray-400">High Severity</div>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <div className="text-2xl font-bold text-red-400">{severityCounts.critical}</div>
          <div className="text-xs text-gray-400">Critical</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-3">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="credential-leak">Credential Leak</SelectItem>
            <SelectItem value="data-breach">Data Breach</SelectItem>
            <SelectItem value="brand-mention">Brand Mention</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterSeverity} onValueChange={setFilterSeverity}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={exportReport} variant="outline" size="sm" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Threat Feed */}
      <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {filteredThreats.map(threat => (
          <div
            key={threat.id}
            className="rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                  {threat.severity.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                  {THREAT_TYPES[threat.type]}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">
                {threat.timestamp.toLocaleTimeString()}
              </span>
            </div>

            <div className="mb-2 flex items-center gap-2 font-mono text-sm text-emerald-400">
              <AlertTriangle className="h-4 w-4" />
              <span>{threat.source}</span>
            </div>

            <p className="mb-3 text-sm text-gray-300">{threat.description}</p>

            <div className="flex flex-wrap gap-2">
              {threat.actions.map((action, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {action}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
