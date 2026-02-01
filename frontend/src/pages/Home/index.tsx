// src/pages/Home/index.tsx
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
   Code2, Layout, Smartphone, Search, Monitor,
   MessageSquare, Users, Award, ShieldCheck, Zap,
   ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
import { getServices, getPortfolios, getSettings, getPage, getTeam, getPosts } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/utils';

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
   const [debugMode] = useState(import.meta.env.DEV);

   // 1. Fetch Dynamic Page Structure
   const {
      data: pageResponse,
      isLoading: pageLoading
   } = useQuery({
      queryKey: ['page', 'home'],
      queryFn: () => getPage('home'),
      retry: 1,
   });

   const { data: servicesResponse, isLoading: servicesLoading } = useQuery({
      queryKey: ['services'],
      queryFn: () => getServices(),
      retry: 1,
   });

   const { data: portfoliosResponse, isLoading: portfoliosLoading } = useQuery({
      queryKey: ['featured-portfolios'],
      queryFn: () => getPortfolios({ featured: true, limit: 3 }),
      retry: 1,
   });

   const { data: teamResponse, isLoading: teamLoading } = useQuery({
      queryKey: ['team'],
      queryFn: () => getTeam(),
      retry: 1,
   });

   const { data: postsResponse, isLoading: postsLoading } = useQuery({
      queryKey: ['recent-posts'],
      queryFn: () => getPosts({ limit: 3, published: true }),
      retry: 1,
   });

   const { data: settingsResponse, isLoading: settingsLoading } = useQuery({
      queryKey: ['settings'],
      queryFn: () => getSettings(),
      retry: 1,
   });

   // Debug: Log semua response
   useEffect(() => {
      if (debugMode) {
         console.log('🔍 ===== HOME DATA DEBUG =====');
         console.log('Portfolios Response:', portfoliosResponse);
         console.log('Posts Response:', postsResponse);
         console.log('=============================');
      }
   }, [pageResponse, servicesResponse, portfoliosResponse, teamResponse, postsResponse, settingsResponse, debugMode]);

   // Ekstrak data dengan aman
   const pageData = pageResponse?.success ? pageResponse.data : null;
   const servicesData = servicesResponse?.success && Array.isArray(servicesResponse.data) ? servicesResponse.data : [];
   const portfoliosData = portfoliosResponse?.success && Array.isArray(portfoliosResponse.data) ? portfoliosResponse.data : [];
   const teamData = teamResponse?.success && Array.isArray(teamResponse.data) ? teamResponse.data : [];
   const postsData = postsResponse?.success && Array.isArray(postsResponse.data) ? postsResponse.data : [];
   const settingsData = settingsResponse?.success ? settingsResponse.data : {};

   // Loading state
   const isLoading = pageLoading || servicesLoading || portfoliosLoading ||
      teamLoading || postsLoading || settingsLoading;

   if (isLoading) {
      return (
         <PageLayout>
            <LoadingSpinner message="Memuat data dari server..." />
         </PageLayout>
      );
   }

   // Check if we should show content blocks
   const shouldShowContentBlocks = pageData?.content &&
      Array.isArray(pageData.content) &&
      pageData.content.length > 0;

   const siteTitle = settingsData?.site_name || 'Afasya Projects';
   const siteDesc = settingsData?.site_description || 'Solusi Digital Terpercaya untuk UMKM';

   // Features untuk default layout
   const features = [
      { title: 'Pengerjaan Cepat', desc: 'Website Anda bisa online dalam waktu 3-7 hari kerja.', icon: Zap },
      { title: 'Optimasi SEO', desc: 'Website dirancang agar mudah ditemukan di Google.', icon: Search },
      { title: 'Desain Responsif', desc: 'Tampilan rapi di semua perangkat (HP, Tablet, Desktop).', icon: Smartphone },
      { title: 'Support Berkelanjutan', desc: 'Kami siap membantu pemeliharaan website Anda.', icon: MessageSquare }
   ];

   return (
      <PageLayout>
         {/* Jika admin sudah mengisi content di CMS */}
         {shouldShowContentBlocks ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
            /* DEFAULT LAYOUT - dengan data dinamis dari API */
            <>
               {/* Hero Section */}
                  <Hero
                  title={siteTitle}
                  description={siteDesc}
                  image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                  />

               <BrandScroller />

               {/* Debug Info */}
               {debugMode && (
                     <div className="fixed top-20 right-4 z-50 bg-primary-950/90 border border-primary-500/30 text-white p-4 rounded-2xl shadow-2xl max-w-xs backdrop-blur-xl">
                     <div className="text-sm font-display font-bold mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                        <span className="text-primary-400">📊</span> DATA STATUS
                     </div>
                     <div className="text-xs space-y-2 mb-3">
                        <div className="flex justify-between">
                           <span className="text-secondary-400">Services:</span>
                           <span className={servicesData.length > 0 ? "text-green-400" : "text-amber-400"}>{servicesData.length} items</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-secondary-400">Portfolios:</span>
                           <span className={portfoliosData.length > 0 ? "text-green-400" : "text-amber-400"}>{portfoliosData.length} items</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-secondary-400">Team:</span>
                           <span className={teamData.length > 0 ? "text-green-400" : "text-amber-400"}>{teamData.length} items</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-secondary-400">Posts:</span>
                           <span className={postsData.length > 0 ? "text-green-400" : "text-amber-400"}>{postsData.length} items</span>
                        </div>
                     </div>

                     {(!servicesResponse?.success || !portfoliosResponse?.success || !postsResponse?.success || !pageResponse?.success) && (
                        <div className="text-[10px] text-red-400 mt-2 p-2 bg-red-500/10 rounded border border-red-500/20">
                           <strong>Errors:</strong>
                           {!pageResponse?.success && <div className="mt-1 flex gap-1"><span>•</span> Page: {pageResponse?.message}</div>}
                           {!servicesResponse?.success && <div className="mt-1 flex gap-1"><span>•</span> Service: {servicesResponse?.message}</div>}
                           {!portfoliosResponse?.success && <div className="mt-1 flex gap-1"><span>•</span> Portfolio: {portfoliosResponse?.message}</div>}
                           {!postsResponse?.success && <div className="mt-1 flex gap-1"><span>•</span> Posts: {postsResponse?.message}</div>}
                        </div>
                     )}

                     <div className="text-[9px] text-secondary-500 mt-3 pt-2 border-t border-white/5 break-all">
                        API: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'}
                     </div>
                  </div>
               )}

               {/* Services Section - DINAMIS dari API */}
               <Section background="gray" id="services">
                  <SectionHeader
                     subtitle="Layanan Unggulan"
                     title="Solusi Digital Lengkap untuk Bisnis Anda"
                     description="Kami menyediakan berbagai layanan pengembangan web yang dirancang khusus untuk meningkatkan omzet UMKM."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {servicesData.length > 0 ? (
                        servicesData.slice(0, 3).map((service: any, idx: number) => (
                           <ServiceCard
                              key={service.id || service.slug || idx}
                              title={service.name || service.title}
                              description={service.short_description || service.description || ''}
                              icon={getServiceIcon(service.name || service.title)}
                              slug={service.slug}
                              image={service.featured_image || service.image}
                              index={idx}
                           />
                        ))
                     ) : (
                        // Fallback jika belum ada data
                        <>
                           <ServiceCard
                              title="Web Development"
                              description="Pembuatan website profesional untuk UMKM"
                              icon={Layout}
                              slug="web-development"
                              index={0}
                           />
                           <ServiceCard
                              title="Mobile App"
                              description="Aplikasi mobile iOS & Android"
                              icon={Smartphone}
                              slug="mobile-app"
                              index={1}
                           />
                           <ServiceCard
                              title="SEO Optimization"
                              description="Optimasi website di mesin pencari"
                              icon={Search}
                              slug="seo-optimization"
                              index={2}
                           />
                        </>
                     )}
                  </div>

                  <div className="mt-16 text-center">
                     <Link to="/services" className="btn btn-secondary group">
                        Lihat Semua Layanan
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </div>
               </Section>

               {/* Why Choose Us Section */}
               <Section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="pt-12">
                              <img
                                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600"
                                 alt="Team"
                                 className="rounded-3xl shadow-xl mb-4 h-64 object-cover w-full"
                              />
                              <div className="bg-primary-600 p-8 rounded-3xl text-white">
                                 <p className="text-4xl font-bold mb-1">5+</p>
                                 <p className="text-xs uppercase font-bold tracking-widest opacity-80">Tahun Pengalaman</p>
                              </div>
                           </div>
                           <div>
                              <img
                                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600"
                                 alt="Design"
                                 className="rounded-3xl shadow-xl mb-4 h-80 object-cover w-full"
                              />
                              <img
                                 src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600"
                                 alt="Analytics"
                                 className="rounded-3xl shadow-xl h-48 object-cover w-full"
                              />
                           </div>
                        </div>
                     </div>

                     <div>
                        <SectionHeader
                           align="left"
                           subtitle="Mengapa Afasya?"
                           title="Partner Digital Terbaik untuk Transformasi Bisnis UMKM"
                           description="Kami memahami tantangan pemilik usaha. Solusi kami tidak hanya cantik, tapi juga efektif."
                           className="mb-10"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                           {features.map((feature, idx) => (
                              <div key={idx} className="flex gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 shrink-0">
                                    <feature.icon className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-secondary-900 mb-2">{feature.title}</h4>
                                    <p className="text-sm text-secondary-500 leading-relaxed">{feature.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </Section>

               {/* Portfolio Section - FIXED untuk database */}
               <Section background="dark" id="portfolio">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                     <SectionHeader
                        align="left"
                        light
                        subtitle="Hasil Karya"
                        title="Project Pilihan dari Klien Terpercaya"
                        description="Lihat project-project terbaik yang telah kami selesaikan untuk berbagai klien."
                        className="mb-0"
                     />
                     <Link to="/portfolio" className="btn border-primary-500/50 text-white hover:bg-primary-600 border px-8 py-3 rounded-full mb-2">
                        Lihat Semua Project
                     </Link>
                  </div>

                  {debugMode && (
                     <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                        <div className="text-yellow-600 text-sm font-medium mb-1">
                           🔍 Portfolio Debug: {portfoliosData.length} items loaded
                        </div>
                        {portfoliosData.length > 0 && portfoliosData.slice(0, 1).map((p: any, i: number) => (
                           <div key={i} className="text-xs text-yellow-700 mt-2">
                              Sample: {p.title} | Category: {p.category} | Image: {p.featured_image ? 'Yes' : 'No'}
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {portfoliosData.length > 0 ? (
                        portfoliosData.slice(0, 3).map((project: any, idx: number) => (
                           <PortfolioCard
                              key={project.uuid || project.id || project.slug || idx}
                              title={project.title}
                              category={project.category}
                              image={project.featured_image}
                              slug={project.slug}
                              index={idx}
                           />
                        ))
                     ) : (
                        // Fallback jika belum ada data
                        <>
                           <PortfolioCard
                              title="E-Commerce Website"
                              category="E-Commerce"
                              image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070"
                              slug="ecommerce-website"
                              index={0}
                           />
                           <PortfolioCard
                              title="Mobile Banking App"
                              category="Mobile App"
                              image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070"
                              slug="mobile-banking-app"
                              index={1}
                           />
                           <PortfolioCard
                              title="Company Profile"
                              category="Website"
                              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070"
                              slug="company-profile"
                              index={2}
                           />
                        </>
                     )}
                  </div>

                  {portfoliosData.length === 0 && (
                     <div className="mt-8 text-center">
                        <p className="text-gray-400">
                           Portfolio data sedang dimuat atau belum tersedia.
                        </p>
                     </div>
                  )}
               </Section>

               {/* Team Section - DINAMIS dari API */}
               <Section>
                  <SectionHeader
                     subtitle="Tim Kami"
                     title="Dibalik Karya-Karya Luar Biasa"
                     description="Kami terdiri dari para profesional yang berdedikasi tinggi untuk kesuksesan digital Anda."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {teamData.length > 0 ? (
                        teamData.slice(0, 4).map((member: any, idx: number) => {
                           // Generate fallback avatar based on name safely
                           const getInitials = (name: string) => {
                              if (!name) return '??';
                              return name
                                 .split(' ')
                                 .map(word => word ? word[0] : '')
                                 .join('')
                                 .toUpperCase()
                                 .substring(0, 2);
                           };

                           return (
                              <TeamCard
                                 key={member.uuid || member.id || idx}
                                 name={member.name || 'Team Member'}
                                 position={member.position || 'Professional'}
                                 bio={member.short_bio || member.bio || ''}
                                 photoUrl={member.photo_url}
                                 initials={getInitials(member.name)}
                                 socialLinks={member.social || {}}
                                 expertises={member.expertises || []}
                                 index={idx}
                              />
                           );
                        })
                     ) : (
                        // Fallback jika belum ada data
                        <>
                           <TeamCard
                              name="John Doe"
                              position="Web Developer"
                              bio="Spesialis pengembangan website dengan pengalaman 5+ tahun"
                              photoUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
                              index={0}
                           />
                           <TeamCard
                              name="Jane Smith"
                              position="UI/UX Designer"
                              bio="Desainer antarmuka dengan fokus pada user experience"
                              photoUrl="https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1974"
                              index={1}
                           />
                           <TeamCard
                              name="Robert Brown"
                              position="SEO Specialist"
                              bio="Ahli optimasi mesin pencari dengan track record proven"
                              photoUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974"
                              index={2}
                           />
                           <TeamCard
                              name="Sarah Wilson"
                              position="Project Manager"
                              bio="Manajer proyek dengan sertifikasi PMP dan 7+ tahun pengalaman"
                              photoUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070"
                              index={3}
                           />
                        </>
                     )}
                  </div>

                  {/* Show More Button if there are more team members */}
                  {teamData.length > 4 && (
                     <div className="mt-12 text-center">
                        <Link to="/team" className="btn btn-secondary">
                           Lihat Seluruh Tim
                           <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                     </div>
                  )}
               </Section>

               {/* Blog Section - FIXED untuk database */}
               <Section background="gray">
                  <SectionHeader
                     subtitle="Update Terbaru"
                     title="Wawasan dari Blog Kami"
                     description="Pelajari tips dan tren terbaru seputar transformasi digital untuk UMKM."
                  />

                  {debugMode && (
                     <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <div className="text-green-600 text-sm font-medium mb-1">
                           🔍 Blog Posts Debug: {postsData.length} items loaded
                        </div>
                        {postsData.length > 0 && postsData.slice(0, 1).map((p: any, i: number) => (
                           <div key={i} className="text-xs text-green-700 mt-2">
                              Sample: {p.title} | Author: {p.author?.name || p.author_name} | Image: {p.featured_image ? 'Yes' : 'No'}
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {postsData.length > 0 ? (
                        postsData.slice(0, 3).map((post: any, idx: number) => (
                           <BlogCard
                              key={post.uuid || post.id || post.slug || idx}
                              post={{
                                 ...post,
                                 author: post.author?.name || post.author_name || 'Admin',
                                 image_url: post.featured_image,
                                 category: post.category?.name || post.category || 'General'
                              }}
                              index={idx}
                           />
                        ))
                     ) : (
                        // Fallback jika belum ada data
                        <>
                           <BlogCard
                              post={{
                                 id: 101,
                                 title: "Tips SEO untuk UMKM",
                                 excerpt: "Pelajari strategi SEO dasar untuk meningkatkan ranking website bisnis Anda di Google",
                                 image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070",
                                 author: "Admin",
                                 published_at: "2024-01-15",
                                 slug: "tips-seo-umkm",
                                 category: "Marketing"
                              }}
                              index={0}
                           />
                           <BlogCard
                              post={{
                                 id: 102,
                                 title: "Desain Website Responsif",
                                 excerpt: "Mengapa website responsive penting untuk bisnis di era mobile-first",
                                 image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974",
                                 author: "Admin",
                                 published_at: "2024-01-10",
                                 slug: "desain-website-responsif",
                                 category: "Design"
                              }}
                              index={1}
                           />
                           <BlogCard
                              post={{
                                 id: 103,
                                 title: "Strategi Digital Marketing",
                                 excerpt: "Cara efektif memasarkan produk melalui platform digital untuk UMKM",
                                 image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070",
                                 author: "Admin",
                                 published_at: "2024-01-05",
                                 slug: "strategi-digital-marketing",
                                 category: "Business"
                              }}
                              index={2}
                           />
                        </>
                     )}
                  </div>

                  <div className="mt-16 text-center">
                     <Link to="/blog" className="btn btn-secondary">
                        Baca Artikel Lainnya
                     </Link>
                  </div>
               </Section>

               {/* Stats Section */}
               <Section background="dark" className="relative overflow-hidden">
                  {/* Background decoration for stats */}
                     <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[150px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-[150px]" />
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                     {[
                        { label: 'Proyek Selesai', value: 150, suffix: '+', icon: Award, color: 'from-blue-500/20 to-blue-600/20' },
                        { label: 'Klien Puas', value: 120, suffix: '+', icon: Users, color: 'from-purple-500/20 to-purple-600/20' },
                        { label: 'Tahun Pengalaman', value: 5, suffix: '+', icon: Code2, color: 'from-indigo-500/20 to-indigo-600/20' },
                        { label: 'Partner UMKM', value: 80, suffix: '+', icon: ShieldCheck, color: 'from-teal-500/20 to-teal-600/20' },
                     ].map((stat, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1 }}
                           whileHover={{ y: -10, transition: { duration: 0.2 } }}
                           className={cn(
                              "relative group p-8 glass-card bg-white/5 backdrop-blur-xl transition-all duration-500 overflow-hidden text-center",
                              "hover:border-primary-500/30 hover:shadow-glow"
                           )}
                        >
                           {/* Glow effect on hover */}
                           <div className={cn(
                              "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
                              stat.color
                           )} />

                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-400 mx-auto mb-6 border border-white/10 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                              <stat.icon className="w-8 h-8" />
                           </div>

                           <div className="flex items-center justify-center gap-1 mb-2">
                              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                 <AnimatedCounter value={stat.value} />
                              </span>
                              <span className="text-3xl font-black text-primary-500">{stat.suffix}</span>
                           </div>
                           <p className="text-secondary-400 font-extrabold uppercase tracking-[0.2em] text-[10px]">
                              {stat.label}
                           </p>

                           {/* 3D Reflection Effect */}
                           <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-full transition-all duration-1000" />
                        </motion.div>
                     ))}
                  </div>
               </Section>

               {/* CTA Section */}
               <Section containerClassName="relative z-10" className="overflow-visible">
                     <div className="bg-linear-to-br from-primary-600 to-accent-600 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden shadow-premium">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                     <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                     >
                        <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8 leading-tight">
                           Siap Memulai Perjalanan <br /> Digital Bisnis Anda?
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                           <a
                              href={`https://wa.me/${settingsData?.contact_phone?.replace?.(/[^0-9]/g, '') || '6282124515302'}`}
                              className="btn bg-white text-primary-700 hover:bg-secondary-100 px-10 h-14 text-lg font-bold"
                           >
                              Konsultasi via WhatsApp
                           </a>
                           <Link to="/contact" className="btn border-white/30 border text-white hover:bg-white/10 px-10 h-14 text-lg">
                              Isi Form Kontak
                           </Link>
                        </div>
                     </motion.div>
                  </div>
               </Section>
            </>
         )}
      </PageLayout>
   );
};

export default Home;
