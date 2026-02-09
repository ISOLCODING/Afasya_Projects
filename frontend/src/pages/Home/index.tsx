// src/pages/Home/index.tsx
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
   Code2, Layout, Smartphone, Search, Monitor,
   MessageSquare, Users, Award, ShieldCheck, Zap,
   ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import PortfolioCard from '@/components/ui/PortfolioCard';
import TeamCard from '@/components/ui/TeamCard';
import BlogCard from '@/components/ui/BlogCard';
import ContentBlocks from '@/components/sections/ContentBlocks';
import BrandScroller from '@/components/sections/BrandScroller';
import Hero from '@/components/sections/Hero';
import { getServices, getPortfolios, getSettings, getPage, getTeam, getPosts, getBrands } from '@/lib/api';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { getWhatsAppLink, getConsultationMessage } from '@/lib/whatsapp';
import { Skeleton, SkeletonGrid } from '@/components/ui/Skeleton';

// Helper untuk Service Icons
const getServiceIcon = (name: string) => {
   const low = (name || '').toLowerCase();
   if (low.includes('web')) return Layout;
   if (low.includes('mobile') || low.includes('app')) return Smartphone;
   if (low.includes('design') || low.includes('ui')) return Monitor;
   if (low.includes('marketing') || low.includes('seo')) return Search;
   return Code2;
};

