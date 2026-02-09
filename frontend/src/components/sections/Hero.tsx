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
              

            </div>
         </div>
      </section>
   );
};

export default Hero;