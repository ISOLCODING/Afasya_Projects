import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Zap, Sun, Moon, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cn, getStorageUrl } from '@/lib/utils';
import { getPages, getSettings } from '@/lib/api';
import { useTheme } from '@/components/providers/ThemeProvider';
import { getIconByName } from '@/lib/icons';

interface Page {
   id: number;
   parent_id?: number | null;
   title: string;
   slug: string;
   is_in_menu?: boolean;
   menu_icon?: string;
   menu_order?: number;
   status: string;
   children?: Page[];
}

interface Settings {
   contact_phone?: string;
   site_name?: string;
   site_logo?: string;
   site_logo_with_text?: string;
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
   const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
   const { isDark, toggleTheme } = useTheme();
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
            let rawPages: Page[] = [];

            if (Array.isArray(response)) {
               rawPages = response;
            } else if (response && response.data) {
               rawPages = Array.isArray(response.data) ? response.data : [];
            }

            // Build hierarchy
            const pageMap = new Map();
            rawPages.forEach(page => pageMap.set(page.id, { ...page, children: [] }));

            const tree: Page[] = [];
            pageMap.forEach(page => {
               if (page.parent_id && pageMap.has(page.parent_id)) {
                  pageMap.get(page.parent_id).children.push(page);
               } else {
                  tree.push(page);
               }
            });

