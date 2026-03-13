
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useAnimation, type PanInfo, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  icon?: any;
  image?: string;
  slug: string;
  startingPrice?: string | number;
}

interface Carousel3DProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlaySpeed?: number;
}

const CARD_WIDTH = 320;
const CARD_HEIGHT = 480;
const CARD_GAP = 20;

export default function Carousel3D({ items, autoPlay = true, autoPlaySpeed = 2000 }: Carousel3DProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure we have enough items for a nice circle, duplicates if necessary?
  // For now, let's just use items as is.
  const count = items.length;
  const theta = 360 / count;
  // Calculate radius: r = (w / 2) / tan(theta / 2)
  // Convert theta to radians: theta * Math.PI / 180
  const radius = Math.round((CARD_WIDTH + CARD_GAP) / 2 / Math.tan(Math.PI / count));

  const controls = useAnimation();
  const rotationValue = useMotionValue(0);

  // Handle Drag
  const onDrag = (_: any, info: PanInfo) => {
    // Determine direction
    const move = info.offset.x;
    rotationValue.set(rotation + move / 2); // sensitivity
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    // Snap to nearest item?
    // Current rotation
    const currentRot = rotationValue.get();
    // Snap logic if desired, or just inertia.
    // Let's plain set rotation state to keep it simple first
    const endRot = currentRot + info.velocity.x * 0.2; // inertia
    setRotation(endRot);
  };

  // Convert rotation to active index for highlighting
  useEffect(() => {
    const normalizeRot = ((rotation % 360) + 360) % 360;
    // Active index is the one facing front (angle 0, or 360, etc within tolerance)
    // Actually item i is at i * theta.
    // If we rotate SCENE by -rotation.
    // Front is when i * theta - rotation ~= 0 => rotation ~= i * theta
    const index = Math.round(rotation / theta) % count;
    setActiveIndex((count - index) % count);
  }, [rotation, count, theta]);

  // Auto Rotation
  useEffect(() => {
    if (autoPlay && !isDragging) {
      const interval = setInterval(() => {
        setRotation((prev) => prev - theta); // Rotate one item per interval? Or smooth?
        // Smooth auto rotation usually implies constant speed.
        // Let's try constant slow spin:
      }, autoPlaySpeed);
      return () => clearInterval(interval);
    }
  }, [autoPlay, isDragging, theta, autoPlaySpeed]);
  
  // Smooth rotation update
  useEffect(() => {
    controls.start({
       rotateY: rotation,
       transition: { type: "spring", stiffness: 50, damping: 20 }
    });
    rotationValue.set(rotation);
  }, [rotation, controls, rotationValue]);


  const handlePrev = () => {
    setRotation((prev) => prev + theta);
  };

  const handleNext = () => {
    setRotation((prev) => prev - theta);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theta]);


  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden perspective-1000 py-20 bg-linear-to-b from-neutral-50/50 to-white dark:from-secondary-950/50 dark:to-secondary-950">
       {/* Background Elements */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary-500/5 via-transparent to-transparent opacity-50" />
       
       <div className="relative z-10 flex flex-col items-center justify-center w-full h-full preserve-3d">
          <motion.div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center preserve-3d cursor-grab active:cursor-grabbing"
            style={{ 
               transformStyle: "preserve-3d",
            }}
            animate={controls}
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          >
             {items.map((item, i) => {
                const angle = i * theta;
                // Position in circle
                // We want to translate Z by radius, then rotate Y by angle.
                // Or RotateY first then TranslateZ?
                // RotateY(angle) -> TranslateZ(radius) puts them in circle facing OUTWARD.
                
                return (
                   <CarouselCard 
                     key={item.id} 
                     item={item} 
                     angle={angle} 
                     radius={radius} 
                     isActive={i === activeIndex}
                   />
                );
             })}
          </motion.div>
       </div>

       {/* Controls */}
       <div className="absolute bottom-10 flex gap-4 z-50">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-secondary-900 dark:text-white transition-all shadow-lg"
          >
             <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-secondary-900 dark:text-white transition-all shadow-lg"
          >
             <ArrowRight className="w-6 h-6" />
          </button>
       </div>
    </div>
  );
}

function CarouselCard({ item, angle, radius, isActive }: { item: CarouselItem, angle: number, radius: number, isActive: boolean }) {
   const [isFlipped, setIsFlipped] = useState(false);
   
   // Reset flip when not active?
   useEffect(() => {
      if(!isActive) setIsFlipped(false);
   }, [isActive]);

   return (
      <motion.div
         className={cn(
            "absolute top-1/2 left-1/2 rounded-[30px] shadow-2xl transition-all duration-500",
         )}
         style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            marginLeft: -CARD_WIDTH / 2,
            marginTop: -CARD_HEIGHT / 2,
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
            transformStyle: "preserve-3d",
         }}
         onClick={() => setIsFlipped(!isFlipped)}
      >
         {/* Front Face */}
         <div 
            className={cn(
               "absolute inset-0 w-full h-full backface-hidden rounded-[30px] overflow-hidden border border-white/20 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl p-8 flex flex-col items-center justify-between transition-all duration-500",
               isActive ? "shadow-[0_0_50px_rgba(14,165,233,0.3)] border-primary-500/50" : "opacity-70 scale-90 grayscale-50"
            )}
            style={{ backfaceVisibility: 'hidden' }}
         >
             {/* Content Front */}
             <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center mb-6">
                {item.icon && <item.icon className="w-10 h-10 text-primary-500" />}
             </div>
             
             <h3 className="text-2xl font-black text-center text-secondary-900 dark:text-white mb-2 uppercase tracking-wider">{item.title}</h3>
             
             <div className="grow flex items-center justify-center">
               <p className="text-center text-sm text-secondary-500 dark:text-secondary-400 line-clamp-3 px-4">
                  {item.description}
               </p>
             </div>

             <div className="mt-6 flex items-center gap-2 text-xs font-bold text-primary-500 uppercase tracking-widest animate-pulse">
                Click to Flip <Info className="w-4 h-4" />
             </div>
         </div>

         {/* Back Face */}
         <div 
            className={cn(
               "absolute inset-0 w-full h-full backface-hidden rounded-[30px] overflow-hidden border border-primary-500/50 bg-secondary-900 dark:bg-black backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center transform rotate-y-180 transition-all duration-500",
               isActive ? "shadow-[0_0_50px_rgba(14,165,233,0.5)]" : "opacity-0"
            )}
            style={{ 
               backfaceVisibility: 'hidden',
               transform: 'rotateY(180deg)'
            }}
         >
             <h3 className="text-xl font-bold text-white mb-6">Detail Layanan</h3>
             
             <div className="space-y-4 w-full mb-8">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-sm text-secondary-400">Harga Mulai</span>
                   <span className="text-lg font-bold text-primary-400">
                      {item.startingPrice ? `Rp ${new Intl.NumberFormat('id-ID').format(Number(item.startingPrice))}` : 'Custom'}
                   </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-sm text-secondary-400">Estimasi</span>
                   <span className="text-sm font-bold text-white">7-14 Hari</span>
                </div>
             </div>

             <Link 
                to={`/services/${item.slug}`}
                onClick={(e) => e.stopPropagation()} // Prevent flip back
                className="btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 group"
             >
                Lihat Selengkapnya 
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>

             <button 
                onClick={(e) => {
                   e.stopPropagation();
                   setIsFlipped(false);
                }}
                className="mt-6 text-sm text-secondary-400 hover:text-white flex items-center gap-2"
             >
                <X className="w-4 h-4" /> Tutup
             </button>
         </div>
      </motion.div>
   );
}
