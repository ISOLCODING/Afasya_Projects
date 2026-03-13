import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactMessage } from '@/lib/api';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const contactSchema = z.object({
   name: z.string().min(2, 'Nama minimal 2 karakter'),
   email: z.string().email('Email tidak valid'),
   phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
   subject: z.string().min(5, 'Subjek minimal 5 karakter'),
   message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
   title?: string;
   description?: string;
   data?: any; // Dynamic data from backend
}

export const ContactForm = ({ title, description, data }: ContactFormProps) => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
   });

   const onSubmit = async (formData: ContactFormData) => {
      setIsSubmitting(true);
      try {
         await sendContactMessage(formData);
         toast.success('Pesan Anda berhasil dikirim!');
         reset();
      } catch (error) {
         toast.error('Gagal mengirim pesan.');
      } finally {
         setIsSubmitting(false);
      }
   };

   // Social Media Icons Mapping
   const getSocialIcon = (platform: string) => {
      switch (platform.toLowerCase()) {
         case 'facebook': return Facebook;
         case 'instagram': return Instagram;
         case 'youtube': return Youtube;
         case 'linkedin': return Linkedin;
         case 'twitter': return Twitter;
         default: return Mail;
      }
   };

   return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
         {/* Left Side: Contact Info */}
         <div className="lg:col-span-5 space-y-10">
            <div>
               <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                  {title || "Get in Touch"}
               </h2>
               <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {description || "Have a project in mind? We'd love to hear from you."}
               </p>
            </div>

            <div className="space-y-8">
               {data?.address && (
                  <div className="flex items-start gap-4 group">
                     <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <MapPin className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">Visit Us</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">{data.address}</p>
                     </div>
                  </div>
               )}

               {data?.email && (
                  <div className="flex items-start gap-4 group">
                     <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <Mail className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">Email Us</h4>
                        <a href={`mailto:${data.email}`} className="text-zinc-600 dark:text-zinc-400 hover:text-primary-500 transition-colors">{data.email}</a>
                     </div>
                  </div>
               )}

               {data?.phone && (
                  <div className="flex items-start gap-4 group">
                     <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <Phone className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">Call Us</h4>
                        <a href={`tel:${data.phone}`} className="text-zinc-600 dark:text-zinc-400 hover:text-primary-500 transition-colors">{data.phone}</a>
                     </div>
                  </div>
               )}
            </div>

            {data?.socials && data.socials.length > 0 && (
               <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-lg mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                     {data.socials.map((social: any, idx: number) => {
                        const Icon = getSocialIcon(social.platform);
                        return (
                           <a
                              key={idx}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all duration-300 hover:scale-110"
                           >
                              <Icon className="w-5 h-5" />
                           </a>
                        );
                     })}
                  </div>
               </div>
            )}

            {/* Google Maps Embed */}
            {data?.map_embed && (
               <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 h-64 w-full shadow-lg">
                  <iframe
                     src={data.map_embed}
                     width="100%"
                     height="100%"
                     style={{ border: 0 }}
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                     className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
               </div>
            )}
         </div>

         {/* Right Side: Form */}
         <div className="lg:col-span-7">
            <div className="relative group overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-2xl border border-white/20 dark:border-white/10">
               {/* Decorative Gradients for Form */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary-500/20 transition-all duration-700" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-[80px] -z-10" />

               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="relative group/input">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Nama Lengkap</label>
                        <input
                           {...register('name')}
                           className={cn(
                              "w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 px-6 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none",
                              errors.name && "ring-2 ring-red-400 bg-red-50 dark:bg-red-900/10"
                           )}
                           placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.name.message as string}</p>}
                     </div>
                     <div className="relative group/input">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Email</label>
                        <input
                           {...register('email')}
                           className={cn(
                              "w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 px-6 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none",
                              errors.email && "ring-2 ring-red-400 bg-red-50 dark:bg-red-900/10"
                           )}
                           placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.email.message as string}</p>}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="relative group/input">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Nomor Telepon</label>
                        <input
                           {...register('phone')}
                           className={cn(
                              "w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 px-6 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none",
                              errors.phone && "ring-2 ring-red-400 bg-red-50 dark:bg-red-900/10"
                           )}
                           placeholder="+62 812..."
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.phone.message as string}</p>}
                     </div>
                     <div className="relative group/input">
                        <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Subjek</label>
                        <input
                           {...register('subject')}
                           className={cn(
                              "w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 px-6 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none",
                              errors.subject && "ring-2 ring-red-400 bg-red-50 dark:bg-red-900/10"
                           )}
                           placeholder="Diskusi Proyek..."
                        />
                        {errors.subject && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.subject.message as string}</p>}
                     </div>
                  </div>

                  <div className="relative group/input">
                     <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Pesan Detail</label>
                     <textarea
                        {...register('message')}
                        rows={6}
                        className={cn(
                           "w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-2xl py-4 px-6 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none resize-none",
                           errors.message && "ring-2 ring-red-400 bg-red-50 dark:bg-red-900/10"
                        )}
                        placeholder="Ceritakan tentang proyek atau kebutuhan Anda secara detail..."
                     />
                     {errors.message && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{errors.message.message as string}</p>}
                  </div>

                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="btn bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 w-full py-5 rounded-2xl text-lg font-bold gap-3 group relative overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                     <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
                        <Send className={cn("w-5 h-5 transition-transform", isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
                     </span>
                     <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};
