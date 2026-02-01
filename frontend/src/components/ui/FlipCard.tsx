import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { useState } from 'react';

interface FlipCardProps {
   name: string;
   position: string;
   photoUrl?: string;
   bio: string;
   initials?: string;
   socialLinks?: {
      email?: string;
      linkedin?: string;
      twitter?: string;
      github?: string;
   };
}

const FlipCard = ({ name, position, photoUrl, bio, initials, socialLinks }: FlipCardProps) => {
   const [isFlipped, setIsFlipped] = useState(false);

   return (
      <div
         className="perspective-1000 w-full h-[450px] cursor-pointer group"
         onMouseEnter={() => setIsFlipped(true)}
         onMouseLeave={() => setIsFlipped(false)}
      >
         <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full h-full transform-style-3d shadow-2xl rounded-[40px]"
         >
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden w-full h-full bg-secondary-800 rounded-[40px] overflow-hidden border border-white/10">
               {photoUrl ? (
                  <img src={photoUrl} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               ) : (
                  <div className="w-full h-full bg-primary-600/20 flex items-center justify-center text-4xl font-bold text-primary-400">
                     {initials}
                  </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-transparent to-transparent opacity-90" />
               <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-2xl font-display font-bold text-white mb-1">{name}</h3>
                  <p className="text-primary-400 text-sm font-bold uppercase tracking-widest">{position}</p>
               </div>
            </div>

            {/* Back Side */}
            <div
               className="absolute inset-0 backface-hidden w-full h-full bg-primary-600 rounded-[40px] p-10 flex flex-col justify-between text-white"
               style={{ transform: "rotateY(180deg)" }}
            >
               <div>
                  <h3 className="text-2xl font-display font-bold mb-6">{name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-6">{bio}</p>
               </div>

               <div className="flex gap-4">
                  {socialLinks?.email && (
                     <a href={`mailto:${socialLinks.email}`} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                        <Mail className="w-5 h-5" />
                     </a>
                  )}
                  {socialLinks?.linkedin && (
                     <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                        <Linkedin className="w-5 h-5" />
                     </a>
                  )}
                  {socialLinks?.twitter && (
                     <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                        <Twitter className="w-5 h-5" />
                     </a>
                  )}
                  {socialLinks?.github && (
                     <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                        <Github className="w-5 h-5" />
                     </a>
                  )}
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export default FlipCard;
