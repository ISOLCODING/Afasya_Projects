import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { getPages, getSettings } from '@/lib/api';

interface Page {
   id: number;
   title: string;
   slug: string;
   is_in_menu?: boolean;
   menu_order?: number;
   status: string;
}

interface Settings {
   contact_phone?: string;
   site_name?: string;
   logo_url?: string;
}

const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
   <div className="w-6 h-5 relative flex flex-col justify-between items-center">
      <motion.span
         animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
         transition={{ duration: 0.3 }}
         className="w-full h-0.5 bg-current rounded-full"
      />
      <motion.span
         animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
         transition={{ duration: 0.2 }}
         className="w-full h-0.5 bg-current rounded-full"
      />
      <motion.span
         animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
         transition={{ duration: 0.3 }}
         className="w-full h-0.5 bg-current rounded-full"
      />
   </div>
);

const Navbar = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const location = useLocation();

   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   // Fetch data untuk halaman
   const { data: pagesData, isLoading: pagesLoading } = useQuery<Page[]>({
      queryKey: ['navigation-pages'],
      queryFn: async () => {
         try {
            const response = await getPages();
            if (Array.isArray(response)) {
               return response.filter(page => page.status === 'published');
            } else if (response && response.data) {
               return Array.isArray(response.data)
                  ? response.data.filter((page: Page) => page.status === 'published')
                  : [];
            }
            return [];
         } catch (error) {
            console.error('Error fetching pages:', error);
            return [];
         }
      },
      staleTime: 5 * 60 * 1000,
   });

   // Fetch data untuk settings
   const { data: settings, isLoading: settingsLoading } = useQuery<Settings>({
      queryKey: ['site-settings'],
      queryFn: async () => {
         try {
            const response = await getSettings();
            if (response && typeof response === 'object') {
               return response.data || response;
            }
            return {};
         } catch (error) {
            console.error('Error fetching settings:', error);
            return {};
         }
      },
   });

   const whatsappNumber = (String(settings?.contact_phone || '')).replace(/[^0-9]/g, '') || '6282124515302';

   const getRouteFromSlug = (slug: string): string => {
      const routeMap: Record<string, string> = {
         'home': '/',
         'beranda': '/',
         'layanan': '/services',
         'services': '/services',
         'portfolio': '/portfolio',
         'portofolio': '/portfolio',
         'posts': '/blog',
         'blog': '/blog',
         'team': '/team',
         'tim': '/team',
         'contact': '/contact',
         'kontak': '/contact',
         'about-us': '/about',
         'tentang-kami': '/about'
      };
      const cleanSlug = slug.toLowerCase().trim();
      return routeMap[cleanSlug] || `/${cleanSlug}`;
   };

   const navItems = pagesData
      ?.filter((page: Page) => {
         if (page.is_in_menu !== undefined) return page.is_in_menu;
         const mainSlugs = ['home', 'about-us', 'services', 'portfolio', 'blog', 'contact'];
         return mainSlugs.includes(page.slug);
      })
      ?.sort((a: Page, b: Page) => (a.menu_order || 0) - (b.menu_order || 0))
      ?.map((page: Page) => ({
         id: page.id,
         label: page.title,
         path: getRouteFromSlug(page.slug),
         slug: page.slug,
      })) || [];

   const defaultItems = [
      { id: 1, label: 'Beranda', path: '/', slug: 'home' },
      { id: 2, label: 'Tentang Kami', path: '/about', slug: 'about-us' },
      { id: 3, label: 'Layanan', path: '/services', slug: 'services' },
      { id: 4, label: 'Portfolio', path: '/portfolio', slug: 'portfolio' },
      { id: 5, label: 'Blog', path: '/blog', slug: 'blog' },
      { id: 6, label: 'Kontak', path: '/contact', slug: 'contact' },
   ];

   const displayItems = navItems.length > 0 ? navItems : defaultItems;

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      setIsMobileMenuOpen(false);
   }, [location.pathname]);

   if (pagesLoading || settingsLoading) {
      return (
         <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-950/80 backdrop-blur-md border-b border-white/5">
            <div className="container-custom mx-auto py-4 px-4 md:px-8">
               <div className="flex items-center justify-between">
                  <div className="h-10 w-40 bg-secondary-800 animate-pulse rounded-xl"></div>
                  <div className="hidden lg:flex gap-8">
                     {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-6 w-16 bg-secondary-800 animate-pulse rounded"></div>
                     ))}
                  </div>
               </div>
            </div>
         </nav>
      );
   }

   return (
      <nav
         className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-8',
            isScrolled ? 'md:py-3' : 'md:py-6'
         )}
      >
         {/* Scroll Progress Bar */}
         <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 origin-left z-[60]"
            style={{ scaleX }}
         />

         <div
            className={cn(
               'container-custom mx-auto transition-all duration-500 rounded-[24px] flex items-center justify-between px-4 md:px-8 overflow-hidden',
               isScrolled
                  ? 'glass-card py-3 backdrop-blur-2xl shadow-2xl border border-white/10 bg-secondary-950/40'
                  : 'bg-white/5 backdrop-blur-sm py-5 border border-white/10 shadow-none'
            )}
         >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
               <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-11 h-11 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all duration-300"
               >
                  <Zap className="w-6 h-6 fill-current" />
               </motion.div>
               <div className="flex flex-col">
                  <span className="font-display font-black text-xl leading-none tracking-tighter text-white">
                     AFASYA <span className="text-primary-400">PROJECTS</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-secondary-400 mt-1">
                     Digital Innovation
                  </span>
               </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
               {displayItems.map((item) => (
                  <Link
                     key={item.id}
                     to={item.path}
                     className={cn(
                        'text-[13px] uppercase tracking-widest font-bold transition-all relative py-2 mb-[-2px]',
                        location.pathname === item.path
                           ? 'text-primary-400'
                           : 'text-secondary-300 hover:text-white'
                     )}
                  >
                     {item.label}
                     {location.pathname === item.path && (
                        <motion.div
                           layoutId="nav-underline"
                           className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                           transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                     )}
                  </Link>
               ))}
            </div>

            {/* Action Button */}
            <div className="hidden lg:flex items-center gap-4">
               <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group px-7 py-3 overflow-hidden rounded-2xl font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]"
               >
                  <div className="absolute inset-0 bg-primary-600 transition-transform duration-300 group-hover:scale-105" />
                  <div className="relative flex items-center gap-2 text-white">
                     Konsultasi Gratis
                     <ArrowUpRight className="w-4 h-4 translate-y-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
               </a>
            </div>

            {/* Mobile Toggle */}
            <button
               className="lg:hidden p-3 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-colors"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               aria-label="Toggle menu"
            >
               <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
         </div>

         {/* Mobile Menu */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="lg:hidden fixed top-24 left-4 right-4 bg-secondary-900/95 backdrop-blur-2xl rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 p-8 z-40 overflow-hidden"
               >
                  {/* Decorative background in menu */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl -z-10" />

                  <div className="flex flex-col gap-3">
                     {displayItems.map((item, i) => (
                        <motion.div
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.05 }}
                           key={item.id}
                        >
                           <Link
                              to={item.path}
                              className={cn(
                                 'text-2xl font-display font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-between group',
                                 location.pathname === item.path
                                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                                    : 'text-secondary-300 hover:bg-white/5 hover:text-white'
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                           >
                              {item.label}
                              <ArrowUpRight className={cn(
                                 "w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
                                 location.pathname === item.path ? "opacity-100" : "opacity-0"
                              )} />
                           </Link>
                        </motion.div>
                     ))}
                  </div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="mt-8 pt-8 border-t border-white/5"
                  >
                     <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-5 px-6 rounded-[20px] shadow-[0_10px_20px_rgba(79,70,229,0.3)] font-bold text-lg"
                     >
                        <Zap className="w-6 h-6 fill-current" />
                        Konsultasi Sekarang
                     </a>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </nav>
   );
};

export default Navbar;