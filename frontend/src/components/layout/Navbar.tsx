import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Zap, Sun, Moon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cn, getStorageUrl } from '@/lib/utils';
import { getPages, getSettings } from '@/lib/api';
import { useTheme } from '@/components/providers/ThemeProvider';
import { getIconByName } from '@/lib/icons';
import { createPortal } from 'react-dom';
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { MenuToggleIcon } from '@/components/ui/MenuToggleIcon';
import { Button } from '@/components/ui/Button';

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

interface NavItem {
   id: number;
   label: string;
   path: string;
   slug: string;
   iconName?: string;
   children?: NavItem[];
}

type LinkItem = {
   title: string;
   href: string;
   icon: LucideIcon;
   description?: string;
};

// ListItem component for mega menu
function ListItem({
   title,
   description,
   icon: Icon,
   className,
   href,
   ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
   return (
      <NavigationMenuLink
         className={cn(
            'w-full flex flex-row gap-x-3 data-[active=true]:focus:bg-neutral-100 dark:data-[active=true]:focus:bg-secondary-800 data-[active=true]:hover:bg-neutral-100 dark:data-[active=true]:hover:bg-secondary-800 data-[active=true]:bg-neutral-50 dark:data-[active=true]:bg-secondary-800/50 data-[active=true]:text-neutral-900 dark:data-[active=true]:text-white hover:bg-neutral-100 dark:hover:bg-secondary-800 hover:text-neutral-900 dark:hover:text-white focus:bg-neutral-100 dark:focus:bg-secondary-800 focus:text-neutral-900 dark:focus:text-white rounded-xl p-3 transition-all',
            className
         )}
         {...props}
         asChild
      >
         <a href={href}>
            <div className="bg-white dark:bg-secondary-900 flex aspect-square size-12 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm">
               <Icon className="text-primary-600 dark:text-primary-400 size-5" />
            </div>
            <div className="flex flex-col items-start justify-center">
               <span className="font-bold text-sm">{title}</span>
               {description && (
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1">{description}</span>
               )}
            </div>
         </a>
      </NavigationMenuLink>
   );
}

// Mobile Menu Component
type MobileMenuProps = React.ComponentProps<'div'> & {
   open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
   if (!open || typeof window === 'undefined') return null;

   return createPortal(
      <div
         id="mobile-menu"
         className={cn(
            'bg-white/95 dark:bg-secondary-950/95 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-secondary-950/90 backdrop-blur-xl',
            'fixed top-24 right-4 left-4 bottom-4 z-40 flex flex-col overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-[32px] shadow-2xl',
         )}
      >
         <div
            data-slot={open ? 'open' : 'closed'}
            className={cn(
               'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
               'size-full p-6 overflow-y-auto',
               className,
            )}
            {...props}
         >
            {children}
         </div>
      </div>,
      document.body,
   );
}

const Navbar = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { isDark, toggleTheme } = useTheme();
   const location = useLocation();
   const navigate = useNavigate();

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

   const buildNavItems = (pages: Page[]): NavItem[] => {
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
         { id: 1, label: 'Beranda', path: '/', slug: 'home', children: [] },
         { id: 2, label: 'Tentang Kami', path: '/about', slug: 'about-us', children: [] },
         { id: 3, label: 'Layanan', path: '/services', slug: 'services', children: [] },
         { id: 4, label: 'Portfolio', path: '/portfolio', slug: 'portfolio', children: [] },
         { id: 5, label: 'Blog', path: '/blog', slug: 'blog', children: [] },
         { id: 6, label: 'Kontak', path: '/contact', slug: 'contact', children: [] },
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

   useEffect(() => {
      if (isMobileMenuOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }
      return () => {
         document.body.style.overflow = '';
      };
   }, [isMobileMenuOpen]);

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
            'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
            isScrolled ? 'p-0' : 'px-4 py-4 md:px-8 md:py-6'
         )}
      >
         {/* Scroll Progress Bar */}
         <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary-600 to-primary-400 origin-left z-60"
            style={{ scaleX }}
         />

         <div
            className={cn(
               'transition-all duration-500 flex items-center ease-out',
               isScrolled
                  ? 'w-full rounded-none glass-card bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg border-b border-neutral-200/50 dark:border-white/10'
                  : 'container-custom mx-auto rounded-full bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-neutral-900/70'
            )}
         >
            <div className={cn(
               "w-full flex items-center justify-between transition-all duration-300",
               isScrolled ? "container-custom py-4" : "px-6 py-4"
            )}>
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

               {/* Desktop Navigation with Mega Menu */}
               <NavigationMenu className="hidden lg:flex">
                  <NavigationMenuList>
                     {displayItems.map((item) => (
                        <NavigationMenuItem key={item.id}>
                           {item.children && item.children.length > 0 ? (
                              <>
                                 <NavigationMenuTrigger
                                    onClick={() => navigate(item.path)}
                                    className={cn(
                                       "text-[12px] uppercase tracking-widest font-bold",
                                       (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`)))
                                          ? 'text-primary-600 dark:text-primary-400'
                                          : 'text-neutral-600 dark:text-neutral-300'
                                    )}>
                                    {item.label}
                                 </NavigationMenuTrigger>
                                 <NavigationMenuContent className="bg-white dark:bg-secondary-950 p-1 pr-1.5">
                                    <ul className="bg-white dark:bg-secondary-950 grid w-[500px] grid-cols-2 gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 p-3 shadow-xl">
                                       {item.children.map((child, i) => {
                                          const MenuIcon = getIconByName(child.iconName || '') || Zap;
                                          return (
                                             <li key={i}>
                                                <ListItem
                                                   title={child.label}
                                                   href={child.path}
                                                   icon={MenuIcon}
                                                   description={`Explore ${child.label}`}
                                                />
                                             </li>
                                          );
                                       })}
                                    </ul>
                                 </NavigationMenuContent>
                              </>
                           ) : (
                              <NavigationMenuLink
                                 asChild
                                 className={cn(
                                       "text-[12px] uppercase tracking-widest font-bold px-4 py-2.5 rounded-full transition-all duration-300",
                                       (location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}/`)))
                                          ? 'text-primary-600 dark:text-white bg-primary-50/50 dark:bg-white/10'
                                          : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
                                    )}
                                 >
                                 <Link to={item.path}>{item.label}</Link>
                              </NavigationMenuLink>
                           )}
                        </NavigationMenuItem>
                     ))}
                  </NavigationMenuList>
               </NavigationMenu>

               {/* Action Buttons */}
               <div className="hidden lg:flex items-center gap-3">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={toggleTheme}
                     className="rounded-full"
                     aria-label="Toggle Theme"
                  >
                     {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>

                  <Button
                     asChild
                     className="relative group px-6 py-3 overflow-hidden rounded-[16px] font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)]"
                  >
                     <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <span className="flex items-center gap-2">
                           Konsultasi Gratis
                           <ArrowUpRight className="w-4 h-4 translate-y-0.5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </a>
                  </Button>
               </div>

               {/* Mobile Toggle */}
               <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden rounded-2xl"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Toggle menu"
               >
                  <MenuToggleIcon open={isMobileMenuOpen} className="size-5" duration={300} />
               </Button>
            </div>
         </div>

         {/* Mobile Menu */}
         <MobileMenu open={isMobileMenuOpen} className="flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
               {displayItems.map((item, i) => (
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     key={item.id}
                     className="flex flex-col gap-2"
                  >
                     <Link
                        to={item.path}
                        className={cn(
                           'text-lg font-display font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-between',
                           location.pathname === item.path
                              ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20'
                              : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-secondary-800'
                        )}
                        onClick={() => !item.children?.length && setIsMobileMenuOpen(false)}
                     >
                        {item.label}
                        {item.children?.length ? null : (
                           <ArrowUpRight className={cn(
                              "w-5 h-5 transition-transform",
                              location.pathname === item.path ? "opacity-100" : "opacity-0"
                           )} />
                        )}
                     </Link>

                     {/* Mobile Nested Menu */}
                     {item.children && item.children.length > 0 && (
                        <div className="ml-6 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 flex flex-col gap-2">
                           {item.children.map((child) => {
                              const MenuIcon = getIconByName(child.iconName || '') || Zap;
                              return (
                                 <Link
                                    key={child.id}
                                    to={child.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                       "py-3 px-4 rounded-xl flex items-center gap-3 transition-all",
                                       location.pathname === child.path
                                          ? "bg-primary-500/5 text-primary-600 dark:text-primary-400"
                                          : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-secondary-800"
                                    )}
                                 >
                                    <MenuIcon className="w-5 h-5" />
                                    <span className="text-base font-bold">{child.label}</span>
                                 </Link>
                              );
                           })}
                        </div>
                     )}
                  </motion.div>
               ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
               <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={toggleTheme}
               >
                  {isDark ? <><Sun className="w-5 h-5 mr-2" /> Light Mode</> : <><Moon className="w-5 h-5 mr-2" /> Dark Mode</>}
               </Button>
               <Button asChild className="w-full">
                  <a
                     href={`https://wa.me/${whatsappNumber}`}
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Zap className="w-5 h-5 mr-2 fill-current" />
                     Konsultasi Sekarang
                  </a>
               </Button>
            </div>
         </MobileMenu>
      </nav>
   );
};

export default Navbar;