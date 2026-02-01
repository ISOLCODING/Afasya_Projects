import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
   year: string;
   title: string;
   description: string;
   isLeft?: boolean;
   index: number;
}

const TimelineItem = ({ year, title, description, isLeft, index }: TimelineItemProps) => {
   return (
      <div className={cn(
         "mb-12 flex justify-between items-center w-full",
         isLeft ? "flex-row-reverse" : "flex-row"
      )}>
         <div className="hidden md:block w-5/12" />

         <div className="z-20 flex items-center order-1 bg-primary-600 shadow-xl w-10 h-10 rounded-full border-4 border-secondary-900 group-hover:scale-125 transition-transform duration-300">
            <h1 className="mx-auto font-semibold text-lg text-white" />
         </div>

         <motion.div
            initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
               "order-1 bg-secondary-800/50 backdrop-blur-xl border border-white/5 rounded-[32px] shadow-xl w-full md:w-5/12 px-8 py-8 hover:border-primary-500/30 transition-colors",
               isLeft ? "text-right" : "text-left"
            )}
         >
            <span className="text-primary-400 font-black text-xl mb-2 block">{year}</span>
            <h3 className="mb-3 font-display font-bold text-white text-2xl">{title}</h3>
            <p className="text-sm leading-relaxed text-secondary-400">{description}</p>
         </motion.div>
      </div>
   );
};

export const InteractiveTimeline = ({ items }: { items: { year: string; title: string; description: string }[] }) => {
   return (
      <div className="relative container mx-auto px-6">
         {/* Vertical line */}
         <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-600 via-accent-500 to-transparent opacity-20" />

         <div className="space-y-4">
            {items.map((item, idx) => (
               <TimelineItem
                  key={idx}
                  index={idx}
                  {...item}
                  isLeft={idx % 2 === 0}
               />
            ))}
         </div>
      </div>
   );
};

export default InteractiveTimeline;
