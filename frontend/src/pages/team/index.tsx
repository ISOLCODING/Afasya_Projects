import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import TeamCard from '@/components/ui/TeamCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getTeam, getPage } from '@/lib/api';

const TeamPage = () => {
   const { data: pageResponse } = useQuery({
      queryKey: ['page', 'team'],
      queryFn: () => getPage('team'),
      retry: false,
   });

   const {
      data: teamResponse,
      isLoading,
      error
   } = useQuery({
      queryKey: ['all-team'],
      queryFn: () => getTeam(),
   });

   const pageData = pageResponse?.success ? pageResponse.data : null;
   const teamData = teamResponse?.success ? teamResponse.data : [];

   if (isLoading) {
      return (
         <PageLayout>
            <LoadingSpinner message="Memuat data tim..." />
         </PageLayout>
      );
   }

   if (error) {
      return (
         <PageLayout>
            <Section>
               <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Team</h2>
                  <p className="text-gray-600">{(error as any)?.message || 'Failed to load team data'}</p>
               </div>
            </Section>
         </PageLayout>
      );
   }

   // Group by position
   const positions = [...new Set(teamData.map((member: any) => member.position as string))] as string[];

   return (
      <PageLayout>
         {/* Hero Section */}
         <section className="pt-40 pb-20 bg-secondary-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
            <div className="container-custom relative z-10">
               <SectionHeader
                  light
                  subtitle={pageData?.subtitle || "Tim Kami"}
                  title={pageData?.title || "Mengenal Anggota Afasya Projects"}
                  description={pageData?.description || "Bertemu dengan para profesional yang akan membantu transformasi digital bisnis Anda."}
                  className="mb-0"
               />

               <div className="flex flex-wrap gap-8 mt-8">
                  <div className="text-center">
                     <div className="text-3xl md:text-4xl font-bold text-white mb-1">{teamData.length}</div>
                     <div className="text-sm text-primary-300 uppercase tracking-widest">Anggota Tim</div>
                  </div>
                  <div className="text-center">
                     <div className="text-3xl md:text-4xl font-bold text-white mb-1">{positions.length}</div>
                     <div className="text-sm text-primary-300 uppercase tracking-widest">Spesialisasi</div>
                  </div>
               </div>
            </div>
         </section>

         {/* Team Grid */}
         <Section background="white">
            {positions.map((position) => {
               const membersInPosition = teamData.filter(
                  (member: any) => member.position === position
               );

               return (
                  <div key={position} className="mb-16">
                     <h3 className="text-2xl font-bold text-secondary-900 mb-8 border-l-4 border-primary-500 pl-4">
                        {position}
                     </h3>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {membersInPosition.map((member: any, idx: number) => {
                           const getInitials = (name: string) => {
                              return name
                                 .split(' ')
                                 .map(word => word[0])
                                 .join('')
                                 .toUpperCase()
                                 .substring(0, 2);
                           };

                           // photoUrl is passed as raw path, TeamCard handles resolution via getStorageUrl
                           const photoUrl = member.photo_url || member.image;
                           const socialLinks = member.social || member.social_links || {};

                           return (
                              <TeamCard
                                 key={member.uuid || member.id || idx}
                                 name={member.name}
                                 position={member.position || 'Team Member'}
                                 bio={member.short_bio || member.bio || ''}
                                 photoUrl={photoUrl}
                                 initials={getInitials(member.name)}
                                 socialLinks={socialLinks}
                                 expertises={member.expertises || []}
                                 index={idx}
                              />
                           );
                        })}
                     </div>
                  </div>
               );
            })}
         </Section>

         {/* CTA Section */}
         <Section background="gradient" className="py-20">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/20 text-center">
               <h3 className="text-2xl md:text-3xl font-display font-extrabold text-secondary-900 mb-4">
                  Ingin Bergabung dengan Tim Kami?
               </h3>
               <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
                  Kami selalu mencari talenta-talenta terbaik untuk bergabung dalam tim kami.
                  Jika Anda passionate tentang teknologi dan ingin membuat dampak, mari berbicara.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                     href="mailto:career@afasya.com"
                     className="btn btn-primary px-8 h-14 text-lg font-bold"
                  >
                     Kirim CV
                  </a>
                  <a
                     href="https://wa.me/6282124515302"
                     className="btn btn-secondary px-8 h-14 text-lg"
                  >
                     Konsultasi Karir
                  </a>
               </div>
            </div>
         </Section>
      </PageLayout>
   );
};

export default TeamPage;