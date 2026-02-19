import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="animate-in fade-in duration-300">{children}</div>;
}
