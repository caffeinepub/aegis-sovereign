import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import BorderBeam from '../effects/BorderBeam';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  showBeam?: boolean;
}

export default function BentoCard({ children, className = '', showBeam = true }: BentoCardProps) {
  return (
    <Card className={`relative overflow-hidden border-slate-200 bg-white/80 backdrop-blur-xl shadow-lg ${className}`}>
      {showBeam && <BorderBeam />}
      {children}
    </Card>
  );
}
