import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import PortfolioCard from '@/components/ui/PortfolioCard';
import TeamCard from '@/components/ui/TeamCard';
import BlogCard from '@/components/ui/BlogCard';
import { ContactForm } from '@/components/ui/ContactForm';
import InteractiveTimeline from '@/components/ui/InteractiveTimeline';
import FlipCard from '@/components/ui/FlipCard';
import PricingCard from '@/components/ui/PricingCard';
import BrandScroller from '@/components/sections/BrandScroller';
import { getServices, getPortfolios, getTeam, getPosts } from '@/lib/api';
import { getServicePackages } from '@/lib/api/services/service_package';
import { getServiceIcon } from '@/lib/icons';
import { cn, getStorageUrl } from '@/lib/utils';
import React from 'react';
import ServiceTypeShowcase from '@/components/services/ServiceTypeShowcase';
import ServiceDetailsTabs from '@/components/services/ServiceDetailsTabs';


const BrandsMarqueeBlock = ({ data }: { data: any }) => (
   <BrandScroller
      title={data.title}
      subtitle={data.subtitle}
      description={data.description}
   />
);

const RichTextBlock = ({ data }: { data: any }) => (
   <Section background={data.background || "white"}>
      <div
         className={cn(
            "prose prose-lg max-w-4xl mx-auto prose-primary dark:prose-invert",
            "prose-headings:font-display prose-headings:font-bold",
            "prose-p:text-secondary-600 dark:prose-p:text-secondary-300",
            "prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline",
            "prose-strong:text-secondary-900 dark:prose-strong:text-white"
         )}
         dangerouslySetInnerHTML={{ __html: data.content }}
      />
   </Section>
);

const HeroBlock = ({ data }: { data: any }) => (
   <section className="relative pt-32 pb-20 overflow-hidden bg-secondary-950 border-b border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-[100px] mix-blend-screen" />
         <div className="absolute inset-0 bg-grid-tech opacity-10 pointer-events-none" />
      </div>

      <div className="container-custom relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-8 leading-[1.1] tracking-tight drop-shadow-lg"
                  dangerouslySetInnerHTML={{ __html: data.title }}
               />

               {data.subtitle && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="text-xl md:text-2xl text-secondary-300 mb-10 max-w-xl leading-relaxed font-medium"
                     dangerouslySetInnerHTML={{ __html: data.subtitle }}
                  />
               )}

               {data.cta_text && data.cta_link && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                  >
                     <Link to={data.cta_link} className="btn btn-primary px-10 h-16 text-lg shadow-glow hover:shadow-glow-lg transition-all rounded-2xl group">
                        {data.cta_text}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                     </Link>
                  </motion.div>
               )}
            </motion.div>

            {data.image && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group"
               >
                  <div className="absolute -inset-4 bg-primary-500/20 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 glass-card bg-secondary-900/50 p-2">
                     <div className="rounded-[32px] overflow-hidden">
                        <img
                           src={getStorageUrl(data.image)}
                           alt={data.title?.replace(/<[^>]*>/g, '') || "Hero image"}
                           className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                     </div>
                  </div>
               </motion.div>
            )}
         </div>
      </div>
   </section>
);

const ImageTextBlock = ({ data }: { data: any }) => (
   <Section background={data.background || "white"}>
      <div className={cn(
         "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
         data.image_position === 'right' ? 'lg:flex-row-reverse' : ''
      )}>
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
               "relative group",
               data.image_position === 'right' ? 'lg:order-2' : ''
            )}
         >
            <div className="absolute -inset-4 bg-primary-500/10 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
               src={getStorageUrl(data.image)}
               alt="Content image"
               className="relative rounded-[40px] shadow-2xl border border-white/10 w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
         </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
               "prose prose-lg max-w-none transition-colors duration-300",
               "prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight",
               "prose-p:text-secondary-600 dark:prose-p:text-secondary-300",
               "prose-primary dark:prose-invert",
               data.image_position === 'right' ? 'lg:order-1' : ''
            )}
            dangerouslySetInnerHTML={{ __html: data.content }}
         />
      </div>
   </Section>
);

