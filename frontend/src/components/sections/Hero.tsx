import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Zap, Users, Award, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '@/components/ui/Particles';
import { getWhatsAppLink, getConsultationMessage } from '@/lib/whatsapp';

interface HeroProps {
   title?: string;
   description?: string;
   image?: string;
   ctaButton?: {
      text: string;
      link: string;
   };
   secondaryButton?: {
      text: string;
      link: string;
   };
   stats?: Array<{
      value: number;
      label: string;
      icon?: React.ElementType;
   }>;
   features?: Array<{
      text: string;
      icon?: React.ElementType;
      color?: string;
   }>;
   showParticles?: boolean;
   showStats?: boolean;
   showFeatures?: boolean;
   showScrollIndicator?: boolean;
}

const Hero = ({
   title,
   description,
   image,
   ctaButton,
   secondaryButton,
   stats = [],
   features = [],
   showParticles = true,
   showStats = true,
   showFeatures = true,
   showScrollIndicator = true
}: HeroProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"]
   });

   const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
   const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

   const defaultTitle = "Transformasi Digital untuk UMKM Indonesia";
   const defaultDescription = "Afasya Projects membantu UMKM Indonesia bertransformasi digital dengan website profesional, cepat, dan terjangkau. Kredibilitas bisnis Anda adalah prioritas kami.";

   const displayTitle = title || defaultTitle;
   const displayDescription = description || defaultDescription;

   const defaultFeatures = [
      { text: "Desain Modern & Responsif", icon: CheckCircle, color: "text-primary-400" },
      { text: "Optimasi SEO Terbaik", icon: TrendingUp, color: "text-accent-400" },
      { text: "Support 24/7", icon: Users, color: "text-green-400" },
      { text: "Garansi Revisi", icon: Award, color: "text-yellow-400" }
   ];

   const defaultStats = [
      { value: 150, label: "Proyek Selesai", icon: Award },
      { value: 120, label: "Klien Puas", icon: Users },
      { value: 5, label: "Tahun Pengalaman", icon: Calendar },
      { value: 80, label: "Partner UMKM", icon: TrendingUp }
   ];

   const displayFeatures = features.length > 0 ? features : defaultFeatures;
   const displayStats = stats.length > 0 ? stats : defaultStats;

   return (
      <section
         ref={containerRef}
         className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-secondary-950"
      >
         {/* Particles Background */}
         {showParticles && (
            <Particles
               className="absolute inset-0 -z-10"
               quantity={100}
               staticity={30}
               color="#0ea5e9"
            />
         )}

         {/* Gradient Overlays */}
         <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none -z-10" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent" />

         <motion.div
            style={{ y: y1, opacity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] -z-10 animate-pulse"
         />
         <motion.div
            style={{ y: y2, opacity }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-600/10 rounded-full blur-[120px] -z-10"
         />

         <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               {/* Left Content */}
               <div className="max-w-2xl">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5 }}
                     className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md"
                  >
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                     </span>
                     Solusi Digital Terpercaya untuk UMKM
                  </motion.div>

                  <motion.h1
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 0.2 }}
                     className="text-5xl md:text-7xl font-display font-black text-white leading-[1.1] mb-8"
                  >
                     <span dangerouslySetInnerHTML={{ __html: displayTitle }} />
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 0.4 }}
                     className="text-lg md:text-xl text-secondary-300 mb-10 leading-relaxed max-w-xl font-medium"
                  >
                     <span dangerouslySetInnerHTML={{ __html: displayDescription }} />
                  </motion.p>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 0.6 }}
                     className="flex flex-wrap gap-5 mb-12"
                  >
                     {ctaButton?.link === '/konsultasi' ? (
                        <button
                           onClick={() => {
                              const link = getWhatsAppLink(getConsultationMessage());
                              window.open(link, '_blank');
                           }}
                           className="relative group overflow-hidden btn btn-primary h-14 px-8 text-lg rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
                        >
                           <span className="relative z-10 flex items-center gap-2">
                              {ctaButton?.text || "Konsultasi Gratis"}
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                           </span>
                           <div className="absolute inset-0 bg-linear-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                     ) : (
                           <Link
                              to={ctaButton?.link || "/konsultasi"}
                              className="relative group overflow-hidden btn btn-primary h-14 px-8 text-lg rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all"
                           >
                              <span className="relative z-10 flex items-center gap-2">
                                 {ctaButton?.text || "Konsultasi Gratis"}
                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </span>
                              <div className="absolute inset-0 bg-linear-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                           </Link>
                     )}

                     {secondaryButton && (
                        <Link
                           to={secondaryButton.link}
                           className="btn backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-2xl group flex items-center gap-3 transition-all"
                        >
                           <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                              <Play className="w-4 h-4 fill-current" />
                           </div>
                           {secondaryButton.text}
                        </Link>
                     )}
                  </motion.div>

                  {/* Features list */}
                  {showFeatures && (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
                     >
                        {displayFeatures.map((feat, i) => {
                           const Icon = feat.icon || CheckCircle;
                           return (
                              <div key={i} className="flex items-center gap-3 text-sm text-neutral-300 font-medium">
                                 <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${feat.color || 'text-primary-400'}`}>
                                    <Icon className="w-4 h-4" />
                                 </div>
                                 <span>{feat.text}</span>
                              </div>
                           );
                        })}
                     </motion.div>
                  )}

                  {/* Stats */}
                  {showStats && (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10"
                     >
                        {displayStats.map((stat, i) => {
                           const Icon = stat.icon;
                           return (
                              <div key={i} className="text-center">
                                 <div className="flex items-center justify-center gap-2 mb-2">
                                    {Icon && (
                                       <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400">
                                          <Icon className="w-4 h-4" />
                                       </div>
                                   )}
                                   <p className="text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                                <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">{stat.label}</p>
                             </div>
                          );
                       })}
                     </motion.div>
                  )}
               </div>

               {/* Right Content - Visual */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative"
               >
                  <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm bg-white/5 p-2">
                     <div className="rounded-[32px] overflow-hidden">
                        <img
                           src={image || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"}
                           alt="Afasya Projects Hero"
                           className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                           loading="eager"
                        />
                     </div>
                  </div>

                  {/* Floating cards */}
                  <motion.div
                     animate={{ y: [0, -15, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -bottom-10 -left-10 glass-card bg-secondary-900/80 backdrop-blur-xl p-6 rounded-3xl z-20 max-w-[220px] border border-primary-500/30 shadow-[0_20px_50px_-12px_rgba(14,165,233,0.3)]"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                           <Zap className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-white tracking-tight">150+</p>
                           <p className="text-[10px] uppercase font-extrabold text-neutral-400 tracking-widest">Proyek Selesai</p>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div
                     animate={{ y: [0, 15, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute -top-6 -right-6 glass-card bg-secondary-900/80 backdrop-blur-xl p-5 rounded-2xl z-20 max-w-[180px] border border-accent-500/30 shadow-[0_20px_50px_-12px_rgba(236,72,153,0.3)]"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center text-accent-400">
                           <Users className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="text-xl font-bold text-white tracking-tight">120+</p>
                           <p className="text-[9px] uppercase font-extrabold text-neutral-400 tracking-widest">Klien Puas</p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Decorative background elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-1/2 -left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
               </motion.div>
            </div>
         </div>

         {/* Scroll Indicator */}
         {showScrollIndicator && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2 }}
               className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
               <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-[0.2em]">Scroll</span>
               <div className="w-px h-12 bg-linear-to-b from-primary-500 to-transparent" />
            </motion.div>
         )}
      </section>
   );
};

export default Hero;