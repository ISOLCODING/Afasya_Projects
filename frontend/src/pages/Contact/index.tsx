import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { getPage } from '@/lib/api';
import ContentBlocks from '@/components/sections/ContentBlocks';
import { ContactForm } from '@/components/ui/ContactForm';

const ContactPage = () => {
   const { data: pageData } = useQuery({
      queryKey: ['page', 'contact'],
      queryFn: () => getPage('contact').then(res => res.data),
      retry: false,
   });

   const contactInfo = [
      { icon: Phone, title: 'Telepon / WA', detail: '+62 812 3456 7890', sub: 'Senin - Jumat, 09:00 - 18:00' },
      { icon: Mail, title: 'Email Kami', detail: 'hello@afasyaprojects.com', sub: 'Balasan dalam 24 jam' },
      { icon: MapPin, title: 'Kantor Pusat', detail: 'Jl. Digital Kreatif No. 123', sub: 'Jakarta Selatan, Indonesia' },
   ];

   return (
      <PageLayout>
         {pageData?.content && Array.isArray(pageData.content) ? (
            <ContentBlocks blocks={pageData.content} />
         ) : (
            <>
               {/* Header */}
                  <section className="pt-40 pb-20 bg-secondary-950 overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                     <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
                  <div className="container-custom relative z-10 text-center">
                     <SectionHeader
                        light
                        subtitle="Hubungi Kami"
                        title="Mari Wujudkan Ide Digital Anda"
                        description="Punya pertanyaan atau ingin memulai proyek? Tim kami siap mendengarkan dan memberikan solusi terbaik untuk bisnis Anda."
                        className="mb-0"
                     />
                  </div>
               </section>

               <Section className="relative z-20">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-32">
                     {/* Info Cards */}
                     <div className="lg:col-span-1 space-y-6">
                        {contactInfo.map((info, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="glass-card bg-white/80 dark:bg-secondary-900/60 p-8 rounded-[32px] shadow-xl border border-secondary-100 dark:border-white/5 group hover:border-primary-200 dark:hover:border-primary-500/30 transition-all"
                           >
                              <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                 <info.icon className="w-6 h-6" />
                              </div>
                              <h4 className="text-lg font-bold text-secondary-900 dark:text-white mb-1">{info.title}</h4>
                              <p className="text-secondary-900 dark:text-neutral-200 font-bold mb-1">{info.detail}</p>
                              <p className="text-xs text-secondary-400 dark:text-neutral-500 font-medium uppercase tracking-wider">{info.sub}</p>
                           </motion.div>
                        ))}

                        {/* Working Hours Mini Card */}
                        <div className="bg-secondary-900 p-8 rounded-[32px] text-white overflow-hidden relative">
                           <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                 <Clock className="w-5 h-5 text-primary-400" />
                                 <h4 className="font-bold">Jam Kerja</h4>
                              </div>
                              <div className="space-y-2 text-sm text-secondary-400 font-medium">
                                 <p className="flex justify-between"><span>Senin - Jumat</span> <span>09:00 - 18:00</span></p>
                                 <p className="flex justify-between"><span>Sabtu</span> <span>10:00 - 14:00</span></p>
                                 <p className="flex justify-between"><span>Minggu</span> <span className="text-red-400">Tutup</span></p>
                              </div>
                           </div>
                           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-600/20 rounded-full blur-2xl" />
                        </div>
                     </div>

                     {/* Contact Form */}
                     <div className="lg:col-span-2">
                        <ContactForm />
                     </div>
                  </div>
               </Section>

               {/* Map Placeholder */}
               <Section background="gray">
                     <div className="w-full h-[400px] bg-secondary-900 rounded-[40px] flex items-center justify-center border border-white/5 shadow-xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        <div className="text-center p-8 glass-card bg-secondary-950/80 backdrop-blur shadow-lg rounded-3xl relative z-10 border border-white/10 group-hover:border-primary-500/30 transition-all">
                           <MapPin className="w-10 h-10 text-primary-500 mx-auto mb-4 animate-bounce" />
                           <h4 className="font-bold text-white mb-1">Jakarta, Indonesia</h4>
                           <p className="text-sm text-secondary-400">Menara Digital, Jl. Rasuna Said Kav 10</p>
                     </div>
                  </div>
               </Section>
            </>
         )}
      </PageLayout>
   );
};

export default ContactPage;
