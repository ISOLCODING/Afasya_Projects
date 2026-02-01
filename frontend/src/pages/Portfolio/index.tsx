import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import PortfolioCard from '@/components/ui/PortfolioCard';
import { getPortfolios, getPage } from '@/lib/api';
import ContentBlocks from '@/components/sections/ContentBlocks';

const PortfolioPage = () => {
   const [activeCategory, setActiveCategory] = useState('Semua');

   const {
      data: pageResponse,
      isLoading: isPageLoading
   } = useQuery({
      queryKey: ['page', 'portfolio'],
      queryFn: () => getPage('portfolio'),
      retry: false,
   });

   const {
      data: portfoliosResponse,
      isLoading: isPortfoliosLoading,
      error
   } = useQuery({
      queryKey: ['all-portfolios'],
      queryFn: () => getPortfolios(),
   });

   const pageData = pageResponse?.success ? pageResponse.data : null;
   const portfolios = portfoliosResponse?.success ? portfoliosResponse.data : [];

   const dynamicCategories = ['Semua', ...new Set(portfolios.map((p: any) => p.category))].filter(Boolean) as string[];

   const filteredPortfolios = portfolios.filter((p: any) =>
      activeCategory === 'Semua' || p.category === activeCategory
   );

   const isLoading = isPageLoading || isPortfoliosLoading;

   if (error) {
      return (
         <PageLayout>
            <div className="pt-48 pb-24 text-center">
               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <h2 className="text-3xl font-display font-bold text-secondary-900 mb-4">Gagal Memuat Portfolio</h2>
               <p className="text-secondary-600 max-w-md mx-auto mb-8">Terjadi kesalahan saat mengambil data dari server. Silakan muat ulang halaman atau hubungi dukungan.</p>
               <button onClick={() => window.location.reload()} className="btn btn-secondary px-8">Muat Ulang</button>
            </div>
         </PageLayout>
      );
   }

   return (
      <PageLayout>
         {pageData?.content && Array.isArray(pageData.content) ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
            <div className="min-h-screen">
               <section className="pt-48 pb-32 bg-secondary-900 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] -ml-64 -mt-64" />
                  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-900/10 rounded-full blur-[120px] -mr-32 -mb-32" />
                  
                  <div className="container-custom relative z-10">
                     <div className="max-w-4xl">
                        <motion.div
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-[0.3em] mb-8"
                        >
                           {pageData?.subtitle || "Selected Works"}
                        </motion.div>
                        
                        <motion.h1
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 }}
                           className="text-4xl md:text-6xl lg:text-8xl font-display font-extrabold text-white mb-8 leading-[0.9] tracking-tight"
                        >
                           {pageData?.title?.split(' ').map((word: string, i: number) => 
                              word.toLowerCase() === 'digital' ? <span key={i} className="text-primary-500">{word} </span> : word + ' '
                           ) || "Showcase Portofolio Digital"}
                        </motion.h1>
                        
                        <motion.p
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                           className="text-lg md:text-xl text-secondary-300 max-w-2xl leading-relaxed"
                        >
                           {pageData?.description || "Kami melampaui batas kreatif untuk menghasilkan solusi digital yang tidak hanya indah secara visual, tetapi juga berdampak nyata bagi pertumbuhan bisnis Anda."}
                        </motion.p>
                     </div>
                  </div>
               </section>

               <Section background="white" className="-mt-16 pb-32">
                  <div className="container-custom">
                     {!isLoading && dynamicCategories.length > 1 && (
                        <div className="relative z-20 mb-20 pointer-events-auto">
                           <div className="flex flex-wrap justify-center items-center gap-2 p-3 bg-white/80 backdrop-blur-xl border border-secondary-100 rounded-[32px] shadow-2xl shadow-secondary-900/5 max-w-4xl mx-auto">
                              {dynamicCategories.map((cat) => (
                                 <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3.5 rounded-[20px] text-sm font-bold tracking-wide transition-all duration-500 ${activeCategory === cat
                                       ? 'bg-secondary-900 text-white shadow-xl shadow-secondary-900/20'
                                       : 'text-secondary-500 hover:text-secondary-900 hover:bg-secondary-50'
                                       }`}
                                 >
                                    {cat}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}

                     <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                     >
                        <AnimatePresence mode='popLayout'>
                           {isLoading ? (
                              Array(6).fill(0).map((_, i) => (
                                 <motion.div 
                                    key={`loader-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="aspect-[3/4] bg-secondary-50 rounded-[48px] animate-pulse overflow-hidden relative"
                                 >
                                    <div className="absolute bottom-8 left-8 right-8 space-y-4">
                                       <div className="h-4 w-24 bg-secondary-200 rounded-full" />
                                       <div className="h-8 w-full bg-secondary-200 rounded-2xl" />
                                    </div>
                                 </motion.div>
                              ))
                           ) : (
                              filteredPortfolios.map((item: any, idx: number) => (
                                 <PortfolioCard
                                    key={item.uuid || item.slug || idx}
                                    title={item.title}
                                    category={item.category}
                                    image={item.featured_image}
                                    slug={item.slug}
                                    index={idx}
                                 />
                              ))
                           )}
                        </AnimatePresence>
                     </motion.div>

                     {!isLoading && filteredPortfolios.length === 0 && (
                        <motion.div 
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           className="text-center py-40 bg-secondary-50 rounded-[64px] border border-dashed border-secondary-200"
                        >
                           <div className="text-8xl mb-8 grayscale">📂</div>
                           <h3 className="text-3xl font-display font-bold text-secondary-900 mb-4">
                              Tidak Ada Proyek Tersedia
                           </h3>
                           <p className="text-lg text-secondary-500 max-w-sm mx-auto">
                              Maaf, kami belum memiliki portofolio untuk kategori {activeCategory} saat ini.
                           </p>
                        </motion.div>
                     )}
                  </div>
               </Section>

               <Section className="pb-32">
                  <div className="container-custom">
                     <div className="relative rounded-[64px] bg-primary-600 p-12 md:p-24 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500 rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-700 rounded-full blur-[80px] -ml-32 -mb-32" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                           <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-8 leading-tight">
                              Siap Memulai <br className="hidden md:block" /> Proyek Impian Anda?
                           </h2>
                           <p className="text-xl text-primary-100 mb-12 opacity-90 leading-relaxed">
                              Jangan biarkan ide hebat Anda hanya menjadi angan-angan. 
                              Mari kita bangun kehadiran digital yang luar biasa bersama Afasya Project.
                           </p>
                           <Link 
                              to="/contact" 
                              className="btn bg-white text-primary-600 hover:bg-secondary-900 hover:text-white px-12 h-20 text-xl font-bold rounded-[24px] shadow-2xl shadow-primary-900/20 transition-all duration-500"
                           >
                              Mulai Konsultasi Gratis
                           </Link>
                        </div>
                     </div>
                  </div>
               </Section>
            </div>
         )}
      </PageLayout>
   );
};

export default PortfolioPage;
