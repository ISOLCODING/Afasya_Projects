import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceTypeShowcaseProps {
    services: any[];
    title?: string;
    subtitle?: string;
    description?: string;
}

const ServiceTypeShowcase: React.FC<ServiceTypeShowcaseProps> = ({ 
    services, 
    title = "PILIHAN JENIS JASA PEMBUATAN WEBSITE",
    subtitle = "JASA WEBSITE",
    description = "Dengan Proses Pembuatan Website yang terstruktur dan jelas. Afasya Projects menjamin kepuasan kamu atas Website yang kami buat. Hindari jasa pembuatan website yang hanya mementingkan kata Deal ketimbang Kerjasama jangka panjang."
}) => {
    // We group services into rows of 3 for the showcase
    const displayServices = services?.slice(0, 3) || [];

    return (
        <div className="w-full space-y-12">
            {/* Header Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                <div className="space-y-4">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-secondary-300 dark:border-white/20 text-[10px] font-bold tracking-widest uppercase text-secondary-600 dark:text-secondary-400">
                        {subtitle}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-secondary-900 dark:text-white leading-tight">
                        {title}
                    </h2>
                </div>
                <div className="max-w-xl">
                    <p className="text-secondary-500 dark:text-secondary-400 text-sm md:text-base leading-relaxed lg:text-right">
                        {description}
                    </p>
                </div>
            </div>

            {/* Showcase Box */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary-600 dark:bg-primary-900/40 rounded-[32px] md:rounded-[48px] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-primary-500/20 transition-colors duration-500"
            >
                {/* Decoration background */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/10 to-transparent pointer-events-none" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 relative z-10">
                    {displayServices.map((service, idx) => (
                        <div key={idx} className="space-y-8">
                            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight">
                                {service.name.split('&')[0].trim()}
                            </h3>
                            
                            <ul className="space-y-1">
                                {(service.sub_services || []).map((sub: string, subIdx: number) => (
                                    <li key={subIdx}>
                                        <a 
                                            href={`/services/${service.slug}`}
                                            className="group flex items-center justify-between py-4 border-b border-white/20 hover:border-white transition-colors"
                                        >
                                            <span className="text-white/80 group-hover:text-white font-medium transition-colors">
                                                {sub}
                                            </span>
                                            <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ServiceTypeShowcase;