const ServicesGridBlock = ({ data }: { data: any }) => {
   const { data: services } = useQuery({
      queryKey: ['services-block', data.limit],
      queryFn: () => getServices().then(res => res.data.slice(0, data.limit || 6)),
   });

   return (
      <Section background="gray" className="relative group/grid">
         <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent pointer-events-none" />

         <SectionHeader
            title={data.title}
            description={data.description}
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {services?.map((service: any, idx: number) => (
               <ServiceCard
                  key={service.slug}
                  title={service.name}
                  description={service.short_description}
                  slug={service.slug}
                  index={idx}
                  icon={getServiceIcon(service.name, service.icon)}
                  startingPrice={service.starting_price || service.price_min}
                  deliveryTime={service.delivery_time}
               />
            ))}
         </div>
      </Section>
   );
};

const PortfolioGridBlock = ({ data }: { data: any }) => {
   const { data: portfolios } = useQuery({
      queryKey: ['portfolio-block', data.limit],
      queryFn: () => getPortfolios().then(res => res.data.slice(0, data.limit || 6)),
   });

   return (
      <Section background="dark" className="relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -z-10" />
         <SectionHeader
            light
            title={data.title}
            description={data.description}
            className="mb-20"
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolios?.map((item: any, idx: number) => (
               <PortfolioCard
                  key={item.slug}
                  title={item.title}
                  category={item.category}
                  image={item.featured_image}
                  slug={item.slug}
                  index={idx}
               />
            ))}
         </div>
      </Section>
   );
};

const TeamGridBlock = ({ data }: { data: any }) => {
   const { data: team } = useQuery({
      queryKey: ['team-block', data.limit],
      queryFn: () => getTeam().then(res => res.data.slice(0, data.limit || 4)),
   });

   return (
      <Section>
         <SectionHeader title={data.title} />
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team?.map((member: any, idx: number) => (
               <TeamCard
                  key={idx}
                  name={member.name}
                  position={member.position}
                  image={member.photo_url || member.profile_image}
                  index={idx}
               />
            ))}
         </div>
      </Section>
   );
};

const BlogGridBlock = ({ data }: { data: any }) => {
   const { data: posts } = useQuery({
      queryKey: ['blog-block', data.limit],
      queryFn: () => getPosts({ limit: data.limit || 3 }).then(res => res.data),
   });

   return (
      <Section background="gray">
         <SectionHeader title={data.title} />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post: any, idx: number) => (
               <BlogCard
                  key={post.slug}
                  post={{
                     ...post,
                     author: post.author?.name || 'Admin',
                     image_url: post.featured_image,
                     category: post.category?.name || 'General'
                  }}
                  index={idx}
               />
            ))}
         </div>
      </Section>
   );
};

const TimelineBlock = ({ data }: { data: any }) => (
   <Section background="dark">
      <SectionHeader
         light
         title={data.title}
         description={data.description}
      />
      <InteractiveTimeline items={data.items || []} />
   </Section>
);

const TeamFlipGridBlock = ({ data }: { data: any }) => {
   const { data: team } = useQuery({
      queryKey: ['team-flip-block', data.limit],
      queryFn: () => getTeam().then(res => res.data.slice(0, data.limit || 4)),
   });

   return (
      <Section>
         <SectionHeader title={data.title} description={data.description} />
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team?.map((member: any, idx: number) => (
               <FlipCard
                  key={idx}
                  name={member.name}
                  position={member.position}
                  photoUrl={getStorageUrl(member.photo_url || member.profile_image)}
                  bio={member.short_bio || member.bio || ''}
                  socialLinks={member.social || {}}
               />
            ))}
         </div>
      </Section>
   );
};

const ContactFormBlock = ({ data }: { data: any }) => (
   <Section>
      <div className="max-w-4xl mx-auto">
         <ContactForm title={data.title} description={data.description} />
      </div>
   </Section>
);

const CTABlock = ({ data }: { data: any }) => {
   const themes = {
      primary: 'bg-primary-600 text-white shadow-[0_0_50px_-12px_rgba(14,165,233,0.5)]',
      dark: 'bg-secondary-900 dark:bg-black/40 text-white border border-white/10',
      light: 'bg-secondary-50 dark:bg-secondary-900/50 text-secondary-900 dark:text-white border border-transparent dark:border-white/10',
   };

   return (
      <Section>
         <div className={cn(
            "rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden backdrop-blur-sm",
            themes[data.theme as keyof typeof themes] || themes.primary
         )}>
            <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8 relative z-10">{data.title}</h2>
            <Link to={data.button_link} className={cn(
               "btn px-10 h-14 text-lg font-bold relative z-10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1",
               data.theme === 'light' ? 'btn-primary' : 'bg-white text-primary-700 hover:bg-secondary-50'
            )}>
               {data.button_text}
            </Link>
         </div>
      </Section>
   );
};

