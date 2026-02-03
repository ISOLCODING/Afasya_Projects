// src/components/sections/BrandScroller.tsx
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import type { Brand } from '@/lib/api/services/brand';
import { getStorageUrl, cn } from '@/lib/utils';
import { LogoCarousel } from '../ui/logo-carousel';

interface BrandScrollerProps {
   brands: Brand[];
   isLoading?: boolean;
   error?: any;
   title?: string;
   subtitle?: string;
   description?: string;
   className?: string;
}

const BrandScroller: React.FC<BrandScrollerProps> = ({
   brands = [],
   isLoading = false,
   error = null,
   title = "Partner Collaboration",
   subtitle = "Dipercaya Oleh Brand Ternama",
   description = "Kami bangga bekerja sama dengan perusahaan-perusahaan inovatif untuk menghadirkan solusi digital terbaik.",
   className
}) => {
   // Filter active brands only
   const activeBrands = brands.filter(brand => brand.is_active);

   // Handle empty state
   if (isLoading) {
      return (
         <section className="py-28 bg-linear-to-br from-neutral-50 via-white to-neutral-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
            <div className="container-custom">
               <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                     <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                     <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary-500" />
                  </div>
                  <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium">Memuat partner kami...</p>
               </div>
            </div>
         </section>
      );
   }

   if (error) {
      return (
         <section className="py-20">
            <div className="container-custom text-center">
               <p className="text-neutral-500">Gagal memuat data partner</p>
            </div>
         </section>
      );
   }

   if (!activeBrands || activeBrands.length === 0) {
      return null; // Don't render anything if no brands
   }

   // Map brands to Logo format expected by LogoCarousel
   const logos = activeBrands.map(brand => ({
      id: brand.id,
      name: brand.name,
      src: getStorageUrl(brand.logo_url)
   }));

   return (
      <section className={cn(
         "py-28 bg-linear-to-br from-neutral-50 via-white to-neutral-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 overflow-hidden relative",
         className
      )}>
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

         {/* Header Section */}
         <div className="container-custom relative z-10 mb-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
               {/* Left: Title & Description */}
               <div className="max-w-3xl">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="flex items-center gap-4 mb-6"
                  >
                     <span className="h-px w-12 bg-linear-to-r from-primary-500 to-transparent" />
                     <span className="text-primary-600 dark:text-primary-400 text-sm font-black uppercase tracking-[0.3em]">
                        {title}
                     </span>
                  </motion.div>

                  <motion.h2
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-neutral-950 dark:text-white mb-6 leading-[1.1] tracking-tight"
                  >
                     {subtitle}
                  </motion.h2>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed"
                  >
                     {description}
                  </motion.p>
               </div>

               {/* Right: Stats (Optional) */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="hidden lg:flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-white/10"
               >
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                     <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                     <div className="text-2xl font-black text-neutral-950 dark:text-white">{activeBrands.length}+</div>
                     <div className="text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider">Trusted Partners</div>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Logo Carousel */}
         <div className="container-custom relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="rounded-[3rem] bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 p-8 md:p-12 shadow-xl shadow-neutral-200/20 dark:shadow-black/20"
            >
               <LogoCarousel logos={logos} columns={logos.length > 4 ? 4 : logos.length} />
            </motion.div>
         </div>
      </section>
   );
};

export default BrandScroller;