const Home = () => {
   // Query Options for better caching and performance
   const queryOptions = {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1
   };

   // Fetch all data
   const { data: pageResponse } = useQuery({
      queryKey: ['page', 'home'],
      queryFn: () => getPage('home'),
     ...queryOptions
  });

   const { data: servicesResponse, isLoading: servicesLoading } = useQuery({
      queryKey: ['services'],
      queryFn: () => getServices(),
     ...queryOptions
  });

   const {
      data: brandsResponse,
      isLoading: brandsLoading,
      error: brandsError
   } = useQuery({
      queryKey: ['brands'],
      queryFn: () => getBrands(),
      ...queryOptions
   });

   const { data: portfoliosResponse } = useQuery({
      queryKey: ['featured-portfolios'],
      queryFn: () => getPortfolios({ featured: true, limit: 3 }),
     ...queryOptions
  });

   const { data: teamResponse } = useQuery({
      queryKey: ['team'],
      queryFn: () => getTeam(),
     ...queryOptions
  });

   const { data: postsResponse } = useQuery({
      queryKey: ['recent-posts'],
      queryFn: () => getPosts({ limit: 3, published: true }),
     ...queryOptions
  });

   const { data: settingsResponse } = useQuery({
      queryKey: ['settings'],
      queryFn: () => getSettings(),
     ...queryOptions
  });

   // Extract data
   const pageData = pageResponse?.success ? pageResponse.data : null;
   const servicesData = servicesResponse?.success && Array.isArray(servicesResponse.data) ? servicesResponse.data : [];
   const portfoliosData = portfoliosResponse?.success && Array.isArray(portfoliosResponse.data) ? portfoliosResponse.data : [];
   const teamData = teamResponse?.success && Array.isArray(teamResponse.data) ? teamResponse.data : [];
   const postsData = postsResponse?.success && Array.isArray(postsResponse.data) ? postsResponse.data : [];
   const brandsData = brandsResponse?.success && Array.isArray(brandsResponse.data) ? brandsResponse.data : [];
   const settingsData = settingsResponse?.success ? settingsResponse.data : {};

   // Check if we should show content blocks
   const shouldShowContentBlocks = pageData?.content &&
      Array.isArray(pageData.content) &&
      pageData.content.length > 0;

   const siteTitle = settingsData?.site_name || 'Afasya Projects';
   const siteDesc = settingsData?.site_description || 'Solusi Digital Terpercaya untuk UMKM';

   // Features
   const features = [
      { title: 'Pengerjaan Cepat', desc: 'Website Anda bisa online dalam waktu 3-7 hari kerja.', icon: Zap },
      { title: 'Optimasi SEO', desc: 'Website dirancang agar mudah ditemukan di Google.', icon: Search },
      { title: 'Desain Responsif', desc: 'Tampilan rapi di semua perangkat (HP, Tablet, Desktop).', icon: Smartphone },
      { title: 'Support Berkelanjutan', desc: 'Kami siap membantu pemeliharaan website Anda.', icon: MessageSquare }
   ];

   // Loading state - We now use section-based skeletons instead of a full-page loader
   // const isLoading = pageLoading || servicesLoading || brandsLoading;

   return (
      <PageLayout>
         {/* Jika admin sudah mengisi content di CMS */}
         {shouldShowContentBlocks ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
               /* DEFAULT LAYOUT */
               <>
                  {/* Hero Section */}
                  <Hero
                     title={siteTitle}
                     description={siteDesc}
                     image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                     ctaButton={{
                        text: 'Konsultasi Gratis',
                        link: '/konsultasi'
                     }}
                     stats={[
                        { value: servicesData.length || 0, label: 'Layanan' },
                        { value: portfoliosData.length || 0, label: 'Portfolio' },
                        { value: teamData.length || 0, label: 'Tim Ahli' },
                        { value: postsData.length || 0, label: 'Artikel' }
                     ]}
                  />

                  {/* Brand Section */}
                  <div className="py-10">
                     {brandsLoading ? (
                        <div className="container-custom">
                           <div className="flex justify-center gap-8 overflow-hidden">
                              {Array.from({ length: 5 }).map((_, i) => (
                                 <Skeleton key={i} className="h-12 w-32 rounded-lg" />
                              ))}
                           </div>
                        </div>
                     ) : (
                        brandsData.length > 0 && (
                           <BrandScroller
                              brands={brandsData}
                              isLoading={brandsLoading}
                              error={brandsError}
                              title="Partner Collaboration"
                              subtitle="Dipercaya Oleh Brand Ternama"
                              description="Kami bangga bekerja sama dengan perusahaan-perusahaan inovatif untuk menghadirkan solusi digital terbaik."
                           />
                           )
                     )}
                  </div>

                  {/* Services Section */}
                  <Section id="layanan" className="py-20 bg-linear-to-b from-white to-neutral-50 dark:from-secondary-950 dark:to-secondary-900">
                     <div className="container-custom">
                        <SectionHeader
                           title="Layanan Digital Terintegrasi"
                           subtitle="Solusi Lengkap untuk Bisnis Anda"
                           description="Kami menyediakan solusi end-to-end untuk memastikan bisnis Anda sukses di dunia digital."
                           align="center"
                        />
                        <div className="mt-16">
                           {servicesLoading ? (
                              <SkeletonGrid count={6} />
                           ) : (
                              servicesData.length > 0 && (
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {servicesData.map((service, index) => (
                                       <ServiceCard
                                          key={service.id}
                                          title={service.title}
                                          description={service.description}
                                          icon={getServiceIcon(service.title)}
                                          index={index}
                                          slug={service.slug}
                                       />
                                    ))}
                                 </div>
                              )
                           )}
                        </div>
                     </div>
                  </Section>

                  {/* Features Section */}
                  <Section className="py-20 bg-linear-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950/20 dark:via-secondary-900 dark:to-accent-950/20">
                     <div className="container-custom">
                        <SectionHeader
                           title="Mengapa Memilih Kami"
                           subtitle="Keunggulan Afasya Projects"
                           description="Komitmen kami memberikan solusi terbaik dengan pelayanan maksimal untuk kesuksesan bisnis digital Anda."
                           align="center"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                           {features.map((feature, index) => (
                              <motion.div
                                 key={index}
                                 initial={{ opacity: 0, y: 30 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: true }}
                                 transition={{ delay: index * 0.1 }}
                                 className="group"
                              >
                                 <div className="p-6 rounded-3xl bg-white/80 dark:bg-white/5 border-2 border-neutral-200/50 dark:border-white/10 backdrop-blur-sm hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/10">
                                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                       <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-neutral-950 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </Section>

                  {/* Portfolio Section */}
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                  >
                     <Section id="portfolio" className="py-20 bg-linear-to-b from-white to-neutral-50 dark:from-secondary-950 dark:to-secondary-900">
                        <div className="container-custom">
                           <SectionHeader
                              title="Portfolio Terbaru"
                              subtitle="Hasil Karya Kami"
                              description="Beberapa project terbaik yang telah kami selesaikan untuk berbagai klien."
                              align="center"
                           />
                           <div className="mt-16">
                              {portfoliosData.length === 0 ? (
                                 <SkeletonGrid count={3} />
                              ) : (
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {portfoliosData.map((portfolio, index) => (
                                       <PortfolioCard
                                          key={portfolio.id}
                                          title={portfolio.title}
                                          image={portfolio.featured_image || portfolio.images?.[0] || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974'}
                                          category={portfolio.category?.name || 'Web Development'}
                                          slug={portfolio.slug}
                                          index={index}
                                       />
                                    ))}
                                 </div>
                              )}
                           </div>
                           <div className="text-center mt-12">
                              <Link
                                 to="/portfolio"
                                 className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-600 to-primary-700 text-white font-black rounded-full hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-500 hover:scale-105"
                              >
                                 Lihat Semua Portfolio
                                 <ArrowRight size={20} />
                              </Link>
                           </div>
                        </div>
                     </Section>
                  </motion.div>

                  {/* Team Section */}
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.8, delay: 0.3 }}
                  >
                     <Section id="tim" className="py-20 bg-linear-to-br from-neutral-50 via-white to-neutral-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
                        <div className="container-custom">
                           <SectionHeader
                              title="Tim Ahli Kami"
                              subtitle="Profesional Berpengalaman"
                              description="Dibackup oleh tim yang kompeten dan berpengalaman di bidangnya masing-masing."
                              align="center"
                           />
                           <div className="mt-16">
                              {teamData.length === 0 ? (
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                       <div key={i} className="space-y-4">
                                          <Skeleton className="h-64 w-full rounded-3xl" />
                                          <Skeleton className="h-6 w-1/2 mx-auto" />
                                       </div>
                                    ))}
                                 </div>
                              ) : (
                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {teamData.slice(0, 4).map((member, index) => (
                                       <TeamCard
                                          key={member.id}
                                          name={member.name}
                                          position={member.position}
                                          image={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0ea5e9&color=fff&size=400`}
                                          socialLinks={{
                                             linkedin: member.linkedin_url,
                                             github: member.github_url,
                                             instagram: member.instagram_url
                                          }}
                                          index={index}
                                       />
                                    ))}
                                 </div>
                              )}
                           </div>
                        </div>
                     </Section>
                  </motion.div>

                  {/* Blog Section */}
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, amount: 0.3 }}
                     transition={{ duration: 0.8, delay: 0.4 }}
                  >
                     <Section id="blog" className="py-20 bg-linear-to-b from-white to-neutral-50 dark:from-secondary-950 dark:to-secondary-900">
                        <div className="container-custom">
                           <SectionHeader
                              title="Artikel Terbaru"
                              subtitle="Tips & Insight Digital"
                              description="Kumpulan artikel bermanfaat seputar teknologi, pemasaran digital, dan pengembangan bisnis."
                              align="center"
                           />
                           <div className="mt-16">
                              {postsData.length === 0 ? (
                                 <SkeletonGrid count={3} />
                              ) : (
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {postsData.map((post, index) => (
                                       <BlogCard
                                          key={post.id}
                                          post={{
                                             id: post.id,
                                             title: post.title,
                                             slug: post.slug,
                                             excerpt: post.excerpt || post.content?.substring(0, 150) + '...',
                                             image_url: post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070',
                                             category: post.category?.name || 'Digital',
                                             author: post.author?.name || 'Admin',
                                             published_at: post.published_at || post.created_at
                                          }}
                                          index={index}
                                       />
                                    ))}
                                 </div>
                              )}
                           </div>
                           <div className="text-center mt-12">
                              <Link
                                 to="/blog"
                                 className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-600 to-primary-700 text-white font-black rounded-full hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-500 hover:scale-105"
                              >
                                 Baca Semua Artikel
                                 <ArrowRight size={20} />
                              </Link>
                           </div>
                        </div>
                     </Section>
                  </motion.div>

                  {/* Stats Section */}
                  <Section background="dark" className="relative overflow-hidden py-20">
                     <div className="container-custom">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                           {[
                              { label: 'Proyek Selesai', value: 150, suffix: '+', icon: Award },
                              { label: 'Klien Puas', value: 120, suffix: '+', icon: Users },
                              { label: 'Tahun Pengalaman', value: 5, suffix: '+', icon: Code2 },
                              { label: 'Partner UMKM', value: 80, suffix: '+', icon: ShieldCheck },
                           ].map((stat, idx) => (
                              <motion.div
                                 key={idx}
                                 initial={{ opacity: 0, y: 30 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: true }}
                                 transition={{ delay: idx * 0.1 }}
                                 className="text-center p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10"
                              >
                                 <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-400 mx-auto mb-6">
                                    <stat.icon className="w-8 h-8" />
                                 </div>
                                 <div className="flex items-center justify-center gap-1 mb-2">
                                    <span className="text-4xl md:text-5xl font-black text-white">
                                       <AnimatedCounter value={stat.value} />
                                    </span>
                                    <span className="text-3xl font-black text-primary-500">{stat.suffix}</span>
                                 </div>
                                 <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                                    {stat.label}
                                 </p>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </Section>

                  {/* CTA Section */}
                  <Section className="py-20">
                     <div className="container-custom">
                        <div className="relative overflow-hidden rounded-[48px] bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 p-12 md:p-20">
                           <div className="relative z-10 text-center">
                              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                 Siap Transformasi Digital Bisnis Anda?
                              </h2>
                              <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto">
                                 Konsultasikan kebutuhan digital bisnis Anda secara gratis dengan tim ahli kami.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                 <button
                                    onClick={() => {
                                       const link = getWhatsAppLink(getConsultationMessage());
                                       window.open(link, '_blank');
                                    }}
                                    className="px-10 py-5 bg-white text-primary-700 font-black rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-500"
                                 >
                                    Konsultasi Gratis Sekarang
                              </button>
                              <Link
                                 to="/portfolio"
                                 className="px-10 py-5 bg-transparent border-2 border-white/30 text-white font-black rounded-full hover:bg-white/10 hover:border-white transition-all duration-500"
                              >
                                 Lihat Portfolio
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </Section>
            </>
         )}
      </PageLayout>
   );
};

export default Home;