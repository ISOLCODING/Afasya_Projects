import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStorageUrl } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Post {
   id: number;
   title: string;
   slug: string;
   excerpt?: string;
   image_url?: string;
   author: string;
   category: string;
   published_at: string;
}

interface BlogCardProps {
   post: Post;
   index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
   const formatDate = (dateString: string) => {
      try {
         return format(new Date(dateString), 'dd MMM yyyy', { locale: id });
      } catch {
         return dateString;
      }
   };

   return (
      <motion.article
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1, duration: 0.5 }}
         className="group glass-card bg-white dark:bg-secondary-900/40 rounded-[32px] overflow-hidden border border-neutral-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 flex flex-col h-full"
      >
         <Link to={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
            {post.image_url ? (
               <motion.img
                  src={getStorageUrl(post.image_url)}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
               />
            ) : (
                  <div className="w-full h-full bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <span className="text-white text-4xl font-display font-bold">
                     {post?.title?.[0] || 'B'}
                  </span>
               </div>
            )}

            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
               <span className="bg-white/90 dark:bg-secondary-950/90 backdrop-blur-md text-primary-600 dark:text-primary-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  {post.category}
               </span>
            </div>

            {/* Glossy Overlay on Hover */}
            <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors duration-500" />
         </Link>

         <div className="p-8 flex flex-col grow">
            <div className="flex items-center gap-4 text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4">
               <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary-500" />
                  <span>{formatDate(post.published_at)}</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800" />
               <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary-500" />
                  <span>{post.author}</span>
               </div>
            </div>

            <Link to={`/blog/${post.slug}`} className="block group/title">
               <h2
                  className="text-xl md:text-2xl font-display font-black text-neutral-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors"
                  dangerouslySetInnerHTML={{ __html: post.title }}
               />
            </Link>

            {post.excerpt && (
               <p
                  className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
               />
            )}

            <div className="mt-auto pt-6 border-t border-neutral-50 dark:border-white/5">
               <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-black text-xs uppercase tracking-widest group/btn"
               >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
               </Link>
            </div>
         </div>
      </motion.article>
   );
};

export default BlogCard;