            return tree;
         } catch (error) {
            console.error('Error fetching pages:', error);
            return [];
         }
      },
      staleTime: 5 * 60 * 1000,
   });

   // Fetch data untuk settings
   const { data: settings, isLoading: settingsLoading } = useQuery<Settings>({
      queryKey: ['settings'],
      queryFn: async () => {
         try {
            const response = await getSettings();
            if (response && response.data) return response.data;
            return response || {};
         } catch (error) {
            console.error('Error fetching settings:', error);
            return {};
         }
      },
      staleTime: 0,
   });

   const whatsappNumber = (String(settings?.contact_phone || '')).replace(/[^0-9]/g, '') || '6281412307340';

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

   const buildNavItems = (pages: Page[]): any[] => {
      return pages
         .filter((page: Page) => {
            if (page.is_in_menu !== undefined) return page.is_in_menu;
            const mainSlugs = ['home', 'about-us', 'services', 'portfolio', 'blog', 'contact'];
            return mainSlugs.includes(page.slug);
         })
         .sort((a, b) => (a.menu_order || 0) - (b.menu_order || 0))
         .map(page => ({
            id: page.id,
            label: page.title,
            path: getRouteFromSlug(page.slug),
            slug: page.slug,
            iconName: page.menu_icon,
            children: page.children && page.children.length > 0 ? buildNavItems(page.children) : []
         }));
   };

   const displayItems = pagesData && pagesData.length > 0
      ? buildNavItems(pagesData)
      : [
         { id: 1, label: 'Beranda', path: '/', slug: 'home' },
         { id: 2, label: 'Tentang Kami', path: '/about', slug: 'about-us' },
         { id: 3, label: 'Layanan', path: '/services', slug: 'services' },
         { id: 4, label: 'Portfolio', path: '/portfolio', slug: 'portfolio' },
         { id: 5, label: 'Blog', path: '/blog', slug: 'blog' },
         { id: 6, label: 'Kontak', path: '/contact', slug: 'contact' },
      ];

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
         <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-950/80 backdrop-blur-xl border-b border-primary-500/10">
            <div className="container-custom mx-auto py-4 px-4 md:px-8">
               <div className="flex items-center justify-between">
                  <div className="h-10 w-40 bg-primary-900/50 animate-pulse rounded-xl"></div>
                  <div className="hidden lg:flex gap-8">
                     {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-6 w-16 bg-primary-900/50 animate-pulse rounded"></div>
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
            className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary-600 to-primary-400 origin-left z-60"
            style={{ scaleX }}
         />

         <div
            className={cn(
               'container-custom mx-auto transition-all duration-500 rounded-[24px] flex items-center justify-between px-4 md:px-8 overflow-hidden',
               isScrolled
                  ? 'glass-card bg-white/90 dark:bg-secondary-950/90 backdrop-blur-xl py-3 shadow-lg dark:shadow-[0_0_20px_rgba(14,165,233,0.1)] border border-neutral-200 dark:border-primary-500/20'
                  : 'bg-white/5 dark:bg-secondary-900/10 backdrop-blur-sm py-5 border border-black/5 dark:border-white/5 shadow-none hover:bg-white/10 dark:hover:bg-secondary-900/20 transition-all'
            )}
         >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
               {(() => {
                  const siteName = settings?.site_name || "Afasya Projects";
                  const [firstWord, ...restWords] = siteName.split(' ');
                  const restName = restWords.join(' ') || 'PROJECTS';

                  // Case 1: Logo With Text (Full Logo)
                  if (settings?.site_logo_with_text) {
                     return (
                        <img
                           src={getStorageUrl(settings.site_logo_with_text)}
                           alt={siteName}
                           className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                           onError={(e) => console.error('Full Logo load error:', e)}
                        />
                     );
                  }

                  // Case 2: Logo Icon + Text
                  return (
                     <>
                        {settings?.site_logo ? (
                           <img
                              src={getStorageUrl(settings.site_logo)}
                              alt={siteName}
                              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => console.error('Logo Icon load error:', e)}
                           />
                        ) : (
                              <motion.div
                                 whileHover={{ rotate: 15, scale: 1.1 }}
                                 className="w-11 h-11 bg-linear-to-tr from-primary-600 to-primary-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(13,139,242,0.3)] group-hover:shadow-[0_0_20px_rgba(13,139,242,0.5)] transition-all duration-300"
                              >
                                 <Zap className="w-6 h-6 fill-current" />
                              </motion.div>
                        )}
                        <div className="flex flex-col">
                           <span className="font-display font-black text-xl leading-none tracking-tighter text-neutral-900 dark:text-white">
                              {firstWord} <span className="text-primary-600 dark:text-primary-400">{restName}</span>
                           </span>
                           <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-neutral-500 dark:text-neutral-400 mt-1">
                              Digital Innovation
                           </span>
                        </div>
                     </>
                  );
               })()}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
               {displayItems.map((item) => (
                  <div
                     key={item.id} 
                     className="relative"
                     onMouseEnter={() => setActiveDropdown(item.id)}
                     onMouseLeave={() => setActiveDropdown(null)}
                  >
                     <Link
                        to={item.path}
                        className={cn(
                           'text-[12px] uppercase tracking-widest font-bold transition-all relative py-2.5 px-3.5 rounded-xl group flex items-center gap-1.5',
                           (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`)))
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-neutral-500 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 hover:bg-black/5 dark:hover:bg-white/5'
                        )}
                     >
                        <span className="relative z-10 block">
                           {item.label}
                        </span>

                        {item.children?.length > 0 && (
                           <motion.div
                              animate={activeDropdown === item.id ? { rotate: 180 } : { rotate: 0 }}
                              className="relative z-10"
                           >
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                              </svg>
                           </motion.div>
                        )}

                        {/* Underline for active state */}
                        {(location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`))) && (
                           <motion.div
                              layoutId="nav-underline"
                              className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-primary-600 to-primary-300 rounded-full"
                              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                           />
                        )}
                     </Link>

                     {/* Dropdown Menu */}
                     <AnimatePresence>
                        {item.children?.length > 0 && activeDropdown === item.id && (
                           <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute top-full left-0 mt-2 w-64 glass-card bg-white/95 dark:bg-secondary-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-primary-500/20 p-2 z-50 overflow-hidden"
                           >
                              <div className="flex flex-col gap-1">
                                 {item.children.map((child: any) => {
                                    const MenuIcon = getIconByName(child.iconName) || Zap;
                                    return (
                                       <Link
                                          key={child.id}
                                          to={child.path}
                                          className={cn(
                                             "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group/item",
                                             location.pathname === child.path
                                                ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                                                : "text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400"
                                          )}
                                       >
                                          <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-primary-500/10 transition-colors">
                                             <MenuIcon className="w-4 h-4" />
                                          </div>
                                          <div className="flex flex-col">
                                             <span>{child.label}</span>
                                          </div>
                                       </Link>
                                    );
                                 })}
                              </div>

                              {/* Decorative element */}
                              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               ))}
            </div>

            {/* Action Button & Theme Toggle */}
            <div className="hidden lg:flex items-center gap-4">
               <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
                  aria-label="Toggle Theme"
               >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>

               <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group px-8 py-3.5 overflow-hidden rounded-[20px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] active:scale-95 bg-primary-500 text-white"
               >
                  <div className="relative flex items-center gap-2">
                     Konsultasi Gratis
                     <ArrowUpRight className="w-4 h-4 translate-y-0.5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </div>
               </a>
            </div>

            {/* Mobile Toggle */}
            <button
               className="lg:hidden p-3 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
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
                  className="lg:hidden fixed top-24 left-4 right-4 bg-white/95 dark:bg-secondary-950/95 backdrop-blur-2xl rounded-[32px] shadow-2xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-neutral-200 dark:border-white/10 p-8 z-40 overflow-hidden"
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
                                 'text-xl font-display font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-between group',
                                 location.pathname === item.path
                                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20'
                                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-white'
                              )}
                              onClick={() => !item.children?.length && setIsMobileMenuOpen(false)}
                           >
                              {item.label}
                              {item.children?.length > 0 ? (
                                 <Plus className="w-5 h-5 text-neutral-400" />
                              ) : (
                                    <ArrowUpRight className={cn(
                                       "w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
                                       location.pathname === item.path ? "opacity-100" : "opacity-0"
                                    )} />
                              )}
                           </Link>

                           {/* Mobile Nested Menu */}
                           {item.children?.length > 0 && (
                              <div className="mt-2 ml-6 pl-4 border-l-2 border-neutral-100 dark:border-white/5 flex flex-col gap-2">
                                 {item.children.map((child: any) => {
                                    const MenuIcon = getIconByName(child.iconName) || Zap;
                                    return (
                                       <Link
                                          key={child.id}
                                          to={child.path}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={cn(
                                             "py-4 px-4 rounded-2xl flex items-center gap-4 transition-all",
                                             location.pathname === child.path
                                                ? "bg-primary-500/5 text-primary-600 dark:text-primary-400"
                                                : "text-neutral-500 dark:text-neutral-400"
                                          )}
                                       >
                                          <MenuIcon className="w-5 h-5" />
                                          <span className="text-lg font-bold">{child.label}</span>
                                       </Link>
                                    );
                                 })}
                              </div>
                           )}
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
                        className="flex items-center justify-center gap-3 w-full bg-linear-to-r from-primary-600 to-primary-500 text-white py-5 px-6 rounded-[20px] shadow-[0_10px_20px_rgba(79,70,229,0.3)] font-bold text-lg"
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