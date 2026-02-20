import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TelemetryEvent {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface TelemetryContextType {
  events: TelemetryEvent[];
  logEvent: (message: string, type?: TelemetryEvent['type']) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);

  const logEvent = (message: string, type: TelemetryEvent['type'] = 'info') => {
    const newEvent: TelemetryEvent = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      message,
      type,
    };

    setEvents((prev) => {
      const updated = [newEvent, ...prev];
      return updated.slice(0, 50); // Keep only last 50 events
    });
  };

  return (
    <TelemetryContext.Provider value={{ events, logEvent }}>
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within TelemetryProvider');
  }
  return context;
}
