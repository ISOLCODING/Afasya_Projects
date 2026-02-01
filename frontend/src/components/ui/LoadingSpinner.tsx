import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
   message?: string;
   size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) => {
   const sizeClasses = {
      sm: 'w-8 h-8 border-2',
      md: 'w-12 h-12 border-3',
      lg: 'w-20 h-20 border-4',
   };

   return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6">
         <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className={`${sizeClasses[size]} rounded-full border-neutral-100 dark:border-white/5 border-t-primary-600 dark:border-t-primary-400 shadow-[0_0_20px_rgba(13,139,242,0.15)]`}
         />
         {message && (
            <p className="text-neutral-500 dark:text-neutral-400 font-display font-medium text-sm tracking-widest uppercase animate-pulse">
               {message}
            </p>
         )}
      </div>
   );
};

export default LoadingSpinner;
