import { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
   value: number;
   duration?: number;
   className?: string;
}

const AnimatedCounter = ({ value, duration = 2, className = '' }: AnimatedCounterProps) => {
   const ref = useRef<HTMLSpanElement>(null);
   const inView = useInView(ref, { once: true, amount: 0.5 });
   const motionValue = useMotionValue(0);
   const springValue = useSpring(motionValue, {
      damping: 30,
      stiffness: 100,
      restDelta: 0.001,
      duration: duration * 1000,
   });

   useEffect(() => {
      if (inView) {
         motionValue.set(value);
      }
   }, [inView, value, motionValue]);

   useEffect(() => {
      springValue.on("change", (latest) => {
         if (ref.current) {
            ref.current.textContent = Intl.NumberFormat("en-US").format(
               latest.toFixed(0) as any
            );
         }
      });
   }, [springValue]);

   return <span ref={ref} className={className} />;
};

export default AnimatedCounter;
