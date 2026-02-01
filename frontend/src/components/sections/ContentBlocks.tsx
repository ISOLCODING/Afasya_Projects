import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import PortfolioCard from '@/components/ui/PortfolioCard';
import TeamCard from '@/components/ui/TeamCard';
import BlogCard from '@/components/ui/BlogCard';
import { ContactForm } from '@/components/ui/ContactForm';
import InteractiveTimeline from '@/components/ui/InteractiveTimeline';
import FlipCard from '@/components/ui/FlipCard';
import BrandScroller from '@/components/sections/BrandScroller';
import { getServices, getPortfolios, getTeam, getPosts } from '@/lib/api';
import { cn, getStorageUrl } from '@/lib/utils';


const BrandsMarqueeBlock = ({ data }: { data: any }) => (
   <BrandScroller
      title={data.title}
      subtitle={data.subtitle}
      description={data.description}
   />
);

const RichTextBlock = ({ data }: { data: any }) => (
   <Section background="white">
      <div
         className="prose prose-lg max-w-4xl mx-auto prose-primary prose-headings:font-display prose-headings:font-bold prose-p:text-secondary-600"
         dangerouslySetInnerHTML={{ __html: data.content }}
      />
   </Section>
);

const HeroBlock = ({ data }: { data: any }) => (
   <section className="relative pt-32 pb-20 overflow-hidden bg-secondary-900 border-b border-primary-900/20">
      <div className="absolute inset-0 bg-primary-950/20 -z-10" />
      <div className="container-custom relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-display font-extrabold text-white mb-6 leading-tight"
               >
                  {data.title}
               </motion.h1>
               {data.subtitle && (
                  <p className="text-xl text-secondary-300 mb-8 max-w-lg">
                     {data.subtitle}
                  </p>
               )}
               {data.cta_text && data.cta_link && (
                  <Link to={data.cta_link} className="btn btn-primary px-10 h-14 text-lg">
                     {data.cta_text} <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
               )}
            </div>
            {data.image && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10"
               >
                  <img src={getStorageUrl(data.image)} alt={data.title} className="w-full h-auto" />
               </motion.div>
            )}
         </div>
      </div>
   </section>
);

const ImageTextBlock = ({ data }: { data: any }) => (
   <Section>
      <div className={cn(
         "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
         data.image_position === 'right' ? 'lg:flex-row-reverse' : ''
      )}>
         <div className={data.image_position === 'right' ? 'lg:order-2' : ''}>
            <img src={getStorageUrl(data.image)} alt="Content image" className="rounded-[40px] shadow-2xl" />
         </div>
         <div className={cn(
            "prose prose-lg prose-primary",
            data.image_position === 'right' ? 'lg:order-1' : ''
         )} dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
   </Section>
);

const ServicesGridBlock = ({ data }: { data: any }) => {
   const { data: services } = useQuery({
      queryKey: ['services-block', data.limit],
      queryFn: () => getServices().then(res => res.data.slice(0, data.limit || 6)),
   });

   return (
      <Section background="gray">
         <SectionHeader
            title={data.title}
            description={data.description}
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service: any, idx: number) => (
               <ServiceCard
                  key={service.slug}
                  title={service.name}
                  description={service.short_description}
                  slug={service.slug}
                  index={idx}
                  icon={CheckCircle} // Fallback icon
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
      <Section background="dark">
         <SectionHeader
            light
            title={data.title}
         />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      primary: 'bg-primary-600 text-white',
      dark: 'bg-secondary-900 text-white',
      light: 'bg-secondary-50 text-secondary-900',
   };

   return (
      <Section>
         <div className={cn(
            "rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden",
            themes[data.theme as keyof typeof themes] || themes.primary
         )}>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-8">{data.title}</h2>
            <Link to={data.button_link} className={cn(
               "btn px-10 h-14 text-lg font-bold",
               data.theme === 'light' ? 'btn-primary' : 'bg-white text-primary-700 hover:bg-secondary-50'
            )}>
               {data.button_text}
            </Link>
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
               default:
                  return null;
            }
         })}
      </>
   );
};

export default ContentBlocks;
