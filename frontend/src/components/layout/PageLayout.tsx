import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { getSettings } from '@/lib/api';
import { getStorageUrl } from '@/lib/utils';
import PointerGlow from '../ui/PointerGlow';

interface PageLayoutProps {
   children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
   const { data: settingsResponse } = useQuery({
      queryKey: ['settings'],
      queryFn: () => getSettings(),
      staleTime: 0,
   });

   const settings = settingsResponse?.success ? settingsResponse.data : {};
   const siteTitle = settings?.site_name || 'Afasya Projects';
   const siteDescription = settings?.site_description || 'Solusi Digital Terpercaya untuk UMKM';

   // Stabilize favicon URL to prevent constant re-requests and flickering
   const faviconUrl = useMemo(() => {
      if (!settings?.site_favicon) return '/favicon.png';
      return getStorageUrl(settings.site_favicon);
   }, [settings?.site_favicon]);

   return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-secondary-950 relative overflow-x-hidden selection:bg-primary-500/30 selection:text-primary-900 dark:selection:text-white transition-colors duration-300">
         <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <link rel="icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} />
         </Helmet>

         {/* Global Tech Background - Premium Visuals */}
         <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Mesh Grid Utility */}
            <div className="absolute inset-0 bg-grid-tech opacity-[0.03] dark:opacity-[0.15]" />

            {/* Dynamic Glow Orbs */}
            <motion.div
               animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
               }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/5 dark:bg-primary-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-glow"
            />
            <motion.div
               animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0]
               }}
               transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-600/5 dark:bg-accent-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-float"
            />

            {/* Decorative Lines */}
            <div className="absolute top-[20%] left-[5%] w-px h-32 bg-linear-to-b from-transparent via-primary-500/20 to-transparent" />
            <div className="absolute bottom-[20%] right-[5%] w-px h-32 bg-linear-to-b from-transparent via-accent-500/20 to-transparent" />
         </div>

         {/* Cursor Glow Effect */}
         <PointerGlow />

         {/* Navigation Container */}
         <header className="relative z-50">
            <Navbar />
         </header>

         {/* Main Content Area */}
         <main id="main-content" className="grow relative z-10 antialiased">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
            >
               {children}
            </motion.div>
         </main>

         {/* Footer Area */}
         <footer className="relative z-10">
            <Footer />
         </footer>
      </div>
   );
};

export default PageLayout;
