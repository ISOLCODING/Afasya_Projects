import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Particles from '@/components/ui/Particles';

interface HeroProps {
   title?: string;
   description?: string;
   image?: string;
}

const TypewriterText = ({ text }: { text: string }) => {
   const words = text.split(' ');
   return (
      <>
         {words.map((word, i) => (
            <motion.span
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{
                  duration: 0.3,
                  delay: i * 0.1,
                  ease: "easeOut"
               }}
               className="inline-block mr-[0.3em]"
            >
               {word}
            </motion.span>
         ))}
      </>
   );
};

const Hero = ({ title, description, image }: HeroProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"]
   });

   const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
   const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

   const defaultTitle = "Tingkatkan Bisnis Anda ke Level Selanjutnya";
   const displayTitle = title || defaultTitle;

   return (
      <section
         ref={containerRef}
         className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-secondary-950"
      >
         {/* Particles Background */}
         <Particles
            className="absolute inset-0 -z-10"
            quantity={100}
            staticity={30}
            color="#6366f1"
         />

         {/* Gradient Overlays */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary-950 via-transparent to-secondary-950 pointer-events-none -z-10" />

         <motion.div
            style={{ y: y1, opacity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] -z-10 animate-pulse"
         />
         <motion.div
            style={{ y: y2, opacity }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-600/10 rounded-full blur-[120px] -z-10"
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
                     className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-8"
                  >
                     <TypewriterText text={displayTitle} />
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 0.8 }}
                     className="text-lg md:text-xl text-secondary-300 mb-10 leading-relaxed max-w-xl"
                  >
                     {description || "Afasya Projects membantu UMKM Indonesia bertransformasi digital dengan website profesional, cepat, dan terjangkau. Kredibilitas bisnis Anda adalah prioritas kami."}
                  </motion.p>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.7, delay: 1 }}
                     className="flex flex-wrap gap-5"
                  >
                     <Link to="/services" className="relative group overflow-hidden btn btn-primary h-14 px-8 text-lg rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all">
                        <span className="relative z-10 flex items-center gap-2">
                           Mulai Proyek
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </Link>

                     <button className="btn backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10 h-14 px-8 text-lg rounded-2xl group flex items-center gap-3 transition-all">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                           <Play className="w-4 h-4 fill-current" />
                        </div>
                        Lihat Video
                     </button>
                  </motion.div>

                  {/* Features list */}
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 1, delay: 1.5 }}
                     className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
                  >
                     {[
                        { text: "Desain Modern", color: "text-primary-400" },
                        { text: "Optimasi SEO", color: "text-accent-400" },
                        { text: "Support 24/7", color: "text-green-400" }
                     ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-secondary-400 font-medium">
                           <CheckCircle className={`w-5 h-5 ${feat.color}`} />
                           {feat.text}
                        </div>
                     ))}
                  </motion.div>
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
                           src={image || "/images/hero-agency.jpg"}
                           alt={title || "Afasya Projects Hero"}
                           className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                     </div>
                  </div>

                  {/* Floating glass card */}
                  <motion.div
                     animate={{ y: [0, -15, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -bottom-10 -left-10 glass-card p-6 rounded-3xl z-20 max-w-[220px] border border-white/20 shadow-2xl"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                           <Zap className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-2xl font-bold text-white tracking-tight">150+</p>
                           <p className="text-[10px] uppercase font-extrabold text-secondary-400 tracking-widest">Proyek Selesai</p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Decorative background elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-1/2 -left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
               </motion.div>
            </div>
         </div>

         {/* Scroll Indicator */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
         >
            <span className="text-[10px] uppercase font-bold text-secondary-500 tracking-[0.2em]">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary-500 to-transparent" />
         </motion.div>
      </section>
   );
};

export default Hero;
