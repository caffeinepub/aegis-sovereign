import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GhostModeContextType {
  isGhostMode: boolean;
  toggleGhostMode: () => void;
}

const GhostModeContext = createContext<GhostModeContextType | undefined>(undefined);

export function GhostModeProvider({ children }: { children: ReactNode }) {
  const [isGhostMode, setIsGhostMode] = useState(() => {
    const stored = sessionStorage.getItem('ghostMode');
    return stored === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('ghostMode', String(isGhostMode));
  }, [isGhostMode]);

  const toggleGhostMode = () => {
    setIsGhostMode((prev) => !prev);
  };

  return (
    <GhostModeContext.Provider value={{ isGhostMode, toggleGhostMode }}>
      {children}
    </GhostModeContext.Provider>
  );
}

export function useGhostMode() {
  const context = useContext(GhostModeContext);
  if (context === undefined) {
    throw new Error('useGhostMode must be used within a GhostModeProvider');
  }
  return context;
}
