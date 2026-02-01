import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-secondary-900 text-white pt-20 pb-10 overflow-hidden relative">
         <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
               {/* Brand Column */}
               <div className="flex flex-col gap-6">
                  <Link to="/" className="flex items-center gap-2 group">
                     <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        A
                     </div>
                     <span className="font-display font-bold text-xl tracking-tight">
                        AFASYA <span className="text-primary-400">PROJECTS</span>
                     </span>
                  </Link>
                  <p className="text-secondary-400 text-sm">
                     Solusi digital profesional untuk UMKM Indonesia. Kami membantu bisnis Anda bertransformasi ke era digital dengan website berkualitas tinggi.
                  </p>
                  <div className="flex gap-4">
                     {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                        <a
                           key={i}
                           href="#"
                           className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                        >
                           <Icon className="w-5 h-5" />
                        </a>
                     ))}
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h4 className="font-display font-bold text-lg mb-6">Navigasi</h4>
                  <ul className="flex flex-col gap-4">
                     {[
                        { label: 'Tentang Kami', path: '/about' },
                        { label: 'Layanan', path: '/services' },
                        { label: 'Portofolio', path: '/portfolio' },
                        { label: 'Blog & Artikel', path: '/posts' },
                        { label: 'Karir', path: '/careers' },
                     ].map((link) => (
                        <li key={link.path}>
                           <Link
                              to={link.path}
                              className="text-secondary-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2"
                           >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-500/20" />
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Info */}
               <div>
                  <h4 className="font-display font-bold text-lg mb-6">Kontak Kami</h4>
                  <ul className="flex flex-col gap-5">
                     <li className="flex items-start gap-3 text-sm text-secondary-400">
                        <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                        <span>Jl. Digital Kreatif No. 123, Jakarta Selatan, Indonesia</span>
                     </li>
                     <li className="flex items-center gap-3 text-sm text-secondary-400">
                        <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                        <span>+62 812 3456 7890</span>
                     </li>
                     <li className="flex items-center gap-3 text-sm text-secondary-400">
                        <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                        <span>hello@afasyaprojects.com</span>
                     </li>
                  </ul>
               </div>

               {/* Newsletter */}
               <div>
                  <h4 className="font-display font-bold text-lg mb-6">Newsletter</h4>
                  <p className="text-secondary-400 text-sm mb-4">
                     Dapatkan tips digital marketing dan update layanan kami langsung di email Anda.
                  </p>
                  <div className="relative">
                     <input
                        type="email"
                        placeholder="Alamat email Anda"
                        className="w-full bg-secondary-800 border-secondary-700 rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all pr-12"
                     />
                     <button className="absolute right-2 top-2 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                        <Send className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-secondary-800 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-secondary-500 text-xs">
                  © {currentYear} Afasya Projects. All rights reserved.
               </p>
               <div className="flex gap-6">
                  <Link to="/privacy" className="text-secondary-500 hover:text-white text-xs">Kebijakan Privasi</Link>
                  <Link to="/terms" className="text-secondary-500 hover:text-white text-xs">Syarat & Ketentuan</Link>
               </div>
            </div>
         </div>

         {/* Background Decor */}
         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-accent-400 to-primary-600 opacity-50" />
         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px]" />
         <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-600/10 rounded-full blur-[100px]" />
      </footer>
   );
};

export default Footer;
