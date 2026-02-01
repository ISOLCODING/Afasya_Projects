import { useQuery } from '@tanstack/react-query';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { getPage } from '@/lib/api';
import ContentBlocks from '@/components/sections/ContentBlocks';

const DynamicPage = ({ slugOverride }: { slugOverride?: string }) => {
   const { slug: paramsSlug } = useParams<{ slug: string }>();
   const slug = slugOverride || paramsSlug;

   const { data: page, isLoading, error } = useQuery({
      queryKey: ['page', slug],
      queryFn: () => getPage(slug!).then(res => res.data),
      enabled: !!slug,
   });

   if (error) return <Navigate to="/404" />;

   return (
      <PageLayout>
         {/* Header - Only show if not using a Hero block as the first element */}
         {(!Array.isArray(page?.content) || page?.content[0]?.type !== 'hero') && (
            <section className="pt-40 pb-20 bg-secondary-900 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
               <div className="container-custom relative z-10">
                  <SectionHeader
                     light
                     align="left"
                     title={page?.title || 'Loading...'}
                     description={page?.excerpt}
                     className="mb-0"
                  />
               </div>
            </section>
         )}

         {isLoading ? (
            <Section background="white">
               <div className="space-y-6">
                  <div className="h-4 bg-secondary-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-secondary-100 rounded w-full animate-pulse" />
                  <div className="h-4 bg-secondary-100 rounded w-5/6 animate-pulse" />
               </div>
            </Section>
         ) : (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="min-h-[400px]"
            >
               {Array.isArray(page?.content) ? (
                  <ContentBlocks blocks={page.content} />
               ) : (
                  <Section background="white">
                     <div
                        className="prose prose-lg max-w-4xl mx-auto prose-primary prose-headings:font-display prose-headings:font-bold prose-p:text-secondary-600"
                        dangerouslySetInnerHTML={{ __html: page?.content || '' }}
                     />
                  </Section>
               )}
            </motion.div>
         )}
      </PageLayout>
   );
};

export default DynamicPage;
