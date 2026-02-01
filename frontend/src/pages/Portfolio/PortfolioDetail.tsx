// g:\laragon\www\LARAVEL 12\Afasya_Projects\frontend\src\pages\Portfolio\PortfolioDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
   ArrowLeft,
   ExternalLink,
   Github,
   Globe,
   Calendar,
   User,
   Tag,
   CheckCircle2,
   ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import { getPortfolioBySlug } from '@/lib/api';
import { getStorageUrl } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const PortfolioDetail = () => {
   const { slug } = useParams<{ slug: string }>();

   const {
      data: response,
      isLoading,
      error
   } = useQuery({
      queryKey: ['portfolio', slug],
      queryFn: () => getPortfolioBySlug(slug!),
      enabled: !!slug,
   });

   const project = response?.success ? response.data : null;

   if (isLoading) {
      return (
         <PageLayout>
            <div className="pt-40 pb-20">
               <LoadingSpinner message="Memuat detail proyek..." />
            </div>
         </PageLayout>
      );
   }

   if (error || !project) {
      return (
         <PageLayout>
            <Section>
               <div className="pt-40 pb-20 text-center">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">Proyek Tidak Ditemukan</h2>
                  <p className="text-secondary-600 mb-8">Maaf, proyek yang Anda cari tidak tersedia atau telah dihapus.</p>
                  <Link to="/portfolio" className="btn btn-primary px-8">
                     Kembali ke Portfolio
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
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
               <img
                  src={getStorageUrl(project.featured_image)}
                  alt={project.title}
                  className="w-full h-full object-cover blur-sm"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-secondary-950 via-secondary-900 to-secondary-900" />
            </div>

            <div className="container-custom relative z-10">
               <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-8 group"
               >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Kembali ke Portfolio
               </Link>

               <div className="max-w-4xl">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6"
                  >
                     {project.category}
                  </motion.div>
                  <motion.h1
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8 leading-tight"
                  >
                     {project.title}
                  </motion.h1>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="flex flex-wrap gap-6 text-secondary-300"
                  >
                     <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary-500" />
                        <span>Klien: {project.client_name}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary-500" />
                        <span>Selesai: {project.completion_date ? new Date(project.completion_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary-500" />
                        <span>Industri: {project.industry}</span>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Main Content */}
         <Section background="white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
               {/* Description Side */}
               <div className="lg:col-span-2">
                  <div className="mb-12">
                     <h2 className="text-3xl font-bold text-secondary-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-primary-600 rounded-full" />
                        Tentang Proyek
                     </h2>
                     <div className="prose prose-lg max-w-none text-secondary-600" dangerouslySetInnerHTML={{ __html: project.description }} />
                  </div>

                  {project.challenge && (
                     <div className="mb-12 p-8 bg-secondary-50 rounded-[32px] border border-secondary-100">
                        <h3 className="text-2xl font-bold text-secondary-900 mb-4 flex items-center gap-2">
                           <CheckCircle2 className="w-6 h-6 text-primary-600" />
                           Tantangan
                        </h3>
                        <p className="text-secondary-600 leading-relaxed">{project.challenge}</p>
                     </div>
                  )}

                  {project.solution && (
                     <div className="mb-12 p-8 bg-primary-50 rounded-[32px] border border-primary-100">
                        <h3 className="text-2xl font-bold text-secondary-900 mb-4 flex items-center gap-2">
                           <CheckCircle2 className="w-6 h-6 text-primary-600" />
                           Solusi Kami
                        </h3>
                        <p className="text-secondary-600 leading-relaxed">{project.solution}</p>
                     </div>
                  )}

                  {project.results && (
                     <div className="mb-12">
                        <h3 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-3">
                           <span className="w-8 h-1 bg-primary-600 rounded-full" />
                           Hasil Akhir
                        </h3>
                        <p className="text-secondary-600 leading-relaxed">{project.results}</p>
                     </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-12">
                     <h3 className="text-2xl font-bold text-secondary-900 mb-6">Teknologi yang Digunakan</h3>
                     <div className="flex flex-wrap gap-3">
                        {Array.isArray(project.tech_stack) ? project.tech_stack.map((tech: string, i: number) => (
                           <span key={i} className="px-5 py-2 bg-secondary-50 border border-secondary-100 rounded-2xl text-secondary-700 font-medium text-sm">
                              {tech}
                           </span>
                        )) : (
                           <span className="text-secondary-500 italic">Data teknologi tidak tersedia</span>
                        )}
                     </div>
                  </div>
               </div>

               {/* Sidebar Info */}
               <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                     {/* Featured Image / Card */}
                     <div className="rounded-[40px] overflow-hidden shadow-2xl border border-secondary-100">
                        <img
                           src={getStorageUrl(project.featured_image)}
                           alt={project.title}
                           className="w-full object-cover"
                        />
                     </div>

                     {/* Action Buttons */}
                     <div className="space-y-4">
                        {project.project_url && (
                           <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full btn btn-primary flex items-center justify-center gap-2 h-14 rounded-2xl"
                           >
                              Kunjungi Website <Globe className="w-5 h-5" />
                           </a>
                        )}
                        {project.demo_url && (
                           <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full btn bg-secondary-900 text-white hover:bg-secondary-800 flex items-center justify-center gap-2 h-14 rounded-2xl"
                           >
                              Lihat Demo <ExternalLink className="w-5 h-5" />
                           </a>
                        )}
                        {project.github_url && (
                           <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full btn bg-white border-2 border-secondary-200 text-secondary-900 hover:border-secondary-900 flex items-center justify-center gap-2 h-14 rounded-2xl"
                           >
                              Source Code <Github className="w-5 h-5" />
                           </a>
                        )}
                     </div>

                     {/* Project Info Card */}
                     <div className="bg-secondary-50 rounded-[32px] p-8 border border-secondary-100">
                        <h4 className="font-bold text-secondary-900 mb-6">Detail Proyek</h4>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center py-3 border-b border-secondary-200">
                              <span className="text-secondary-500 text-sm">Klien</span>
                              <span className="text-secondary-900 font-bold text-sm">{project.client_name}</span>
                           </div>
                           <div className="flex justify-between items-center py-3 border-b border-secondary-200">
                              <span className="text-secondary-500 text-sm">Industri</span>
                              <span className="text-secondary-900 font-bold text-sm">{project.industry}</span>
                           </div>
                           <div className="flex justify-between items-center py-3 border-b border-secondary-200">
                              <span className="text-secondary-500 text-sm">Status</span>
                              <span className="capitalize text-primary-600 font-bold text-sm">{project.status}</span>
                           </div>
                           <div className="flex justify-between items-center py-3 border-b border-secondary-200">
                              <span className="text-secondary-500 text-sm">Platform</span>
                              <span className="text-secondary-900 font-bold text-sm">{project.category}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Section>

         {/* Navigation Between Projects could go here */}
         <Section background="gray" className="py-20">
            <div className="text-center max-w-2xl mx-auto">
               <h3 className="text-3xl font-display font-extrabold text-secondary-900 mb-4">Tertarik dengan Proyek Ini?</h3>
               <p className="text-secondary-600 mb-10">Beri tahu kami kebutuhan Anda dan kami akan memberikan solusi terbaik untuk bisnis Anda.</p>
               <Link to="/contact" className="btn btn-primary px-10 h-14 rounded-2xl inline-flex items-center gap-2">
                  Mulai Project Anda Sekarang <ChevronRight className="w-5 h-5" />
               </Link>
            </div>
         </Section>
      </PageLayout>
   );
};

export default PortfolioDetail;
