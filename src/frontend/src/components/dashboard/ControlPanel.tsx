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
    <Card className="bg-white shadow-md rounded-lg border border-gray-200 h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#001529]">Control Panel</CardTitle>
        <p className="text-sm text-gray-500">Security toggles</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[#10b981]" />
            <Label htmlFor="neural-shield" className="text-sm font-medium text-[#001529] cursor-pointer">
              Neural Shield
            </Label>
          </div>
          <Switch
            id="neural-shield"
            checked={neuralShield}
            onCheckedChange={handleNeuralShieldToggle}
            className="data-[state=checked]:bg-[#10b981]"
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <EyeOff className="h-5 w-5 text-[#10b981]" />
            <Label htmlFor="stealth-mode" className="text-sm font-medium text-[#001529] cursor-pointer">
              Stealth Mode
            </Label>
          </div>
          <Switch
            id="stealth-mode"
            checked={stealthMode}
            onCheckedChange={handleStealthModeToggle}
            className="data-[state=checked]:bg-[#10b981]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
