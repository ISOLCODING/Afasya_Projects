import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

interface ServiceCardProps {
   title: string;
   description: string;
   icon: LucideIcon;
   slug: string;
   image?: string;
   index: number;
}

const ServiceCard = ({ title, description, icon: Icon, slug, image, index }: ServiceCardProps) => {
   const x = useMotionValue(0);
   const y = useMotionValue(0);

   const mouseXSpring = useSpring(x);
   const mouseYSpring = useSpring(y);

   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
   };

   const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
   };

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
         }}
         className="group relative bg-linear-to-br from-white to-primary-50 dark:from-primary-900 dark:to-primary-950 overflow-hidden rounded-[32px] border border-primary-100 dark:border-white/5 hover:border-primary-500/30 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-primary-500/20"
      >
         {/* Gradient Background */}
         < div className="absolute inset-0 bg-linear-to-br from-primary-600/10 via-secondary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

         <div
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10 p-8 flex flex-col h-full"
         >
            <div className="w-16 h-16 bg-linear-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary-400 mb-8 border border-white/10 group-hover:bg-linear-to-br group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl">
               <Icon className="w-8 h-8" />
            </div>

            <h3
               className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
               dangerouslySetInnerHTML={{ __html: title }}
            />

            <p
               className="text-secondary-600 dark:text-neutral-400 text-sm leading-relaxed mb-10 grow"
               dangerouslySetInnerHTML={{ __html: description }}
            />

            <Link
               to={`/services/${slug}`}
               className="inline-flex items-center gap-2 text-primary-400 font-bold text-sm tracking-wider uppercase group-hover:gap-4 transition-all"
            >
               Pelajari Lebih
               <ArrowRight className="w-4 h-4" />
            </Link>
         </div>

         {/* Decorative elements */}
         <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl group-hover:bg-primary-600/20 transition-all duration-700" />
         <div className="absolute -left-10 -top-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl group-hover:bg-secondary-500/20 transition-all duration-700" />

         {image && (
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
               <img src={image} alt={title} className="w-full h-full object-cover grayscale" />
            </div>
         )}
      </motion.div>
   );
};

export default ServiceCard;
