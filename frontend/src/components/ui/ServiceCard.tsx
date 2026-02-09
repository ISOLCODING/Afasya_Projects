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
   startingPrice?: number | string;
   deliveryTime?: string;
}

const ServiceCard = ({ title, description, icon: Icon, slug, image, index, startingPrice, deliveryTime }: ServiceCardProps) => {
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
         className="group relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl overflow-hidden rounded-[40px] border border-neutral-200/50 dark:border-white/10 hover:border-primary-500/50 transition-all duration-500 cursor-pointer hover:shadow-[0_20px_50px_rgba(8,112,184,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
         {/* Premium Glow Effect on Hover */}
         <div className="absolute inset-0 bg-linear-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
         <div className="absolute -inset-full bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />

         <div
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10 p-10 flex flex-col h-full"
         >
            <div className="w-16 h-16 bg-linear-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary-400 mb-8 border border-white/10 group-hover:bg-linear-to-br group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl">
               <Icon className="w-8 h-8" />
            </div>

            <h3
               className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
               dangerouslySetInnerHTML={{ __html: title }}
            />

            <p
               className="text-secondary-600 dark:text-neutral-400 text-sm leading-relaxed mb-8 grow line-clamp-3"
               dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="flex flex-col gap-4 mb-10">
               <div className="flex items-center justify-between p-4 rounded-[20px] bg-white/50 dark:bg-white/5 border border-primary-500/10 backdrop-blur-sm">
                  <div className="flex flex-col">
                     <span className="text-[10px] text-secondary-500 dark:text-secondary-400 uppercase tracking-widest font-bold mb-1">Mulai Dari</span>
                     <span className="text-xl font-black text-secondary-900 dark:text-white">
                        {startingPrice ? `Rp ${new Intl.NumberFormat('id-ID').format(Number(startingPrice))}` : 'Harga Kompetitif'}
                     </span>
                  </div>
                  {deliveryTime && (
                     <div className="text-right">
                        <span className="text-[10px] text-secondary-500 dark:text-secondary-400 uppercase tracking-widest font-bold mb-1 block">Waktu</span>
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{deliveryTime}</span>
                     </div>
                  )}
               </div>
            </div>

            <Link
               to={`/services/${slug}`}
               className="inline-flex items-center gap-2 bg-secondary-900 dark:bg-white text-white dark:text-secondary-950 px-6 py-3 rounded-2xl font-bold text-sm tracking-wider uppercase group-hover:gap-4 transition-all w-fit shadow-lg shadow-black/10"
            >
               Pelajari Detail
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
