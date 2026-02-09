// src/components/ui/PointerGlow.tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const PointerGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                left: springX,
                top: springY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed pointer-events-none z-[9999] w-[400px] h-[400px] bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-[100px] mix-blend-soft-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        />
    );
};

export default PointerGlow;
