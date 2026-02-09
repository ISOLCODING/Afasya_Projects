import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface StaggerChildrenProps {
   children: ReactNode;
   className?: string;
   staggerDelay?: number;
   initialDelay?: number;
   direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
   distance?: number;
}

const StaggerChildren = ({ 
   children, 
   className = '',
   staggerDelay = 0.1,
   initialDelay = 0,
   direction = 'up',
   distance = 30
}: StaggerChildrenProps) => {
   
   const getInitialPosition = () => {
      switch (direction) {
         case 'up': return { opacity: 0, y: distance };
         case 'down': return { opacity: 0, y: -distance };
         case 'left': return { opacity: 0, x: distance };
         case 'right': return { opacity: 0, x: -distance };
         case 'fade': return { opacity: 0 };
         default: return { opacity: 0, y: distance };
      }
   };

   const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            delayChildren: initialDelay,
            staggerChildren: staggerDelay,
         }
      }
   };

   const itemVariants: Variants = {
      hidden: getInitialPosition(),
      visible: {
         opacity: 1,
         x: 0,
         y: 0,
         transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
         }
      }
   };

   return (
      <motion.div
         className={className}
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.2 }}
      >
         {Array.isArray(children) ? (
            children.map((child, index) => (
               <motion.div key={index} variants={itemVariants}>
                  {child}
               </motion.div>
            ))
         ) : (
            <motion.div variants={itemVariants}>
               {children}
            </motion.div>
         )}
      </motion.div>
   );
};

export default StaggerChildren;
