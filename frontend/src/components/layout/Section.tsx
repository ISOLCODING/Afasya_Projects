import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps {
   children: ReactNode;
   className?: string;
   containerClassName?: string;
   id?: string;
   background?: 'white' | 'gray' | 'dark' | 'gradient';
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
      white: 'bg-white',
      gray: 'bg-secondary-50',
      dark: 'bg-secondary-900 text-white',
      gradient: 'bg-gradient-to-b from-primary-50 to-white',
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
         {withMotion ? (
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-100px' }}
               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
