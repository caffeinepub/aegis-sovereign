import { Button } from '@/components/ui/button';
import { ComponentPropsWithoutRef } from 'react';

interface PrimaryCTAProps extends Omit<ComponentPropsWithoutRef<typeof Button>, 'variant' | 'className'> {
  children: React.ReactNode;
  className?: string;
}

export default function PrimaryCTA({ children, className = '', ...props }: PrimaryCTAProps) {
  return (
    <Button
      {...props}
      className={`relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/60 ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </Button>
  );
}
