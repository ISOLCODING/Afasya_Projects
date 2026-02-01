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
         className="group bg-white rounded-[32px] overflow-hidden border border-secondary-100 shadow-sm hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 flex flex-col h-full"
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
               <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <span className="text-white text-4xl font-display font-bold">
                     {post?.title?.[0] || 'B'}
                  </span>
               </div>
            )}

            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
               <span className="bg-white/90 backdrop-blur-md text-primary-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  {post.category}
               </span>
            </div>

            {/* Glossy Overlay on Hover */}
            <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors duration-500" />
         </Link>

         <div className="p-8 flex flex-col flex-grow">
            <div className="flex items-center gap-4 text-[11px] font-bold text-secondary-400 uppercase tracking-widest mb-4">
               <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary-500" />
                  <span>{formatDate(post.published_at)}</span>
               </div>
               <div className="w-1 h-1 rounded-full bg-secondary-200" />
               <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary-500" />
                  <span>{post.author}</span>
               </div>
            </div>

            <Link to={`/blog/${post.slug}`} className="block group/title">
               <h2 className="text-xl md:text-2xl font-display font-bold text-secondary-900 mb-4 line-clamp-2 leading-tight group-hover/title:text-primary-600 transition-colors">
                  {post.title}
               </h2>
            </Link>

            {post.excerpt && (
               <p className="text-secondary-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
               </p>
            )}

            <div className="mt-auto pt-6 border-t border-secondary-50">
               <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm group/btn"
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
