import { Check, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BorderBeam from '../effects/BorderBeam';

interface SubscriptionTierCardProps {
  tierName: string;
  tierLevel: 'free' | 'core' | 'shield';
  monthlyPrice?: number;
  yearlyPrice?: number;
  isYearly: boolean;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}

export default function SubscriptionTierCard({
  tierName,
  tierLevel,
  monthlyPrice,
  yearlyPrice,
  isYearly,
  features,
  isSelected,
  onClick,
}: SubscriptionTierCardProps) {
  const displayPrice = isYearly ? yearlyPrice : monthlyPrice;
  const isFree = tierLevel === 'free';

  return (
    <Card
      className={`relative overflow-hidden border transition-all cursor-pointer ${
        isSelected
          ? 'border-[#10b981] bg-[#10b981]/5 shadow-lg shadow-[#10b981]/20'
          : 'border-white/10 bg-white/5 hover:border-[#10b981]/50'
      } backdrop-blur-xl`}
      onClick={onClick}
    >
      {isSelected && <BorderBeam />}
      <div className="p-6">
        {/* Tier Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{tierName}</h3>
          {isFree ? (
            <div className="text-3xl font-bold text-[#10b981]">FREE</div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-[#10b981]">₹{displayPrice}</span>
              <span className="text-gray-400 text-sm">/{isYearly ? 'year' : 'month'}</span>
            </div>
          )}
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-[#10b981] flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Select Button */}
        <Button
          className={`w-full ${
            isSelected
              ? 'bg-[#10b981] hover:bg-[#059669] text-white'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Current Plan
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Select Plan
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
