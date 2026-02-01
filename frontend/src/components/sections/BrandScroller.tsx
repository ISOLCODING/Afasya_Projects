import { motion } from 'framer-motion';
import { Play, Pause, Info } from 'lucide-react';
import type { Brand } from '../../lib/api/services/brand';
import { getBrands } from '../../lib/api/services/brand';
import { getStorageUrl, cn } from '../../lib/utils';
import BrandModal from '../ui/BrandModal';
import { useState, useEffect } from 'react';

interface BrandScrollerProps {
   title?: string;
   subtitle?: string;
   description?: string;
   className?: string;
}

const BrandScroller: React.FC<BrandScrollerProps> = ({
   title = "Partner Collaboration",
   subtitle = "Dipercaya Oleh Brand Ternama",
   description = "Kami bangga bekerja sama dengan perusahaan-perusahaan inovatif untuk menghadirkan solusi digital terbaik.",
   className
}) => {
   const [brands, setBrands] = useState<Brand[]>([]);
   const [loading, setLoading] = useState(true);
   const [isPlaying, setIsPlaying] = useState(true);
   const [speed, setSpeed] = useState<number>(30); // Base duration in seconds
   const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const defaultBrands: Brand[] = [
      { id: 1, name: 'BrandOne', logo_url: 'logo1.svg', is_active: true, sort_order: 1, created_at: '', updated_at: '' },
      { id: 2, name: 'BrandTwo', logo_url: 'logo2.svg', is_active: true, sort_order: 2, created_at: '', updated_at: '' },
      { id: 3, name: 'BrandThree', logo_url: 'logo3.svg', is_active: true, sort_order: 3, created_at: '', updated_at: '' },
      { id: 4, name: 'BrandFour', logo_url: 'logo4.svg', is_active: true, sort_order: 4, created_at: '', updated_at: '' },
      { id: 5, name: 'BrandFive', logo_url: 'logo5.svg', is_active: true, sort_order: 5, created_at: '', updated_at: '' },
      { id: 6, name: 'BrandSix', logo_url: 'logo6.svg', is_active: true, sort_order: 6, created_at: '', updated_at: '' },
   ];

   useEffect(() => {
      const fetchBrands = async () => {
         try {
            const response = await getBrands();
            if (response.success && response.data.length > 0) {
               setBrands(response.data);
            } else {
               // Use placeholders with better looking URLs if empty
               setBrands(defaultBrands.map((b, i) => ({
                  ...b,
                  logo_url: `https://api.dicebear.com/7.x/initials/svg?seed=${b.name}&backgroundColor=0ea5e9&fontFamily=Arial&fontWeight=bold`
               })));
            }
         } catch (error) {
            console.error("Error fetching brands", error);
         } finally {
            setLoading(false);
         }
      };
      fetchBrands();
   }, []);

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.code === 'Space') {
            const target = e.target as HTMLElement;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
               e.preventDefault();
               setIsPlaying(prev => !prev);
            }
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, []);

   if (loading) return (
      <div className="py-20 flex justify-center">
         <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
   );

   const repeatedBrands = [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];

   const handleBrandClick = (brand: Brand) => {
      setSelectedBrand(brand);
      setIsModalOpen(true);
   };

   const speedOptions = [
      { label: 'Slow', value: 60 },
      { label: 'Normal', value: 30 },
      { label: 'Fast', value: 15 },
   ];

   return (
      <section className={cn("py-28 bg-white dark:bg-secondary-900/10 backdrop-blur-sm overflow-hidden relative group/section border-y border-white/5", className)}>
         {/* Background Decorative Elements */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px] pointer-events-none" />

         <div className="container-custom relative z-10 mb-20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
               <div className="max-w-3xl">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="flex items-center gap-3 mb-8"
                   >
                     <span className="h-px w-10 bg-primary-500" />
                     <span className="text-primary-600 dark:text-primary-400 text-sm font-black uppercase tracking-[0.3em]">
                        {title}
                     </span>
                  </motion.div>
                  
                  <motion.h2
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-4xl md:text-6xl font-display font-black text-neutral-950 dark:text-white mb-8 leading-[1.1] tracking-tight"
                  >
                     {subtitle}
                  </motion.h2>
                  
                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="text-neutral-600 dark:text-neutral-400 text-xl max-w-2xl leading-relaxed"
                  >
                     {description}
                  </motion.p>
               </div>

               {/* Controls Panel - Ultra Modern Pill */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 bg-neutral-50/50 dark:bg-secondary-900/40 backdrop-blur-2xl rounded-[32px] border border-neutral-200/50 dark:border-white/10 shadow-premium self-start lg:self-center"
               >
                  <button
                     onClick={() => setIsPlaying(!isPlaying)}
                     className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
                        isPlaying 
                           ? "bg-primary-600 text-white shadow-glow ring-4 ring-primary-500/10"
                           : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                     )}
                  >
                     {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>

                  <div className="flex bg-white/50 dark:bg-white/5 rounded-full p-1.5" role="group">
                     {speedOptions.map((opt) => (
                        <button
                           key={opt.label}
                           onClick={() => setSpeed(opt.value)}
                           className={cn(
                              "px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-500",
                              speed === opt.value
                                 ? "bg-white dark:bg-white/10 text-primary-600 dark:text-primary-400 shadow-md"
                                 : "text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                           )}
                        >
                           {opt.label}
                        </button>
                     ))}
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Marquee Container */}
         <div className="relative flex overflow-x-hidden py-24">
            <div
               className={`flex whitespace-nowrap py-4 items-center ${isPlaying ? 'animate-marquee' : ''
                  }`}
               style={{
                  animationDuration: `${speed}s`,
                  animationPlayState: isPlaying ? 'running' : 'paused'
               }}
            >
               {repeatedBrands.map((brand, index) => (
                  <motion.div
                     key={`${brand.id}-${index}`}
                     whileHover={{ scale: 1.05, y: -10 }}
                     onClick={() => handleBrandClick(brand)}
                     className="mx-12 flex flex-col items-center justify-center cursor-pointer group"
                  >
                     <div className="relative w-40 h-24 md:w-56 md:h-32 flex items-center justify-center p-8 rounded-[32px] bg-neutral-50 dark:bg-white/5 border border-neutral-200/50 dark:border-white/5 transition-all duration-500 group-hover:bg-white dark:group-hover:bg-white/10 group-hover:border-primary-500/30 group-hover:shadow-[0_20px_50px_rgba(13,139,242,0.15)] overflow-hidden">
                        {/* Interactive Background Shine */}
                        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <img
                           src={getStorageUrl(brand.logo_url)}
                           alt={brand.name}
                           className="h-10 md:h-12 w-auto object-contain transition-all duration-700 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                           onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x50?text=' + brand.name;
                           }}
                        />

                        {/* Floating Info Icon */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                           <div className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30">
                              <Info size={12} strokeWidth={3} />
                           </div>
                        </div>
                     </div>
                     <span className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        {brand.name}
                     </span>
                  </motion.div>
               ))}
            </div>

            {/* Gradient Overlays - Deep Edge Shadows */}
            <div className="absolute inset-y-0 left-0 w-40 md:w-80 bg-linear-to-r from-white dark:from-secondary-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 md:w-80 bg-linear-to-l from-white dark:from-secondary-950 to-transparent z-10 pointer-events-none" />
         </div>

         <BrandModal
            brand={selectedBrand}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
         />

         <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
      </section>
   );
};

export default BrandScroller;
