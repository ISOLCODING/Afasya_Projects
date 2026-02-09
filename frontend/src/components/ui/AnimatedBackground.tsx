import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
   variant?: 'gradient' | 'mesh' | 'dots';
   className?: string;
   colors?: string[];
}

const AnimatedBackground = ({ 
   variant = 'gradient',
   className = '',
   colors = ['#0ea5e9', '#ec4899', '#8b5cf6']
}: AnimatedBackgroundProps) => {

   if (variant === 'gradient') {
      return (
         <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <motion.div
               className="absolute -inset-full opacity-30"
               style={{
                  background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
               }}
               animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
               }}
               transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
               }}
            />
            <motion.div
               className="absolute -inset-full opacity-20"
               style={{
                  background: `radial-gradient(circle, ${colors[1]}, transparent 70%)`,
               }}
               animate={{
                  x: ['-25%', '25%', '-25%'],
                  y: ['-25%', '25%', '-25%'],
                  scale: [1, 1.3, 1],
               }}
               transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
               }}
            />
         </div>
      );
   }

   if (variant === 'mesh') {
      return (
         <div className={`absolute inset-0 ${className}`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBmZjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <motion.div
               className="absolute inset-0"
               style={{
                  background: `radial-gradient(circle at 50% 50%, ${colors[0]}22, transparent 50%)`,
               }}
               animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
               }}
               transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
               }}
            />
         </div>
      );
   }

   // dots variant
   return (
      <div className={`absolute inset-0 ${className}`}>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-size-[40px_40px]" />
      </div>
   );
};

export default AnimatedBackground;
