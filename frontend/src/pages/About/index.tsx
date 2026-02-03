import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import Hero from '@/components/sections/Hero';
import SectionHeader from '@/components/ui/SectionHeader';
import InteractiveTimeline from '@/components/ui/InteractiveTimeline';
import FlipCard from '@/components/ui/FlipCard';
import ContentBlocks from '@/components/sections/ContentBlocks';
import { getPage, getTeam } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getStorageUrl } from '@/lib/utils';

const About = () => {
   const { data: pageResponse, isLoading: pageLoading } = useQuery({
      queryKey: ['page', 'about-us'],
      queryFn: () => getPage('about-us'),
   });

   const { data: teamResponse } = useQuery({
      queryKey: ['team'],
      queryFn: () => getTeam(),
   });

   if (pageLoading) {
      return (
         <PageLayout>
            <LoadingSpinner message="Memuat informasi perusahaan..." />
         </PageLayout>
      );
   }

   const pageData = pageResponse?.success ? pageResponse.data : null;
   const teamData = teamResponse?.success ? teamResponse.data : [];

   // Fallback Timeline Data
   const history = [
      { year: '2020', title: 'Awal Mula', description: 'Afasya Projects didirikan dengan misi membantu UMKM bertransformasi ke ranah digital.' },
      { year: '2021', title: 'Ekspansi Layanan', description: 'Mulai melayani pembuatan aplikasi mobile dan optimasi SEO tingkat lanjut.' },
      { year: '2022', title: 'Tim Inti Terbentuk', description: 'Perekrutan talenta-talenta terbaik untuk memberikan kualitas layanan yang lebih stabil.' },
      { year: '2023', title: '100+ Project Selesai', description: 'Mencapai milestone penting dengan keberhasilan menangani lebih dari 100 klien.' },
      { year: '2024', title: 'Inovasi AI', description: 'Mengintegrasikan teknologi AI ke dalam solusi-solusi digital untuk efisiensi bisnis klien.' },
   ];

   return (
      <PageLayout>
         {/* Custom Hero for About Page */}
         <Hero
            title="Tentang Kami"
            description="Kami adalah tim kreatif yang berdedikasi untuk membangun masa depan digital Anda dengan solusi inovatif."
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
         />

         {/* Jika ada content blocks dari CMS, tampilkan selebihnya */}
         {pageData?.content && pageData.content.length > 0 ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
            <>
               {/* Vision & Mission */}
               <Section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div>
                        <SectionHeader
                           align="left"
                           subtitle="Visi & Misi"
                           title="Membangun Ekosistem Digital UMKM yang Tangguh"
                           description="Kami percaya bahwa setiap bisnis, sekecil apapun, berhak memiliki akses ke teknologi digital kelas dunia."
                        />
                        <div className="space-y-6">
                           <div className="flex gap-4 p-6 glass-card bg-primary-50/50 dark:bg-secondary-800/30 border border-primary-100 dark:border-white/5">
                              <div className="text-2xl">🎯</div>
                              <div>
                                 <h4 className="font-bold text-secondary-900 dark:text-white mb-1">Visi Kami</h4>
                                 <p className="text-sm text-secondary-600 dark:text-neutral-300 italic">Menjadi agensi digital nomor satu dalam pemberdayaan teknologi untuk UMKM di Indonesia.</p>
                              </div>
                           </div>
                           <div className="flex gap-4 p-6 glass-card bg-secondary-50/50 dark:bg-secondary-900/40 border border-secondary-100 dark:border-white/5">
                              <div className="text-2xl">🚀</div>
                              <div>
                                 <h4 className="font-bold text-secondary-900 dark:text-white mb-1">Misi Kami</h4>
                                 <p className="text-sm text-secondary-600 dark:text-neutral-300">Memberikan solusi digital yang terjangkau, efektif, dan berkelanjutan bagi pertumbuhan bisnis.</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="relative">
                        <img
                           src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000"
                           alt="Collaboration"
                           className="rounded-[40px] shadow-2xl"
                        />

                     </div>
                  </div>
               </Section>

               {/* Timeline Section */}
               <Section background="dark">
                  <SectionHeader
                     light
                     subtitle="Perjalanan Kami"
                     title="Milestone & Sejarah"
                     description="Bagaimana kami tumbuh dan berkembang bersama para klien kami dari tahun ke tahun."
                  />
                  <InteractiveTimeline items={history} />
               </Section>

               {/* Team Section with FlipCards */}
               <Section>
                  <SectionHeader
                     subtitle="Tim Ahli"
                     title="Para Kreator di Balik Layar"
                     description="Punya pertanyaan? Tim kami siap menjawab tantangan digital Anda."
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {teamData.length > 0 ? (
                        teamData.map((member: any, idx: number) => (
                           <FlipCard
                              key={idx}
                              name={member.name}
                              position={member.position}
                              photoUrl={getStorageUrl(member.photo_url || member.profile_image)}
                              bio={member.short_bio || member.bio || ''}
                              socialLinks={member.social || {}}
                           />
                        ))
                     ) : (
                        <div className="col-span-full text-center text-gray-500 py-12 bg-secondary-50/50 rounded-3xl border border-dashed border-secondary-200">
                           <p>Data tim akan segera diperbarui.</p>
                        </div>
                     )}
                  </div>
               </Section>
            </>
         )}
      </PageLayout>
   );
};

export default About;
