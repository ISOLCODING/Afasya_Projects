// src/pages/Home/index.tsx
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/layout/PageLayout';
import ContentBlocks from '@/components/sections/ContentBlocks';
import { getPage } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ScrollProgress from '@/components/ui/ScrollProgress';

const Home = () => {
   // Query Options for better caching and performance
   const queryOptions = {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1
   };

   // Fetch page data
   const { data: pageResponse, isLoading: pageLoading, error: pageError } = useQuery({
      queryKey: ['page', 'home'],
      queryFn: () => getPage('home'),
      ...queryOptions
   });

   // Extract data
   const pageData = pageResponse?.success ? pageResponse.data : null;

   // Loading state
   if (pageLoading) {
      return (
         <PageLayout>
            <LoadingSpinner message="Memuat halaman..." />
         </PageLayout>
      );
   }

   // Error state
   if (pageError || !pageData) {
      return (
         <PageLayout>
            <div className="min-h-screen flex items-center justify-center">
               <div className="text-center max-w-2xl mx-auto px-4">
                  <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                     Gagal Memuat Halaman
                  </h1>
                  <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                     Terjadi kesalahan saat memuat data. Pastikan backend server sedang berjalan.
                  </p>
                  <button
                     onClick={() => window.location.reload()}
                     className="btn btn-primary px-8 py-3"
                  >
                     Muat Ulang
                  </button>
               </div>
            </div>
         </PageLayout>
      );
   }

   // Empty state - no content blocks configured
   if (!pageData.content || !Array.isArray(pageData.content) || pageData.content.length === 0) {
      return (
         <PageLayout>
            <div className="min-h-screen flex items-center justify-center">
               <div className="text-center max-w-2xl mx-auto px-4">
                  <h1 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                     Halaman Belum Dikonfigurasi
                  </h1>
                  <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                     Konten halaman ini belum diatur. Silakan isi content blocks di admin panel untuk menampilkan konten.
                  </p>
                  <a
                     href="/admin/content-pages"
                     className="btn btn-primary px-8 py-3"
                  >
                     Buka Admin Panel
                  </a>
               </div>
            </div>
         </PageLayout>
      );
   }

   // Render with dynamic content blocks
   return (
      <PageLayout>
         {/* Scroll Progress Indicator */}
         <ScrollProgress position="top" color="bg-primary-500" height={4} />

         {/* Render all content blocks from backend */}
         <ContentBlocks blocks={pageData.content} />
      </PageLayout>
   );
};

export default Home;