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
import AnimatedGridPattern from '@/components/ui/AnimatedGridPattern';
import Beams from '@/components/ui/Beams';
import TextGenerateEffect from '@/components/ui/TextGenerateEffect';
import Magnetic from '@/components/ui/Magnetic';
import GlowSeparator from '@/components/ui/GlowSeparator';


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
   <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-amber-50/50 dark:bg-neutral-950 border-b border-stone-200 dark:border-white/5">
      {/* Background decoration - Beams */}
      <div className="absolute inset-0 z-0 bg-amber-50/50 dark:bg-neutral-950 transition-colors duration-500">
         <Beams
            className="absolute inset-0 h-full w-full opacity-40 dark:opacity-60"
            count={25}
            minSpeed={0.4}
            maxSpeed={2.0}
            rotation={-30}
            width={70}
            intensity={0.6}
            color="#a8a29e" // Stone-400 for warm organic feel in light mode
         />
         {/* Vignette Overlay - Warm Cream Falloff */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,251,235,0.8)_80%,rgba(255,251,235,1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,rgba(10,10,10,0.8)_80%,rgba(10,10,10,1)_100%)] pointer-events-none" />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto px-6">

         {/* "New Background" Badge - Fresher Look */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
         >
            <div className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-md text-sm font-medium text-neutral-600 dark:text-neutral-300 shadow-sm transition-all hover:bg-white/80 dark:hover:bg-white/10 cursor-default">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <span className="tracking-wide text-xs uppercase font-bold text-neutral-800 dark:text-white">v2.0 Available</span>
            </div>
         </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
         >
            {/* Main Title - Huge & Clean & Modern Font */}
            <h1
               className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.05] tracking-tight drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-500"
               dangerouslySetInnerHTML={{ __html: data.title }}
            />

            {/* Subtitle - Centered & Readable */}
            {data.subtitle && (
               <div className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
                  <TextGenerateEffect words={data.subtitle.replace(/<[^>]*>/g, '')} />
               </div>
            )}

            {/* CTAs - Centered Double Button Layout */}
            {data.cta_text && data.cta_link && (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
               >
                  {/* Primary CTA - Modern Gradient Button */}
                  <Magnetic strength={50}>
                     <Link to={data.cta_link} className="btn relative overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-black px-10 h-14 text-base font-bold transition-all rounded-full flex items-center justify-center min-w-[180px] shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        <span className="relative z-10">{data.cta_text}</span>
                     </Link>
                  </Magnetic>

                  {/* Secondary CTA (Ghost/Glass) */}
                  <Magnetic strength={50}>
                     <Link to="/contact" className="btn bg-transparent text-neutral-900 dark:text-white border border-neutral-300 dark:border-white/20 px-10 h-14 text-base font-bold hover:bg-neutral-100 dark:hover:bg-white/10 backdrop-blur-sm transition-all rounded-full flex items-center justify-center min-w-[180px]">
                        Let's Talk
                     </Link>
                  </Magnetic>
               </motion.div>
            )}
         </motion.div>
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
      queryFn: () => getServices({ limit: data.limit || 6 }).then(res => res.data),
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
      queryFn: () => getPortfolios({ limit: data.limit || 6 }).then(res => res.data),
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
      queryFn: () => getTeam({ limit: data.limit || 4 }).then(res => res.data),
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
      queryFn: () => getTeam({ limit: data.limit || 4 }).then(res => res.data),
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
      <div className="max-w-7xl mx-auto">
         <ContactForm
            title={data.title}
            description={data.description}
            data={data}
         />
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
            <Magnetic strength={30}>
               <Link to={data.button_link} className={cn(
                  "btn px-10 h-14 text-lg font-bold relative z-10 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center",
                  data.theme === 'light' ? 'btn-primary' : 'bg-white text-primary-700 hover:bg-secondary-50'
               )}>
                  {data.button_text}
               </Link>
            </Magnetic>
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

