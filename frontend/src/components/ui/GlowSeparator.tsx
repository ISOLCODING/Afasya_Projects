import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowSeparatorProps {
   className?: string; // Allow custom classes
   color?: string; // Optional: Override color directly if needed (though classes effectively handle this)
}

const GlowSeparator = ({ className, color }: GlowSeparatorProps) => {
   return (
      <div className={cn("relative w-full flex items-center justify-center py-6", className)}> {/* Added padding y for breathing room */}
         
         {/* Container specifically for the line to control width/position */}
         <div className="relative w-full max-w-7xl mx-auto h-px"> {/* Max-width constraint for massive screens, but fills normally */}
            
            {/* 1. Base Darker Line (Subtle guide) - Very visible grid line in light mode */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neutral-900/20 dark:via-neutral-700/50 to-transparent" />

            {/* 2. Primary Colored Line (The main separator) - Deep Blue in Light Mode */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary-600 dark:via-primary-500/50 to-transparent opacity-100" />

            {/* 3. The Glow Effect (Blurry background) - Double intensity for Light Mode */}
            <div className="absolute inset-x-[10%] -top-px h-[4px] bg-linear-to-r from-transparent via-primary-500/60 dark:via-primary-400/30 to-transparent blur-md" />
            
            {/* 4. Core Light Bloom - Specific for Light Mode visibility */}
            <div className="absolute inset-x-[30%] -top-px h-[2px] bg-linear-to-r from-transparent via-blue-400/80 dark:hidden to-transparent blur-[2px]" />

            {/* 5. Animated "Energy" Pulse (Moving highlight) - High Contrast in Light Mode */}
            <motion.div
               className="absolute top-[-1px] left-0 bottom-[-1px] w-[150px] bg-linear-to-r from-transparent via-blue-500/50 dark:via-white/50 to-transparent blur-lg dark:blur-md dark:mix-blend-plus-lighter"
               animate={{
                  x: ['-100%', '100vw'],
               }}
               transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1.5
               }}
               style={{ willChange: "transform" }}
            />
         </div>
      </div>
   );
};

export default GlowSeparator;
