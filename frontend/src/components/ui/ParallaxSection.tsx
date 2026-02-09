import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
   children: ReactNode;
   className?: string;
   speed?: number; // -1 to 1, negative = opposite direction
   offset?: number;
}

const ParallaxSection = ({ 
   children, 
   className = '',
   speed = 0.5,
   offset = 0
}: ParallaxSectionProps) => {
   const ref = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
   });

   const y = useTransform(
      scrollYProgress,
      [0, 1],
      [offset, offset + (speed * 300)]
   );

   return (
      <div ref={ref} className={className}>
         <motion.div style={{ y }}>
            {children}
         </motion.div>
      </div>
   );
};

export default ParallaxSection;
