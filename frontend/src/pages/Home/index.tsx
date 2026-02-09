// src/pages/Home/index.tsx
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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

import { getWhatsAppLink, getConsultationMessage } from '@/lib/whatsapp';
import { Skeleton, SkeletonGrid } from '@/components/ui/Skeleton';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ParallaxSection from '@/components/ui/ParallaxSection';
import MorphingShape from '@/components/ui/MorphingShape'; // Added MorphingShape import
import StaggerChildren from '@/components/ui/StaggerChildren';


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

   // Loading state - We now use section-based skeletons instead of a full-page loader
   // const isLoading = pageLoading || servicesLoading || brandsLoading;

   return (
      <PageLayout>
         {/* Scroll Progress Indicator */}
         <ScrollProgress position="top" color="bg-primary-500" height={4} />

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
                     image={pageData?.hero_image}
                     ctaButton={{
                        text: 'Konsultasi Gratis',
                        link: '/konsultasi'
                     }}
                     stats={[
                        { value: servicesData.length, label: 'Layanan' },
                        { value: portfoliosData.length, label: 'Portfolio' },
                        { value: teamData.length, label: 'Tim Ahli' },
                        { value: postsData.length, label: 'Artikel' }
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
                  <Section id="layanan" className="py-20 bg-linear-to-b from-white to-neutral-50 dark:from-secondary-950 dark:to-secondary-900 relative overflow-hidden">
                     {/* Decorative Background */}
                     <div className="absolute top-20 right-0 -z-10">
                        <MorphingShape color="#0ea5e920" size={500} duration={10} />
                     </div>
                     <div className="absolute bottom-20 left-0 -z-10">
                        <MorphingShape color="#ec489920" size={400} duration={12} />
                     </div>

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
                                    <StaggerChildren
                                       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                       staggerDelay={0.1}
                                       direction="up"
                                    >
                                    {servicesData.map((service, index) => (
                                       <ServiceCard
                                          key={service.id}
                                          title={service.title}
                                          description={service.description}
                                          index={index}
                                          slug={service.slug}
                                       />
                                    ))}
                                    </StaggerChildren>
                              )
                           )}
                        </div>
                     </div>
                  </Section>

                  {/* Features Section - Removed, use ContentBlocks for dynamic features */}

                  {/* Portfolio Section */}
                  <ParallaxSection speed={0.3}>
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
                                    <StaggerChildren
                                       className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                                       staggerDelay={0.12}
                                       direction="up"
                                    >
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
                                    </StaggerChildren>
                              )}
                           </div>
                           <motion.div
                              className="text-center mt-12"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 }}
                           >
                              <Link
                                 to="/portfolio"
                                 className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-600 to-primary-700 text-white font-black rounded-full hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-500 hover:scale-105"
                              >
                                 Lihat Semua Portfolio
                                 <ArrowRight size={20} />
                              </Link>
                           </motion.div>
                        </div>
                     </Section>
                  </ParallaxSection>

                  {/* Team Section */}
                  <ParallaxSection speed={0.2}>
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
                                    <StaggerChildren
                                       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                                       staggerDelay={0.1}
                                       direction="up"
                                    >
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
                                    </StaggerChildren>
                              )}
                           </div>
                        </div>
                     </Section>
                  </ParallaxSection>

                  {/* Blog Section */}
                  <ParallaxSection speed={0.25}>
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
                                    <StaggerChildren
                                       className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                                       staggerDelay={0.12}
                                       direction="up"
                                    >
                                    {postsData.map((post, index) => (
                                       <BlogCard
                                          key={post.id}
                                          post={post}
                                          index={index}
                                       />
                                    ))}
                                    </StaggerChildren>
                              )}
                           </div>
                           <motion.div
                              className="text-center mt-12"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                           >
                              <Link
                                 to="/blog"
                                 className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary-600 to-primary-700 text-white font-black rounded-full hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-500 hover:scale-105"
                              >
                                 Baca Semua Artikel
                                 <ArrowRight size={20} />
                              </Link>
                           </motion.div>
                        </div>
                     </Section>
                  </ParallaxSection>

                  {/* Stats Section - Removed static data, use ContentBlocks for dynamic stats */}

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