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

// Initialize store with default values to prevent null reference errors
function initializeStore(): SubscriptionTier {
  try {
    const stored = localStorage.getItem('AXON_SUBSCRIPTION_TIER');
    if (stored && (stored === 'free' || stored === 'core' || stored === 'shield')) {
      return stored as SubscriptionTier;
    }
    // Default to 'free' if no valid tier found
    localStorage.setItem('AXON_SUBSCRIPTION_TIER', 'free');
    return 'free';
  } catch (error) {
    console.error('Error initializing subscription tier store:', error);
    return 'free';
  }
}

export function useSubscriptionTier(): SubscriptionTierInfo {
  // Null-check guard: Initialize with default 'free' tier if store is null/undefined
  const [tier, setTierState] = useState<SubscriptionTier>(() => {
    try {
      return initializeStore();
    } catch (error) {
      console.error('Critical error in subscription tier initialization:', error);
      return 'free';
    }
  });

  useEffect(() => {
    try {
      // Validate tier before saving
      if (tier && (tier === 'free' || tier === 'core' || tier === 'shield')) {
        localStorage.setItem('AXON_SUBSCRIPTION_TIER', tier);
      }
    } catch (error) {
      console.error('Error persisting subscription tier:', error);
    }
  }, [tier]);

  const setTier = (newTier: SubscriptionTier) => {
    try {
      // Validate new tier
      if (!newTier || (newTier !== 'free' && newTier !== 'core' && newTier !== 'shield')) {
        console.error('Invalid tier provided:', newTier);
        return;
      }
      
      setTierState(newTier);
      localStorage.setItem('AXON_SUBSCRIPTION_TIER', newTier);
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error setting subscription tier:', error);
    }
  };

  // Null-check guard: Ensure tier is always valid
  const safeTier = tier || 'free';

  return {
    tier: safeTier,
    isFree: safeTier === 'free',
    isCore: safeTier === 'core',
    isShield: safeTier === 'shield',
    isNeuralLabUnlocked: safeTier === 'core' || safeTier === 'shield',
    isSentinelProtocolUnlocked: safeTier === 'shield',
    isLiveSpectralAnalysisUnlocked: safeTier === 'shield',
    canAccessSentinel: safeTier === 'shield',
    canAccessSpectralAnalysis: safeTier === 'shield',
    setTier,
  };
}
