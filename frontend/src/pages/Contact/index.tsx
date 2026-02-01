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
               <section className="pt-40 pb-20 bg-primary-600 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
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
                              className="bg-white p-8 rounded-[32px] shadow-xl border border-secondary-100 group hover:border-primary-200 transition-all"
                           >
                              <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                 <info.icon className="w-6 h-6" />
                              </div>
                              <h4 className="text-lg font-bold text-secondary-900 mb-1">{info.title}</h4>
                              <p className="text-secondary-900 font-bold mb-1">{info.detail}</p>
                              <p className="text-xs text-secondary-400 font-medium uppercase tracking-wider">{info.sub}</p>
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
                  <div className="w-full h-[400px] bg-secondary-200 rounded-[40px] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden grayscale contrast-125">
                     <div className="text-center p-8 bg-white/80 backdrop-blur shadow-lg rounded-3xl">
                        <MapPin className="w-10 h-10 text-primary-600 mx-auto mb-4" />
                        <h4 className="font-bold text-secondary-900">Map integration would be here</h4>
                        <p className="text-sm text-secondary-500">Google Maps API required for live map</p>
                     </div>
                  </div>
               </Section>
            </>
         )}
      </PageLayout>
   );
};

export default ContactPage;