const PricingBlock = ({ data }: { data: any }) => {
   const [packages, setPackages] = React.useState<any[]>([]);
   const [loading, setLoading] = React.useState(true);
   const navigate = useNavigate();

   React.useEffect(() => {
      const fetchPackages = async () => {
         const res = await getServicePackages(data.package_ids);
         if (res.success) {
            setPackages(res.data);
         }
         setLoading(false);
      };
      if (data.package_ids && data.package_ids.length > 0) {
         fetchPackages();
      } else {
         setLoading(false);
      }
   }, [data.package_ids]);

   const handleSelect = (id: number) => {
      navigate(`/checkout/${id}`);
   };

   if (loading) return (
      <div className="py-20 flex justify-center">
         <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
   );

   return (
      <Section id="pricing">
         <SectionHeader
            subtitle={data.subtitle}
            title={data.title}
            description={data.description}
         />
         <div className={cn(
            "grid gap-8 mt-16",
            data.columns === '4' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
               data.columns === '2' ? "grid-cols-1 md:grid-cols-2" :
                  "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
         )}>
            {packages.map((pkg, idx) => (
               <PricingCard key={pkg.id} packageData={pkg} index={idx} onSelect={handleSelect} />
            ))}
         </div>
      </Section>
   );
};

const ServiceShowcaseBlock = ({ data }: { data: any }) => {
   const { data: services } = useQuery({
      queryKey: ['services-showcase'],
      queryFn: () => getServices().then(res => res.data),
   });

   return (
      <Section>
         <ServiceTypeShowcase
            services={services || []}
            title={data.title}
            subtitle={data.subtitle}
            description={data.description}
         />
      </Section>
   );
};

const ServiceTabsBlock = ({ data }: { data: any }) => {
   const { data: services } = useQuery({
      queryKey: ['services-tabs'],
      queryFn: () => getServices().then(res => res.data),
   });

   return (
      <Section background="gray" className="relative overflow-hidden">
         <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent pointer-events-none" />
         <SectionHeader
            align="center"
            subtitle={data.subtitle || "Analisis Mendalam"}
            title={data.title || "Detail & Spesifikasi Layanan"}
            description={data.description}
            className="mb-16"
         />
         <div className="relative z-10">
            <ServiceDetailsTabs services={services || []} />
         </div>
      </Section>
   );
};

const ContentBlocks = ({ blocks }: { blocks: any[] }) => {
   if (!blocks || !Array.isArray(blocks)) return null;

   return (
      <>
         {blocks.map((block, index) => {
            switch (block.type) {
               case 'rich_text':
                  return <RichTextBlock key={index} data={block.data} />;
               case 'hero':
                  return <HeroBlock key={index} data={block.data} />;
               case 'image_text':
                  return <ImageTextBlock key={index} data={block.data} />;
               case 'services_grid':
                  return <ServicesGridBlock key={index} data={block.data} />;
               case 'portfolio_grid':
                  return <PortfolioGridBlock key={index} data={block.data} />;
               case 'team_grid':
                  return <TeamGridBlock key={index} data={block.data} />;
               case 'blog_grid':
                  return <BlogGridBlock key={index} data={block.data} />;
               case 'timeline':
                  return <TimelineBlock key={index} data={block.data} />;
               case 'team_flip_grid':
                  return <TeamFlipGridBlock key={index} data={block.data} />;
               case 'contact_form':
                  return <ContactFormBlock key={index} data={block.data} />;
               case 'cta_section':
                  return <CTABlock key={index} data={block.data} />;
               case 'brands_marquee':
                  return <BrandsMarqueeBlock key={index} data={block.data} />;
               case 'pricing_grid':
                  return <PricingBlock key={index} data={block.data} />;
               case 'service_showcase':
                  return <ServiceShowcaseBlock key={index} data={block.data} />;
               case 'service_tabs':
                  return <ServiceTabsBlock key={index} data={block.data} />;
               default:
                  return null;
            }
         })}
      </>
   );
};

export default ContentBlocks;
