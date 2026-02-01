import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactMessage } from '@/lib/api';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
   name: z.string().min(2, 'Nama minimal 2 karakter'),
   email: z.string().email('Email tidak valid'),
   phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
   subject: z.string().min(5, 'Subjek minimal 5 karakter'),
   message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm = ({ title, description }: { title?: string, description?: string }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
   });

   const onSubmit = async (data: ContactFormData) => {
      setIsSubmitting(true);
      try {
         await sendContactMessage(data);
         toast.success('Pesan Anda berhasil dikirim!');
         reset();
      } catch (error) {
         toast.error('Gagal mengirim pesan.');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-secondary-100">
         <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
               <MessageSquare className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-secondary-900">{title || 'Kirim Pesan'}</h3>
               <p className="text-sm text-secondary-500">{description || 'Isi formulir di bawah ini.'}</p>
            </div>
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-secondary-700 mb-2 ml-1">Nama Lengkap</label>
                  <input
                     {...register('name')}
                     className={cn(
                        "w-full bg-secondary-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-500 transition-all",
                        errors.name && "ring-2 ring-red-400"
                     )}
                     placeholder="Nama Anda"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-2 ml-1">{errors.name.message}</p>}
               </div>
               <div>
                  <label className="block text-sm font-bold text-secondary-700 mb-2 ml-1">Email</label>
                  <input
                     {...register('email')}
                     className={cn(
                        "w-full bg-secondary-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-500 transition-all",
                        errors.email && "ring-2 ring-red-400"
                     )}
                     placeholder="example@mail.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2 ml-1">{errors.email.message}</p>}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-secondary-700 mb-2 ml-1">Nomor Telepon</label>
                  <input
                     {...register('phone')}
                     className={cn(
                        "w-full bg-secondary-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-500 transition-all",
                        errors.phone && "ring-2 ring-red-400"
                     )}
                     placeholder="0812xxxx"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-2 ml-1">{errors.phone.message}</p>}
               </div>
               <div>
                  <label className="block text-sm font-bold text-secondary-700 mb-2 ml-1">Subjek</label>
                  <input
                     {...register('subject')}
                     className={cn(
                        "w-full bg-secondary-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-500 transition-all",
                        errors.subject && "ring-2 ring-red-400"
                     )}
                     placeholder="Subjek Pesan"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-2 ml-1">{errors.subject.message}</p>}
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-secondary-700 mb-2 ml-1">Pesan</label>
               <textarea
                  {...register('message')}
                  rows={5}
                  className={cn(
                     "w-full bg-secondary-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary-500 transition-all resize-none",
                     errors.message && "ring-2 ring-red-400"
                  )}
                  placeholder="Ceritakan kebutuhan Anda..."
               />
               {errors.message && <p className="text-red-500 text-xs mt-2 ml-1">{errors.message.message}</p>}
            </div>

            <button
               type="submit"
               disabled={isSubmitting}
               className="btn btn-primary w-full py-5 rounded-2xl text-lg font-bold gap-3 group"
            >
               {isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
               <Send className={cn("w-5 h-5 transition-transform", isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 group-hover:-translate-y-1")} />
            </button>
         </form>
      </div>
   );
};
