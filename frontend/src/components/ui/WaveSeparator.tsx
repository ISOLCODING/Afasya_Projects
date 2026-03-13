import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WaveSeparatorProps {
   position?: 'top' | 'bottom';
   fill?: string;
   background?: string;
   height?: number;
   className?: string;
   id?: string;
   animate?: boolean;
}

const WaveSeparator = ({
   position = 'bottom',
   fill = 'currentColor',
   background = 'transparent',
   height = 100, // Increased default height
   className,
   id,
   animate = true
}: WaveSeparatorProps) => {

   // Base path for the wave
   const wavePath = "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";
   const wavePathAlt = "M0,128L48,112C96,96,192,64,288,64C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,64C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

   const variants1 = {
      visible: {
         d: [wavePath, wavePathAlt, wavePath],
         transition: { repeat: Infinity, duration: 20, ease: "linear" as const }
      }
   };

   const variants2 = {
      visible: {
         d: [wavePathAlt, wavePath, wavePathAlt],
         transition: { repeat: Infinity, duration: 15, ease: "linear" as const }
      }
   };

   const variants3 = {
      visible: {
         d: [wavePath, wavePathAlt, wavePath],
         transition: { repeat: Infinity, duration: 10, ease: "linear" as const }
      }
   };

   return (
      <div
         id={id}
         className={cn(
            "absolute left-0 right-0 w-full overflow-hidden leading-none z-10",
            position === 'top' ? 'top-0 rotate-180' : 'bottom-0',
            className
         )}
         style={{ height: `${height}px`, background }}
      >
         <svg
            viewBox="0 0 1440 320"
            className="w-full h-full block"
            preserveAspectRatio="none"
         >
            {/* Back Layer - Slow & Transparent */}
            <motion.path
               fill={fill}
               fillOpacity="0.3"
               d={wavePath}
               animate={animate ? variants1.visible : undefined}
            />

            {/* Middle Layer */}
            <motion.path
               fill={fill}
               fillOpacity="0.5"
               d={wavePathAlt}
               animate={animate ? variants2.visible : undefined}
               className="translate-x-[100px]" // Static offset
            />

            {/* Front Layer - Fast & Solid */}
            <motion.path
               fill={fill}
               fillOpacity="1"
               d={wavePath}
               animate={animate ? variants3.visible : undefined}
            />
         </svg>
      </div>
   );
};

export default WaveSeparator;
