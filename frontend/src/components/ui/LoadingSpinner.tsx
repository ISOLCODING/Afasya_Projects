import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
   message?: string;
   size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) => {
   const sizeClasses = {
      sm: 'w-6 h-6 border-2',
      md: 'w-10 h-10 border-3',
      lg: 'w-16 h-16 border-4',
   };

   return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
         <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className={`${sizeClasses[size]} rounded-full border-primary-100 border-t-primary-600`}
         />
         {message && (
            <p className="text-secondary-500 font-medium animate-pulse">{message}</p>
         )}
      </div>
   );
};

export default LoadingSpinner;
