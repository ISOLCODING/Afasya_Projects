import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
   ArrowLeft,
   Calendar,
   User,
   Tag,
   Clock,
   ChevronRight,
   Share2
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import { getPostBySlug } from '@/lib/api';
import { getStorageUrl } from '@/lib/utils';
import type { Post } from '@/lib/api/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const BlogDetail = () => {
   const { slug } = useParams<{ slug: string }>();

   const {
      data: response,
      isLoading,
      error
   } = useQuery({
      queryKey: ['post', slug],
      queryFn: () => getPostBySlug(slug!),
      enabled: !!slug,
   });

   const post = response?.success ? (response.data as Post) : null;

   const formatDate = (dateString: string) => {
      try {
         return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
      } catch {
         return dateString;
      }
   };

   if (isLoading) {
      return (
         <PageLayout>
            <div className="pt-40 pb-20">
               <LoadingSpinner message="Memuat artikel..." />
            </div>
         </PageLayout>
      );
   }

   if (error || !post) {
      return (
         <PageLayout>
            <Section>
               <div className="pt-40 pb-20 text-center">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">Artikel Tidak Ditemukan</h2>
                  <p className="text-secondary-600 mb-8">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
                  <Link to="/blog" className="btn btn-primary px-8">
                     Kembali ke Blog
                  </Link>
               </div>
            </Section>
         </PageLayout>
      );
   }

   return (
      <PageLayout>
         {/* Hero Header */}
         <section className="pt-40 pb-20 bg-secondary-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />

            <div className="container-custom relative z-10">
               <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8 group"
               >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Kembali ke Blog
               </Link>

               <div className="max-w-4xl">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6"
                  >
                     {post.category}
                  </motion.div>
                  <motion.h1
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-8 leading-tight"
                  >
                     {post.title}
                  </motion.h1>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="flex flex-wrap gap-6 text-secondary-300"
                  >
                     <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary-500" />
                        <span>{post.author.name}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary-500" />
                        <span>{formatDate(post.published_at)}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary-500" />
                        <span>5 min read</span>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Article Content */}
         <Section background="white">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
               {/* Main Article */}
               <div className="lg:col-span-3">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="mb-10 rounded-[32px] overflow-hidden shadow-2xl"
                  >
                     {post.featured_image && (
                        <img
                           src={getStorageUrl(post.featured_image)}
                           alt={post.title}
                           className="w-full aspect-video object-cover"
                        />
                     )}
                  </motion.div>

                  <div className="prose prose-lg max-w-none prose-primary prose-headings:font-display prose-headings:font-bold prose-p:text-secondary-600 prose-img:rounded-3xl">
                     <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Tags & Share */}
                  <div className="mt-16 pt-8 border-t border-secondary-100 flex flex-wrap items-center justify-between gap-6">
                     <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-2 text-secondary-500 text-sm mr-2">
                           <Tag className="w-4 h-4" /> Tag:
                        </span>
                        {post.tags ? post.tags.map((tag: string, i: number) => (
                           <span key={i} className="px-3 py-1 bg-secondary-50 text-secondary-600 text-xs font-medium rounded-full">
                              #{tag}
                           </span>
                        )) : (
                           <span className="text-secondary-400 text-sm">No tags</span>
                        )}
                     </div>

                     <button className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors font-medium">
                        <Share2 className="w-5 h-5" /> Bagikan Artikel
                     </button>
                  </div>
               </div>

               {/* Sidebar */}
               <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-10">
                     {/* Newsletter Card */}
                     <div className="bg-primary-600 rounded-[32px] p-8 text-white">
                        <h4 className="text-xl font-bold mb-4">Berlangganan Newsletter</h4>
                        <p className="text-primary-100 text-sm mb-6">
                           Dapatkan tips digital marketing dan teknologi terbaru langsung di email Anda.
                        </p>
                        <form className="space-y-3">
                           <input
                              type="email"
                              placeholder="Email Anda"
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                           />
                           <button className="w-full py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors">
                              Daftar Sekarang
                           </button>
                        </form>
                     </div>

                     <div className="p-8 border border-secondary-100 rounded-[32px] bg-secondary-50">
                        <h4 className="font-bold text-secondary-900 mb-6">Penulis</h4>
                        <div className="flex items-center gap-4">
                           {post.author.avatar ? (
                              <img
                                 src={getStorageUrl(post.author.avatar)}
                                 alt={post.author.name}
                                 className="w-16 h-16 rounded-full object-cover"
                              />
                           ) : (
                                 <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl uppercase">
                                    {post.author.name.charAt(0)}
                                 </div>
                           )}
                           <div>
                              <div className="font-bold text-secondary-900">{post.author.name}</div>
                              <div className="text-sm text-secondary-500">Content Strategist</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Section>

         {/* Call to Action */}
         <Section background="gray" className="py-20">
            <div className="text-center max-w-3xl mx-auto">
               <h3 className="text-3xl md:text-4xl font-display font-extrabold text-secondary-900 mb-6">
                  Butuh Solusi Digital untuk Bisnis Anda?
               </h3>
               <p className="text-lg text-secondary-600 mb-10">
                  Konsultasikan kebutuhan teknologi dan desain Anda dengan tim ahli kami secara gratis.
               </p>
               <Link
                  to="/contact"
                  className="btn btn-primary px-10 h-14 rounded-2xl inline-flex items-center gap-3 text-lg"
               >
                  Hubungi Kami Sekarang <ChevronRight className="w-5 h-5" />
               </Link>
            </div>
         </Section>
      </PageLayout>
   );
};

export default BlogDetail;
