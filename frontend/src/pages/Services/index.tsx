import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Layout, Search, Shield, Zap, Sparkles } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import { getServices, getPage } from '@/lib/api';
import ContentBlocks from '@/components/sections/ContentBlocks';
import { getServiceIcon } from '@/lib/icons';
import ServiceTypeShowcase from '@/components/services/ServiceTypeShowcase';
import ServiceDetailsTabs from '@/components/services/ServiceDetailsTabs';

const ServicesPage = () => {
   const { data: pageData } = useQuery({
      queryKey: ['page', 'services'],
      queryFn: () => getPage('services').then(res => res.data),
      retry: false,
   });

   const { data: services, isLoading } = useQuery({
      queryKey: ['all-services'],
      queryFn: () => getServices().then(res => res.data),
   });

   return (
      <PageLayout>
         {pageData?.content && Array.isArray(pageData.content) ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
            <>
                   {/* Enhanced Hero Section */}
                   <section className="pt-48 pb-32 bg-secondary-950 overflow-hidden relative min-h-[70vh] flex items-center">
                      {/* Animated background blobs */}
                      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[160px] animate-pulse-glow" />
                      <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-accent-600/5 rounded-full blur-[140px]" />
                      <div className="absolute inset-0 bg-grid-tech opacity-10" />

                      <div className="container-custom relative z-10">
                         <div className="max-w-4xl">
                            <motion.div
                               initial={{ opacity: 0, y: 30 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-8"
                            >
                               <Sparkles size={14} className="fill-primary-400" />
                               <span>Layanan Profesional & High-End</span>
                            </motion.div>

                            <motion.h1
                               initial={{ opacity: 0, y: 30 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.1 }}
                               className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 leading-[1.05] tracking-tight"
                            >
                               Solusi Digital yang <span className="text-primary-500 drop-shadow-glow">Elevate</span> Bisnis Anda
                            </motion.h1>

                            <motion.p
                               initial={{ opacity: 0, y: 30 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.2 }}
                               className="text-xl md:text-2xl text-secondary-400 max-w-2xl leading-relaxed mb-12"
                            >
                               Kami membantu brand membangun keberadaan digital yang kuat melalui desain premium dan teknologi mutakhir. Bukan sekadar website, tapi mesin pertumbuhan bisnis.
                            </motion.p>
                         </div>
                      </div>
                   </section>

                   {/* Image 1 Style: Service Types Selection */}
                   <Section background="white" className="pt-0 -mt-20 relative z-20">
                      <ServiceTypeShowcase services={services || []} />
                   </Section>

                   {/* Image 3 Style: Detailed Interactive Sections */}
                   <Section background="gray" className="relative group/tabs">
                      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent pointer-events-none" />
                      <SectionHeader
                         align="center"
                         subtitle="Analisis Mendalam"
                         title="Detail & Spesifikasi Layanan"
                         description="Pahami setiap aspek teknis dan visual yang kami berikan untuk setiap proyek Anda."
                         className="mb-16"
                      />
                      <div className="relative z-10">
                         <ServiceDetailsTabs services={services || []} />
                      </div>
                   </Section>

                   {/* Classic Services Grid (Fallback for quick view) */}
                   <Section background="white">
                      <SectionHeader
                         align="left"
                         subtitle="Katalog Lengkap"
                         title="Semua Paket Layanan"
                         description="Pilih paket yang sesuai dengan budget dan target pasar bisnis Anda saat ini."
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                         {isLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                   <div key={i} className="h-[420px] bg-white dark:bg-white/5 rounded-[40px] animate-pulse shadow-sm border border-secondary-100 dark:border-white/10" />
                                ))
                         ) : (
                            (services || []).map((service: any, idx: number) => (
                               <ServiceCard
                                  key={service.slug}
                                  title={service.name}
                                  description={service.short_description}
                                      icon={getServiceIcon(service.name, service.icon)}
                                      slug={service.slug}
                                      index={idx}
                                      startingPrice={service.starting_price || service.price_min}
                                      deliveryTime={service.delivery_time}
                                   />
                                ))
                         )}
                      </div>
                   </Section>

                   {/* Why Us Section (Enhanced) */}
                   <Section background="dark" className="overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -z-10" />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                         <div>
                            <SectionHeader
                               light
                               align="left"
                               subtitle="Eksklusif & Berkelas"
                               title="Standar Kualitas Premium"
                               description="Kami menggabungkan seni desain dan ketajaman teknologi untuk hasil yang tidak tertandingi."
                               className="mb-12"
                            />

                            <ul className="space-y-6">
                               {[
                                  { title: 'Performa Tanpa Kompromi', desc: 'Beban halaman super cepat dengan optimasi level tinggi.', icon: Zap },
                                  { title: 'SEO Architecture', desc: 'Struktur kode yang dirancang khusus untuk algoritma Google terbaru.', icon: Search },
                                  { title: 'Bespoke Design', desc: 'Setiap pixel dirancang unik, mencerminkan eksklusivitas brand Anda.', icon: Layout },
                                  { title: 'Industrial Grade Security', desc: 'Standar keamanan server dan enkripsi data tingkat tinggi.', icon: Shield },
                               ].map((item, i) => (
                                       <motion.li
                                          key={i}
                                          initial={{ opacity: 0, x: -20 }}
                                          whileInView={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.1 }}
                                          className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                                       >
                                          <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 border border-primary-500/20 shadow-glow group-hover:scale-110 transition-transform">
                                             <item.icon className="w-7 h-7" />
                                          </div>
                                          <div>
                                             <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                             <p className="text-secondary-400 leading-relaxed font-medium">{item.desc}</p>
                                          </div>
                                       </motion.li>
                                    ))}
                            </ul>
                         </div>
                         <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1 }}
                            className="relative lg:mt-20"
                         >
                            <div className="absolute -inset-1 bg-linear-to-r from-primary-500 to-accent-600 rounded-[50px] blur opacity-30 animate-pulse" />
                            <div className="relative rounded-[48px] overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl">
                               <img
                                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070"
                                  alt="High-end workstation"
                                  className="w-full h-auto object-cover opacity-80"
                               />
                               <div className="absolute inset-0 bg-linear-to-t from-secondary-950 to-transparent" />
                               <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                  <p className="text-white text-lg font-medium italic">
                                     "Desain adalah kecerdasan yang dibuat terlihat."
                                  </p>
                               </div>
                            </div>
                         </motion.div>
                   </div>
                </Section>
             </>
          )}
       </PageLayout>
    );
};

export default ServicesPage;
