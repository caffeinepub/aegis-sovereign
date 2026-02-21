import { useState, useEffect } from 'react';
import SubscriptionTierCard from './SubscriptionTierCard';
import SubscriptionToggle from './SubscriptionToggle';
import { toast } from 'sonner';

const FREE_FEATURES = [
  'Basic Meeting Link Ingest',
  '50MB Secure Vault storage for transcripts',
  'Static AI Synopsis (Post-meeting only)',
];

const CORE_FEATURES = [
  'All Free Features',
  'Neural Lab (Persona Training)',
  'Vocal Health Index Monitoring',
  'Asset Shield Ticker (Value Protected tracking)',
  'Custom Personality Specification',
];

const SHIELD_FEATURES = [
  'All Core Features',
  'Live Spectral Analysis (Waveform)',
  'Sentinel Protocol (8-tile Acoustic Matrix/Environment masking)',
  'Device Sync (QR Mobile Remote Control)',
  'Sentinel Panic & Ghost Mode Overrides',
  'Live AI Synopsis (Updates in real-time)',
];

export default function SubscriptionTiers() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'free' | 'core' | 'shield'>('free');

  useEffect(() => {
    // Load current tier from localStorage
    const storedTier = localStorage.getItem('AXON_SESSION');
    if (storedTier === 'free' || storedTier === 'core' || storedTier === 'shield') {
      setSelectedTier(storedTier);
    }
  }, []);

  const handleTierSelect = (tier: 'free' | 'core' | 'shield') => {
    setSelectedTier(tier);
    localStorage.setItem('AXON_SESSION', tier);
    
    // Trigger storage event for other components to react
    window.dispatchEvent(new Event('storage'));
    
    const tierNames = {
      free: 'FREE',
      core: 'SOVEREIGN CORE',
      shield: 'GLOBAL SHIELD',
    };
    
    toast.success(`Subscription tier updated to ${tierNames[tier]}`);
  };

  return (
    <div className="mb-12">
      <SubscriptionToggle onChange={setIsYearly} />
      
      <div className="grid gap-6 md:grid-cols-3">
        <SubscriptionTierCard
          tierName="FREE"
          tierLevel="free"
          isYearly={isYearly}
          features={FREE_FEATURES}
          isSelected={selectedTier === 'free'}
          onClick={() => handleTierSelect('free')}
        />
        
        <SubscriptionTierCard
          tierName="SOVEREIGN CORE"
          tierLevel="core"
          monthlyPrice={299}
          yearlyPrice={2870}
          isYearly={isYearly}
          features={CORE_FEATURES}
          isSelected={selectedTier === 'core'}
          onClick={() => handleTierSelect('core')}
        />
        
        <SubscriptionTierCard
          tierName="GLOBAL SHIELD"
          tierLevel="shield"
          monthlyPrice={499}
          yearlyPrice={4790}
          isYearly={isYearly}
          features={SHIELD_FEATURES}
          isSelected={selectedTier === 'shield'}
          onClick={() => handleTierSelect('shield')}
        />
      </div>
    </div>
  );
}
