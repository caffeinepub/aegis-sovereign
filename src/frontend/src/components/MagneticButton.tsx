import { useRef, useState, ComponentPropsWithoutRef } from 'react';
import { Button } from '@/components/ui/button';
import { useMousePosition } from '../hooks/useMousePosition';

type MagneticButtonProps = ComponentPropsWithoutRef<typeof Button>;

export default function MagneticButton({ children, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition(ref);

  const magneticStrength = 0.3;
  const transform = isHovered
    ? `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`
    : 'translate(0, 0)';

  return (
    <Button
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform,
        transition: 'transform 0.2s ease-out',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
