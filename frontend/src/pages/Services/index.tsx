import { useQuery } from '@tanstack/react-query';
import { Layout, Smartphone, Search, Monitor, Code2, Database, Shield, Globe, Zap } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import { getServices, getPage } from '@/lib/api';
import ContentBlocks from '@/components/sections/ContentBlocks';

const ServicesPage = () => {
   const { data: pageData } = useQuery({
      queryKey: ['page', 'services'],
      queryFn: () => getPage('services').then(res => res.data),
      retry: false,
   });

   const { data: services, isLoading } = useQuery({
      queryKey: ['all-services'],
      queryFn: () => getServices().then(res => res.data),
   });

   return (
      <PageLayout>
         {pageData?.content && Array.isArray(pageData.content) ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
            <>
               {/* Header */}
                  <section className="pt-40 pb-20 bg-secondary-950 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px]" />
                  <div className="container-custom relative z-10">
                     <SectionHeader
                        light
                        align="left"
                        subtitle="Layanan Profesional"
                        title="Solusi Digital untuk Pertumbuhan Bisnis Anda"
                        description="Kami menawarkan berbagai layanan pengembangan web dan desain dengan teknologi terkini untuk membantu UMKM Indonesia Go Digital."
                        className="mb-0"
                     />
                  </div>
               </section>

               {/* Services Grid */}
               <Section background="gray">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {isLoading ? (
                        Array(6).fill(0).map((_, i) => (
                           <div key={i} className="h-80 bg-white dark:bg-neutral-900 rounded-[32px] animate-pulse shadow-sm" />
                        ))
                     ) : (
                        (services || []).map((service: any, idx: number) => (
                           <ServiceCard
                              key={service.slug}
                              title={service.name}
                              description={service.short_description}
                              icon={getServiceIcon(service.name)}
                              slug={service.slug}
                              index={idx}
                           />
                        ))
                     )}
                  </div>
               </Section>

               {/* Detailed Features */}
               <Section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div>
                        <SectionHeader
                           align="left"
                           subtitle="Kualitas Terjamin"
                           title="Mengapa Website Kami Lebih Unggul?"
                           description="Kami tidak hanya sekadar membuat website, kami membangun aset digital yang mampu mendatangkan keuntungan bagi bisnis Anda."
                           className="mb-10"
                        />

                        <ul className="space-y-6">
                           {[
                              { title: 'Performa Tinggi', desc: 'Website cepat diakses (score 90+ di Pagespeed Insights).', icon: Zap },
                              { title: 'SEO Ready', desc: 'Struktur website yang ramah Google untuk ranking lebih baik.', icon: Search },
                              { title: 'Desain Unik', desc: 'Bukan sekadar template, desain eksklusif sesuai brand Anda.', icon: Layout },
                              { title: 'Keamanan Berlapis', desc: 'Proteksi SSL dan proteksi malware standar industri.', icon: Shield },
                           ].map((item, i) => (
                              <li key={i} className="flex gap-4">
                                 <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 border border-primary-500/20 shadow-glow">
                                    <item.icon className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-secondary-900 dark:text-white mb-1">{item.title}</h4>
                                    <p className="text-sm text-secondary-500 dark:text-secondary-400">{item.desc}</p>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="relative">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl">
                              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070" alt="Service process" className="w-full h-auto" />
                        </div>
                        {/* Decorative floating stats */}

                     </div>
                  </div>
               </Section>
            </>
         )}
      </PageLayout>
   );
};

// Helper
const getServiceIcon = (name: string) => {
   const low = (name || '').toLowerCase();
   if (low.includes('web')) return Layout;
   if (low.includes('mobile') || low.includes('app')) return Smartphone;
   if (low.includes('design') || low.includes('ui')) return Monitor;
   if (low.includes('marketing') || low.includes('seo')) return Search;
   if (low.includes('system') || low.includes('informasi')) return Database;
   if (low.includes('security') || low.includes('keamanan')) return Shield;
   if (low.includes('cloud') || low.includes('hosting')) return Globe;
   return Code2;
};

export default ServicesPage;
