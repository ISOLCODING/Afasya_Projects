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
               {/* Content Column */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
               >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm">
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                     </span>
                     <span className="text-sm font-medium text-primary-400">#1 Web Development Agency</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                     {displayTitle}
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-secondary-400 max-w-xl leading-relaxed">
                     {displayDescription}
                  </p>

                  {/* Features List */}
                  {showFeatures && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {displayFeatures.map((feature, idx) => (
                           <div key={idx} className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-secondary-900/50 ${feature.color}`}>
                                 {feature.icon && <feature.icon className="w-5 h-5" />}
                              </div>
                              <span className="text-secondary-300 font-medium">{feature.text}</span>
                           </div>
                        ))}
                     </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     {ctaButton ? (
                        <Link
                           to={ctaButton.link}
                           className="btn btn-primary btn-lg group"
                        >
                           {ctaButton.text}
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                     ) : (
                        <a
                           href={getWhatsAppLink(getConsultationMessage())}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="btn btn-primary btn-lg group"
                        >
                           Konsultasi Gratis
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                     )}

                     {secondaryButton ? (
                        <Link
                           to={secondaryButton.link}
                           className="btn btn-outline btn-lg group"
                        >
                           <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                           {secondaryButton.text}
                        </Link>
                     ) : (
                        <Link
                           to="/portfolio"
                           className="btn btn-outline btn-lg group"
                        >
                           <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                           Lihat Portfolio
                        </Link>
                     )}
                  </div>
               </motion.div>

               {/* Visual/Stats Column */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative hidden lg:block"
               >
                  <div className="relative z-10 w-full aspect-square max-w-[600px] mx-auto">
                     {/* Floating Cards / Stats */}
                     {showStats && (
                        <div className="grid grid-cols-2 gap-6 absolute inset-0 content-center">
                           {displayStats.map((stat, idx) => (
                              <motion.div
                                 key={idx}
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.4 + (idx * 0.1) }}
                                 className="glass p-6 rounded-2xl border border-white/5 bg-secondary-900/40 backdrop-blur-md hover:bg-secondary-800/40 transition-colors group"
                              >
                                 <div className="mb-4 p-3 rounded-xl bg-primary-500/10 w-fit group-hover:bg-primary-500/20 transition-colors">
                                    {stat.icon && <stat.icon className="w-8 h-8 text-primary-400" />}
                                 </div>
                                 <div className="text-3xl font-bold text-white mb-1">
                                    {stat.value}{stat.label.includes("Persen") ? "%" : "+"}
                                 </div>
                                 <div className="text-secondary-400 text-sm font-medium">
                                    {stat.label}
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     )}

                     {/* Decorative Circles */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10 animate-[spin_60s_linear_infinite]" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-primary-500/10 rounded-full -z-10 animate-[spin_40s_linear_infinite_reverse]" />
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Scroll Indicator */}
         {showScrollIndicator && (
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1, duration: 1 }}
               className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary-500"
            >
               <span className="text-xs uppercase tracking-widest">Scroll</span>
               <div className="w-px h-12 bg-linear-to-b from-primary-500 to-transparent"></div>
            </motion.div>
         )}
      </section>
   );
};

export default Hero;