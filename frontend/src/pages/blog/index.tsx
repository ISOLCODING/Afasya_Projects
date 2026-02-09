import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getPosts } from '@/lib/api';
import BlogCard from '@/components/ui/BlogCard';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';

import type { Post } from '@/lib/api/types';

const BlogPage = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const postsPerPage = 6;

   const { data: posts, isLoading } = useQuery<Post[]>({
      queryKey: ['posts', currentPage],
      queryFn: async () => {
         try {
            const response = await getPosts();
            if (response.success && response.data) {
               return response.data;
            }
            return [];
         } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
         }
      },
   });

   // Pagination logic
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost) || [];
   const totalPages = Math.ceil((posts?.length || 0) / postsPerPage);

   if (isLoading) {
      return (
         <PageLayout>
            <div className="min-h-screen pt-40 pb-16">
               <div className="container-custom">
                  <div className="flex flex-col items-center text-center mb-20">
                     <div className="h-4 w-32 bg-secondary-100 animate-pulse rounded-full mb-6" />
                     <div className="h-12 w-64 bg-secondary-100 animate-pulse rounded-2xl mb-4" />
                     <div className="h-4 w-96 bg-secondary-100 animate-pulse rounded-full max-w-full" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-[32px] border border-secondary-100 h-[500px] animate-pulse overflow-hidden">
                           <div className="h-64 bg-secondary-50" />
                           <div className="p-8 space-y-4">
                              <div className="h-4 w-32 bg-secondary-50 rounded" />
                              <div className="h-8 w-full bg-secondary-50 rounded" />
                              <div className="h-4 w-full bg-secondary-50 rounded" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </PageLayout>
      );
   }

   return (
      <PageLayout>
         <div className="min-h-screen">
            {/* Modern Header Section */}
            <section className="pt-48 pb-24 bg-secondary-900 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] -ml-64 -mb-64" />

               <div className="container-custom relative z-10 text-center">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-[0.3em] mb-8"
                  >
                     Update Digital
                  </motion.div>

                  <motion.h1
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white mb-8 leading-tight tracking-tight"
                  >
                     Insights & <span className="text-primary-500">Inspirasi</span>
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto leading-relaxed"
                  >
                     Jelajahi pemikiran terbaru kami tentang teknologi, desain masa depan,
                     dan strategi transformasi bisnis digital yang efektif.
                  </motion.p>
               </div>
            </section>

            {/* Blog Listings Section */}
            <Section background="white" className="-mt-12 pb-32">
               <div className="container-custom">
                  {currentPosts.length > 0 ? (
                     <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                           {currentPosts.map((post, index) => (
                              <BlogCard key={post.id} post={post} index={index} />
                           ))}
                        </div>

                        {totalPages > 1 && (
                           <div className="flex flex-col items-center gap-8 pt-12 border-t border-secondary-50">
                              <div className="flex items-center gap-2">
                                 <button
                                    onClick={() => {
                                       setCurrentPage(prev => Math.max(prev - 1, 1));
                                       window.scrollTo({ top: 400, behavior: 'smooth' });
                                    }}
                                    disabled={currentPage === 1}
                                    className="w-12 h-12 rounded-2xl border border-secondary-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary-50 transition-all text-secondary-900"
                                 >
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                 </button>

                                 <div className="flex gap-2 mx-4">
                                    {[...Array(totalPages)].map((_, index) => (
                                       <button
                                          key={index}
                                          onClick={() => {
                                             setCurrentPage(index + 1);
                                             window.scrollTo({ top: 400, behavior: 'smooth' });
                                          }}
                                          className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 ${currentPage === index + 1
                                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                                : 'text-secondary-600 hover:bg-secondary-50'
                                             }`}
                                       >
                                          {index + 1}
                                       </button>
                                    ))}
                                 </div>

                                 <button
                                    onClick={() => {
                                       setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                       window.scrollTo({ top: 400, behavior: 'smooth' });
                                    }}
                                    disabled={currentPage === totalPages}
                                    className="w-12 h-12 rounded-2xl border border-secondary-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary-50 transition-all text-secondary-900"
                                 >
                                    <ArrowRight className="w-5 h-5" />
                                 </button>
                              </div>

                              <div className="text-secondary-400 text-sm font-medium tracking-wide flex items-center gap-2">
                                 <span>MENAMPILKAN</span>
                                 <span className="text-secondary-900 font-bold">{indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts?.length || 0)}</span>
                                 <span>DARI</span>
                                 <span className="text-secondary-900 font-bold">{posts?.length || 0}</span>
                                 <span>ARTIKEL</span>
                              </div>
                           </div>
                        )}
                     </>
                  ) : (
                     <div className="text-center py-32 bg-secondary-50 rounded-[48px] border-2 border-dashed border-secondary-200">
                        <div className="text-7xl mb-8 grayscale opacity-50">✍️</div>
                        <h3 className="text-3xl font-display font-bold text-secondary-900 mb-4">
                           Belum Ada Artikel
                        </h3>
                        <p className="text-lg text-secondary-500 max-w-md mx-auto">
                           Kami sedang meracik konten menarik untuk Anda. Silakan kembali lagi beberapa saat lagi.
                        </p>
                     </div>
                  )}
               </div>
            </Section>

            {/* Mini CTA */}
            <Section className="pb-32">
               <div className="bg-linear-to-r from-secondary-900 to-secondary-950 rounded-[48px] p-8 md:p-16 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                     <div className="text-center lg:text-left">
                        <h3 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                           Tingkatkan Bisnis <br className="hidden md:block" />
                           Sekarang Juga
                        </h3>
                        <p className="text-xl text-secondary-300 max-w-xl">
                           Dapatkan konsultasi gratis dan strategi digital yang tepat sasaran untuk kesuksesan brand Anda.
                        </p>
                     </div>
                     <Link
                        to="/contact"
                        className="btn btn-primary h-16 px-12 text-lg rounded-2xl shadow-xl shadow-primary-600/20 whitespace-nowrap"
                     >
                        Mulai Kolaborasi
                     </Link>
                  </div>
               </div>
            </Section>
         </div>
      </PageLayout>
   );
};

export default BlogPage;