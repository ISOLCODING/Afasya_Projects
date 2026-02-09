// src/components/ui/PortfolioCard.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStorageUrl } from '@/lib/utils';

interface PortfolioCardProps {
   title: string;
   category: string;
   image: string;
   slug: string;
   index: number;
}

const PortfolioCard = ({ title, category, image, slug, index }: PortfolioCardProps) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6, delay: index * 0.1 }}
         className="group relative bg-neutral-900 aspect-4/5 md:aspect-3/4 overflow-hidden rounded-[40px] shadow-2xl transition-all duration-700 hover:shadow-primary-500/20 border border-white/10 hover:border-white/30"
      >
         {/* Premium Glow Effect on Hover */}
         <div className="absolute inset-0 bg-linear-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
         <div className="absolute -inset-full bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
         <div className="absolute inset-0 z-10 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
         <Link to={`/portfolio/${slug}`} className="absolute inset-0 z-20" aria-label={`View ${title}`} />

         <motion.img
            src={getStorageUrl(image)}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-all duration-700"
            whileHover={{ scale: 1.1 }}
         />

         {/* Overlay Gradient - More subtle and professional */}
         <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/40 to-transparent opacity-90" />

         {/* Top Info Tag */}
         <div className="absolute top-6 left-6 z-10">
            <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em]">
               {category}
            </div>
         </div>

         {/* Content */}
         <div className="absolute bottom-0 left-0 right-0 p-8 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3
               className="text-2xl md:text-3xl font-display font-extrabold text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary-400 transition-colors"
               dangerouslySetInnerHTML={{ __html: title }}
            />

            <div className="flex items-center gap-2 text-primary-400 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 delay-100">
               Lihat Detail <ArrowRight className="w-5 h-5" />
            </div>
         </div>

         {/* Decorative elements for 'luxury' feel */}
         <div className="absolute inset-0 border border-white/10 rounded-[40px] z-30 pointer-events-none group-hover:border-primary-500/50 transition-colors duration-500" />
      </motion.div>
   );
};

export default PortfolioCard;
