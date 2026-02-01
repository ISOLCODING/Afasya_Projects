import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
   children: ReactNode;
   className?: string;
   containerClassName?: string;
   id?: string;
   background?: 'white' | 'gray' | 'dark' | 'glass' | 'gradient';
   withMotion?: boolean;
}

const Section = ({
   children,
   className,
   containerClassName,
   id,
   background = 'white',
   withMotion = true,
}: SectionProps) => {
   const bgStyles = {
      white: 'bg-white dark:bg-secondary-950',
      gray: 'bg-neutral-50 dark:bg-secondary-900',
      dark: 'bg-secondary-950 text-white',
      glass: 'glass-card', // Using glass-card from index.css
      gradient: 'bg-gradient-to-br from-secondary-900 to-secondary-950 text-white',
   };

   const Content = (
      <div className={cn('container-custom', containerClassName)}>
         {children}
      </div>
   );

   return (
      <section
         id={id}
         className={cn('section-padding relative overflow-hidden', bgStyles[background], className)}
      >
         {/* Background Decorative Mesh for Modern feel */}
         {background === 'dark' && (
            <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />
         )}

         {withMotion ? (
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
               transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
               {Content}
            </motion.div>
         ) : (
            Content
         )}
      </section>
   );
};

export default Section;