const FeatureGridBlock = ({ data }: { data: any }) => (
   <Section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         {/* Left Main Image - 8 columns */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 rounded-[32px] overflow-hidden group relative aspect-16/10 lg:aspect-auto"
         >
            <img
               src={getStorageUrl(data.main_image)}
               alt="Brand Experience"
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-8 md:p-12">
               <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{data.title}</h2>
            </div>
         </motion.div>

         {/* Right Cards Area - 4 columns */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Top Description Card */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="flex-1 bg-white dark:bg-neutral-900 rounded-[32px] p-8 flex flex-col justify-center border border-neutral-100 dark:border-white/5"
            >
               <p className="text-lg text-secondary-600 dark:text-secondary-300 leading-relaxed italic">
                  "{data.description}"
               </p>
            </motion.div>

            {/* Bottom Dark Card */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="flex-1 bg-secondary-900 rounded-[32px] p-8 relative overflow-hidden group border border-white/5"
            >
               <div className="absolute top-0 right-0 p-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                     <ArrowRight className="text-white w-6 h-6 -rotate-45" />
                  </div>
               </div>
               <div className="h-full flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{data.card_title}</h3>
                  <p className="text-secondary-400 text-sm leading-relaxed mb-6">
                     {data.card_description}
                  </p>
                  <Link to={data.card_link || "#"} className="btn btn-primary h-12 text-sm w-fit rounded-xl">
                     Discover more
                  </Link>
               </div>
               {/* Decorative background logo/icon */}
               <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <img src="/logo-icon-white.svg" className="w-40 h-40 filter invert brightness-0" alt="" />
               </div>
            </motion.div>
         </div>
      </div>
   </Section>
);

const StatsDarkBlock = ({ data }: { data: any }) => (
   <Section background="dark">
      <div className="bg-secondary-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-12 md:p-20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 relative z-10">
            <div>
               <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
                  {data.title}
               </h2>
               <p className="text-secondary-400 text-lg max-w-xl">
                  {data.description}
               </p>
            </div>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {data.items?.map((stat: any, idx: number) => (
               <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col gap-2"
               >
                  <span className="text-secondary-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</span>
                  <span className="text-4xl md:text-6xl font-display font-black text-white">{stat.value}</span>
               </motion.div>
            ))}
         </div>
      </div>
   </Section>
);

const ContentBlocks = ({ blocks }: { blocks: any[] }) => {
   if (!blocks || !Array.isArray(blocks)) return null;

   return (
      <div className="flex flex-col relative w-full">
         {blocks.map((block, index) => {
            let BlockComponent = null;

            switch (block.type) {
               case 'rich_text': BlockComponent = RichTextBlock; break;
               case 'hero': BlockComponent = HeroBlock; break;
               case 'image_text': BlockComponent = ImageTextBlock; break;
               case 'services_grid': BlockComponent = ServicesGridBlock; break;
               case 'portfolio_grid': BlockComponent = PortfolioGridBlock; break;
               case 'team_grid': BlockComponent = TeamGridBlock; break;
               case 'blog_grid': BlockComponent = BlogGridBlock; break;
               case 'timeline': BlockComponent = TimelineBlock; break;
               case 'team_flip_grid': BlockComponent = TeamFlipGridBlock; break;
               case 'contact_form': BlockComponent = ContactFormBlock; break;
               case 'cta_section': BlockComponent = CTABlock; break;
               case 'brands_marquee': BlockComponent = BrandsMarqueeBlock; break;
               case 'pricing_grid': BlockComponent = PricingBlock; break;
               case 'service_showcase': BlockComponent = ServiceShowcaseBlock; break;
               case 'service_tabs': BlockComponent = ServiceTabsBlock; break;
               case 'feature_grid': BlockComponent = FeatureGridBlock; break;
               case 'stats_dark': BlockComponent = StatsDarkBlock; break;
               default: BlockComponent = () => null;
            }

            const isLast = index === blocks.length - 1;

            return (
               <React.Fragment key={index}>
                  <div className="relative z-10 block-section">
                     <BlockComponent data={block.data} />
                  </div>

                  {!isLast && (
                     <div className="relative w-full z-20 py-12 md:py-20 flex justify-center items-center pointer-events-none select-none overflow-hidden">
                        <GlowSeparator className="w-full opacity-60" />
                     </div>
                  )}
               </React.Fragment>
            );
         })}
      </div>
   );
};

export default ContentBlocks;
