import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@/lib/api';
import { getStorageUrl } from '@/lib/utils';

const Footer = () => {
   const currentYear = new Date().getFullYear();

   const { data: settings } = useQuery({
      queryKey: ['settings'],
      queryFn: async () => {
         try {
            const response = await getSettings();
            if (response && response.data) {
               return response.data;
            }
            return response || {};
         } catch (error) {
            console.error('Error fetching settings:', error);
            return {};
         }
      },
      staleTime: 0,
   });

   return (
      <footer className="bg-secondary-950 text-white pt-24 pb-12 overflow-hidden relative">
         <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
               {/* Brand Column */}
               <div className="flex flex-col gap-8">
                  <Link to="/" className="flex items-center gap-2 group">
                     {settings?.site_logo ? (
                        <img
                           src={getStorageUrl(settings.site_logo)}
                           alt={settings.site_name || "Afasya Projects"}
                           className="w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                     ) : (
                        <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-glow">
                           A
                        </div>
                     )}
                     <span className="font-display font-black text-2xl tracking-tighter">
                        {(settings?.site_name || 'Afasya').split(' ')[0]} <span className="text-primary-400">{(settings?.site_name || 'Afasya Projects').split(' ').slice(1).join(' ') || 'PROJECTS'}</span>
                     </span>
                  </Link>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                     {settings?.site_description || 'Solusi digital profesional untuk UMKM Indonesia. Kami membantu bisnis Anda bertransformasi ke era digital dengan website berkualitas tinggi.'}
                  </p>
                  <div className="flex gap-4">
                     {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                        <a
                           key={i}
                           href="#"
                           className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-primary-600 hover:text-white hover:border-primary-500 transition-all duration-500 transform hover:-translate-y-2 group shadow-lg"
                        >
                           <Icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                        </a>
                     ))}
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-white/50">Navigasi</h4>
                  <ul className="flex flex-col gap-5">
                     {[
                        { label: 'Tentang Kami', path: '/about' },
                        { label: 'Layanan', path: '/services' },
                        { label: 'Portofolio', path: '/portfolio' },
                        { label: 'Blog & Artikel', path: '/blog' }, // Updated path to /blog
                        { label: 'Tim Kami', path: '/team' }, // Added Team link
                        { label: 'Kontak', path: '/contact' },
                     ].map((link) => (
                        <li key={link.path}>
                           <Link
                              to={link.path}
                              className="text-neutral-400 hover:text-primary-400 transition-all duration-300 text-sm font-bold flex items-center gap-3 group"
                           >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 transition-all duration-300 group-hover:w-4 group-hover:bg-primary-400" />
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-white/50">Kontak Kami</h4>
                  <ul className="flex flex-col gap-6">
                     <li className="flex items-start gap-4 text-sm text-neutral-400 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
                           <MapPin className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="pt-2 leading-relaxed">Jl. Digital Kreatif No. 123, Jakarta Selatan, Indonesia</span>
                     </li>
                     <li className="flex items-center gap-4 text-sm text-neutral-400 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
                           <Phone className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="font-bold">+62 821 2451 5302</span>
                     </li>
                     <li className="flex items-center gap-4 text-sm text-neutral-400 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
                           <Mail className="w-5 h-5 text-primary-500" />
                        </div>
                        <span className="font-bold">hello@afasyaprojects.com</span>
                     </li>
                  </ul>
               </div>

               {/* Newsletter */}
               <div>
                  <h4 className="font-display font-black text-lg mb-8 uppercase tracking-widest text-white/50">Newsletter</h4>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                     Dapatkan tips digital marketing dan update layanan kami langsung di email Anda.
                  </p>
                  <div className="relative group">
                     <input
                        type="email"
                        placeholder="Alamat email Anda"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all pr-16 text-white placeholder:text-neutral-600"
                     />
                     <button className="absolute right-2 top-2 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all duration-300 shadow-lg shadow-primary-600/20">
                        <Send className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-neutral-500 text-[11px] font-black uppercase tracking-widest">
                  © {currentYear} Afasya Projects. Crafted with Passion.
               </p>
               <div className="flex gap-8">
                  <Link to="/privacy" className="text-neutral-500 hover:text-primary-400 text-[11px] font-black uppercase tracking-widest transition-colors">Kebijakan Privasi</Link>
                  <Link to="/terms" className="text-neutral-500 hover:text-primary-400 text-[11px] font-black uppercase tracking-widest transition-colors">Syarat & Ketentuan</Link>
               </div>
            </div>
         </div>

         {/* Background Decor */}
         <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-primary-600 via-accent-400 to-primary-600 opacity-30" />
         <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />
      </footer>
   );
};

export default Footer;
