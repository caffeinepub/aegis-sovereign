import { useState, useEffect } from 'react';

export type SubscriptionTier = 'free' | 'core' | 'shield';

interface SubscriptionTierInfo {
  tier: SubscriptionTier;
  isFree: boolean;
  isCore: boolean;
  isShield: boolean;
  isNeuralLabUnlocked: boolean;
  isSentinelProtocolUnlocked: boolean;
  isLiveSpectralAnalysisUnlocked: boolean;
  canAccessSentinel: boolean;
  canAccessSpectralAnalysis: boolean;
  setTier: (newTier: SubscriptionTier) => void;
}

export function useSubscriptionTier(): SubscriptionTierInfo {
  const [tier, setTierState] = useState<SubscriptionTier>(() => {
    const stored = localStorage.getItem('AXON_SUBSCRIPTION_TIER');
    return (stored as SubscriptionTier) || 'free';
  });

  useEffect(() => {
    localStorage.setItem('AXON_SUBSCRIPTION_TIER', tier);
  }, [tier]);

  const setTier = (newTier: SubscriptionTier) => {
    setTierState(newTier);
    localStorage.setItem('AXON_SUBSCRIPTION_TIER', newTier);
    window.dispatchEvent(new Event('storage'));
  };

  return {
    tier,
    isFree: tier === 'free',
    isCore: tier === 'core',
    isShield: tier === 'shield',
    isNeuralLabUnlocked: tier === 'core' || tier === 'shield',
    isSentinelProtocolUnlocked: tier === 'shield',
    isLiveSpectralAnalysisUnlocked: tier === 'shield',
    canAccessSentinel: tier === 'shield',
    canAccessSpectralAnalysis: tier === 'shield',
    setTier,
  };
}
