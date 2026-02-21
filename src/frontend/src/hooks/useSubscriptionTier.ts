import { useState, useEffect } from 'react';
import { getCurrentUser, updateUserPlan, getCurrentUserEmail } from '@/utils/localStorageAuth';

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
    const user = getCurrentUser();
    return user?.plan || 'free';
  });

  useEffect(() => {
    // Listen for storage changes
    const handleStorageChange = () => {
      const user = getCurrentUser();
      if (user) {
        setTierState(user.plan);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for changes in the same tab
    const interval = setInterval(() => {
      const user = getCurrentUser();
      if (user && user.plan !== tier) {
        setTierState(user.plan);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [tier]);

  const setTier = (newTier: SubscriptionTier) => {
    const email = getCurrentUserEmail();
    if (email) {
      const success = updateUserPlan(email, newTier);
      if (success) {
        setTierState(newTier);
        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
      }
    }
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
