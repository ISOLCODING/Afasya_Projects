import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
   title: string;
   subtitle?: string;
   description?: string;
   align?: 'left' | 'center';
   className?: string;
   light?: boolean;
}

const SectionHeader = ({
   title,
   subtitle,
   description,
   align = 'center',
   className,
   light = false,
}: SectionHeaderProps) => {
   return (
      <div
         className={cn(
            'max-w-3xl mb-16',
            align === 'center' ? 'mx-auto text-center' : 'text-left',
            className
         )}
      >
         {subtitle && (
            <motion.span
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className={cn(
                  'inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4',
                  light ? 'bg-white/10 text-primary-300' : 'bg-primary-50 text-primary-600'
               )}
            >
               {subtitle}
            </motion.span>
         )}

         <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={cn(
               'text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-6 leading-tight',
               light ? 'text-white' : 'text-secondary-900'
            )}
         >
            {title}
         </motion.h2>

         {description && (
            <motion.p
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className={cn(
                  'text-lg leading-relaxed',
                  light ? 'text-secondary-300' : 'text-secondary-600'
               )}
            >
               {description}
            </motion.p>
         )}
      </div>
   );
};

export default SectionHeader;
