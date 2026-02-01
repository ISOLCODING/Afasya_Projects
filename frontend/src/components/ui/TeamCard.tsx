import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { getStorageUrl } from '@/lib/utils';

interface TeamCardProps {
   name: string;
   position: string;
   image?: string;
   photoUrl?: string;
   bio?: string;
   initials?: string;
   socialLinks?: any;
   expertises?: string[];
   index: number;
}

const TeamCard = ({ name, position, image, photoUrl, initials, bio, socialLinks, expertises, index }: TeamCardProps) => {
   const displayImage = photoUrl || image || '';

   // Filter valid social links
   const availableSocials = [
      { id: 'linkedin', icon: Linkedin, url: socialLinks?.linkedin || socialLinks?.LinkedIn },
      { id: 'twitter', icon: Twitter, url: socialLinks?.twitter || socialLinks?.Twitter },
      { id: 'github', icon: Github, url: socialLinks?.github || socialLinks?.GitHub || socialLinks?.github_url }
   ].filter(s => s.url);

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         className="group relative"
      >
         <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-secondary-50">
            {displayImage ? (
               <img
                  src={getStorageUrl(displayImage)}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary-200 uppercase">
                  {initials || (name ? name.substring(0, 2) : '??')}
               </div>
            )}

            {/* Overlay with Bio & Socials */}
            <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
               {bio && (
                  <motion.p
                     initial={{ y: 10, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     className="text-white text-sm mb-6 leading-relaxed line-clamp-4"
                  >
                     {bio}
                  </motion.p>
               )}

               {expertises && expertises.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1 mb-6">
                     {expertises.slice(0, 3).map((exp, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white/20 rounded text-[10px] text-white">
                           {exp}
                        </span>
                     ))}
                  </div>
               )}

               <div className="flex items-center justify-center gap-3">
                  {(availableSocials.length > 0 ? availableSocials : [
                     { icon: Linkedin, url: '#' },
                     { icon: Twitter, url: '#' },
                     { icon: Github, url: '#' }
                  ]).map((item, i) => (
                     <motion.a
                        key={i}
                        href={item.url}
                        target={item.url !== '#' ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-10 h-10 rounded-full bg-white text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110"
                     >
                        <item.icon className="w-5 h-5" />
                     </motion.a>
                  ))}
               </div>
            </div>
         </div>

         <div className="text-center">
            <h3 className="text-xl font-bold text-secondary-900 mb-1">{name}</h3>
            <p className="text-sm font-medium text-primary-600 uppercase tracking-wider">{position}</p>
         </div>
      </motion.div>
   );
};

export default TeamCard;
