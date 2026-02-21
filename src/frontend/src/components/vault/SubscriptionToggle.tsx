import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SubscriptionToggleProps {
  onChange: (isYearly: boolean) => void;
}

export default function SubscriptionToggle({ onChange }: SubscriptionToggleProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (checked: boolean) => {
    setIsYearly(checked);
    onChange(checked);
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Label
        htmlFor="billing-toggle"
        className={`text-sm font-medium transition-colors ${
          !isYearly ? 'text-[#10b981]' : 'text-gray-400'
        }`}
      >
        Billed Monthly
      </Label>
      <Switch
        id="billing-toggle"
        checked={isYearly}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-[#10b981]"
      />
      <Label
        htmlFor="billing-toggle"
        className={`text-sm font-medium transition-colors ${
          isYearly ? 'text-[#10b981]' : 'text-gray-400'
        }`}
      >
        Billed Yearly <span className="text-[#10b981]">(Save 20%)</span>
      </Label>
    </div>
  );
}
