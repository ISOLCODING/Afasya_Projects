import { useScrollAnimation } from '@/lib/animations/useGsapAnimations';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const ScrollReveal = ({
  children,
  className = '',
  duration = 0.6,
  delay = 0,
  direction = 'up',
  distance = 30,
}: ScrollRevealProps) => {
  let animationOptions: any = {
    opacity: 1,
    duration,
    delay,
  };

  switch (direction) {
    case 'up':
      animationOptions = { ...animationOptions, y: 0, initial_y: distance };
      break;
    case 'down':
      animationOptions = { ...animationOptions, y: 0, initial_y: -distance };
      break;
    case 'left':
      animationOptions = { ...animationOptions, x: 0, initial_x: distance };
      break;
    case 'right':
      animationOptions = { ...animationOptions, x: 0, initial_x: -distance };
      break;
  }

  const ref = useScrollAnimation(animationOptions);

  return (
    <div ref={ref as any} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
