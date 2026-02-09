import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/sections/Hero';
import ContentBlocks from '@/components/sections/ContentBlocks';
import { getPage, getTeam } from '@/lib/api';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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

   const defaultBlocks = [
      {
         type: 'features_grid',
         data: {
            subtitle: 'Mengapa Memilih Kami',
            title: 'Keunggulan PT Afasya Digital Solution',
            description: 'Kami menggabungkan keahlian teknis dengan pemahaman bisnis yang mendalam untuk memberikan hasil terbaik.',
            items: [
               {
                  icon: 'zap',
                  title: 'Eksekusi Cepat',
                  description: 'Proses pengembangan yang tangkas (Agile) memastikan ide Anda terealisasi dalam waktu singkat tanpa mengurangi kualitas.'
               },
               {
                  icon: 'shield',
                  title: 'Kualitas Terjamin',
                  description: 'Standar pengujian yang ketat untuk memastikan aplikasi Anda bebas bug, aman, dan berperforma tinggi.'
               },
               {
                  icon: 'users',
                  title: 'Berfokus pada Klien',
                  description: 'Kami mendengarkan dan berkolaborasi erat dengan Anda untuk menciptakan solusi yang benar-benar menjawab masalah bisnis.'
               },
               {
                  icon: 'rocket',
                  title: 'Teknologi Mutakhir',
                  description: 'Memanfaatkan stack teknologi terbaru seperti AI, Cloud, dan modern web framework untuk masa depan bisnis Anda.'
               }
            ]
         }
      },
      {
         type: 'stats_showcase',
         data: {
            items: [
               { value: '150+', label: 'Proyek Selesai' },
               { value: '98%', label: 'Kepuasan Klien' },
               { value: '50+', label: 'Mitra UMKM' },
               { value: '5+', label: 'Tahun Pengalaman' }
            ]
         }
      },
      {
         type: 'culture_grid',
         data: {
            subtitle: 'Budaya & Nilai',
            title: 'Bagaimana Kami Bekerja',
            description: 'Nilai-nilai inti yang mendasari setiap baris kode yang kami tulis dan setiap keputusan yang kami ambil.',
            items: [
               {
                  title: 'Inovasi Berkelanjutan',
                  description: 'Kami tidak pernah berhenti belajar. Setiap tantangan baru adalah kesempatan untuk berinovasi dan melampaui batas.',
                  image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000'
               },
               {
                  title: 'Integritas & Transparansi',
                  description: 'Kepercayaan adalah fondasi kami. Kami menjunjung tinggi kejujuran dalam komunikasi dan proses kerja.',
                  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000'
               }
            ]
         }
      },
      {
         type: 'timeline',
         data: {
            title: 'Milestone & Sejarah',
            description: 'Bagaimana kami tumbuh dan berkembang bersama para klien kami dari tahun ke tahun.',
            items: history
         }
      },
      {
         type: 'team_flip_grid',
         data: {
            title: 'Para Kreator di Balik Layar',
            description: 'Tim kami siap menjawab tantangan digital Anda dengan dedikasi penuh.',
            limit: 4
         }
      }
   ];

   return (
      <PageLayout>
         {/* Custom Hero for About Page */}
         <Hero
            title="Tentang Kami"
            description="PT Afasya Digital Solution adalah mitra transformasi digital terpercaya yang berdedikasi membangun masa depan bisnis Anda melalui solusi inovatif."
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
         />

         <ContentBlocks blocks={pageData?.content && pageData.content.length > 0 ? pageData.content : defaultBlocks} />
      </PageLayout>
   );
};

export default About;
