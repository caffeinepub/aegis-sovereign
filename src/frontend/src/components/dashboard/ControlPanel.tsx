import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, EyeOff } from 'lucide-react';
import { useTelemetry } from '@/contexts/TelemetryContext';

export default function ControlPanel() {
  const { logEvent } = useTelemetry();
  const [neuralShield, setNeuralShield] = useState(() => {
    const saved = sessionStorage.getItem('neuralShield');
    return saved ? JSON.parse(saved) : false;
  });
  const [stealthMode, setStealthMode] = useState(() => {
    const saved = sessionStorage.getItem('stealthMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('neuralShield', JSON.stringify(neuralShield));
  }, [neuralShield]);

  useEffect(() => {
    sessionStorage.setItem('stealthMode', JSON.stringify(stealthMode));
  }, [stealthMode]);

  const handleNeuralShieldToggle = (checked: boolean) => {
    setNeuralShield(checked);
    logEvent(
      `Neural Shield ${checked ? 'ACTIVATED' : 'DEACTIVATED'}`,
      checked ? 'success' : 'warning'
    );
  };

  const handleStealthModeToggle = (checked: boolean) => {
    setStealthMode(checked);
    logEvent(
      `Stealth Mode ${checked ? 'ENABLED' : 'DISABLED'}`,
      checked ? 'success' : 'warning'
    );
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Control Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-500" />
            <Label htmlFor="neural-shield" className="text-sm font-medium text-foreground cursor-pointer">
              Neural Shield
            </Label>
          </div>
          <Switch
            id="neural-shield"
            checked={neuralShield}
            onCheckedChange={handleNeuralShieldToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EyeOff className="h-5 w-5 text-emerald-500" />
            <Label htmlFor="stealth-mode" className="text-sm font-medium text-foreground cursor-pointer">
              Stealth Mode
            </Label>
          </div>
          <Switch
            id="stealth-mode"
            checked={stealthMode}
            onCheckedChange={handleStealthModeToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
}
