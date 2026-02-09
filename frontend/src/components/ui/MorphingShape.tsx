import { motion } from 'framer-motion';

interface MorphingShapeProps {
   className?: string;
   color?: string;
   size?: number;
   duration?: number;
}

const MorphingShape = ({ 
   className = '',
   color = '#0ea5e9',
   size = 400,
   duration = 8
}: MorphingShapeProps) => {
   
   const shapes = [
      "M 200,50 Q 350,50 350,200 Q 350,350 200,350 Q 50,350 50,200 Q 50,50 200,50",
      "M 200,50 Q 300,100 320,200 Q 300,300 200,350 Q 100,300 80,200 Q 100,100 200,50",
      "M 200,50 Q 380,100 360,240 Q 340,380 200,350 Q 60,320 40,180 Q 60,40 200,50",
      "M 200,50 Q 330,80 350,200 Q 320,320 200,350 Q 80,320 50,200 Q 70,80 200,50",
   ];

   return (
      <motion.svg
         width={size}
         height={size}
         viewBox="0 0 400 400"
         className={className}
         style={{ filter: 'blur(40px)' }}
      >
         <motion.path
            d={shapes[0]}
            fill={color}
            opacity={0.4}
            animate={{
               d: shapes,
            }}
            transition={{
               duration,
               repeat: Infinity,
               ease: "easeInOut",
               repeatType: "reverse"
            }}
         />
      </motion.svg>
   );
};

export default MorphingShape;
