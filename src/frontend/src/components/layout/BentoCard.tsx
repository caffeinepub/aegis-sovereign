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
    <Card className={`relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl ${className}`}>
      {showBeam && <BorderBeam />}
      {children}
    </Card>
  );
}
