import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
   position?: 'top' | 'bottom';
   color?: string;
   height?: number;
   className?: string;
}

const ScrollProgress = ({ 
   position = 'top', 
   color = 'bg-primary-500',
   height = 4,
   className = ''
}: ScrollProgressProps) => {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   return (
      <motion.div
         className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 ${color} origin-left z-50 ${className}`}
         style={{ 
            scaleX,
            height: `${height}px`
         }}
      />
   );
};

export default ScrollProgress;
