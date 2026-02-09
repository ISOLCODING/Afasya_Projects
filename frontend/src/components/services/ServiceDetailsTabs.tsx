import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Code2, Monitor, Smartphone, Search, Layout, Palette, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIconByName } from '@/lib/icons';

interface ServiceDetailsTabsProps {
    services: any[];
}

const ServiceDetailsTabs: React.FC<ServiceDetailsTabsProps> = ({ services }) => {
    const [activeTab, setActiveTab] = useState(0);
    
    // Ensure we have current service
    const currentService = services?.[activeTab];
    const details = currentService?.full_description || {};

    return (
        <div className="w-full bg-white dark:bg-secondary-900/50 rounded-[40px] shadow-2xl overflow-hidden border border-secondary-100 dark:border-white/5 min-h-[600px] flex flex-col lg:flex-row transition-colors duration-500">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-1/3 border-r border-secondary-100 dark:border-white/5 bg-secondary-50/50 dark:bg-black/20">
                <div className="flex flex-col h-full">
                    {services?.map((service, idx) => {
                        const Icon = getIconByName(service.icon) || Layout;
                        const isActive = activeTab === idx;
                        
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={cn(
                                    "flex items-center gap-6 px-10 py-10 transition-all text-left relative group",
                                    isActive 
                                        ? "bg-primary-600 text-white" 
                                        : "hover:bg-primary-50 dark:hover:bg-white/5 text-secondary-600 dark:text-secondary-400"
                                )}
                            >
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                                    isActive 
                                        ? "bg-white/20 shadow-inner" 
                                        : "bg-white dark:bg-white/5 shadow-sm group-hover:scale-110"
                                )}>
                                    <Icon className={cn("w-7 h-7", isActive ? "text-white" : "text-primary-600")} />
                                </div>
                                <span className="text-xl font-display font-black tracking-tight flex-1">
                                    {service.name.split('&')[0].trim()}
                                </span>
                                
                                {isActive && (
                                    <motion.div 
                                        layoutId="tab-active"
                                        className="absolute right-0 top-0 bottom-0 w-1.5 bg-accent-400"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-10 md:p-16 lg:p-24 relative overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-6xl font-display font-black text-secondary-900 dark:text-white leading-[1.1]">
                                    {details.title || currentService?.name}
                                </h2>
                                <div className="h-1.5 w-24 bg-primary-600 rounded-full" />
                            </div>

                            <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed max-w-2xl">
                                {details.content || currentService?.short_description}
                            </p>

                            <div className="space-y-8">
                                <h4 className="text-lg font-display font-black text-secondary-900 dark:text-white uppercase tracking-widest">
                                    {details.subtitle || "Ini yang Anda Dapatkan:"}
                                </h4>
                                
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                    {(details.bullets || []).map((bullet: string, i: number) => (
                                        <motion.li 
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-primary-600">
                                                <Check className="w-3.5 h-3.5 text-primary-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-secondary-600 dark:text-secondary-300 font-medium">
                                                {bullet}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Decorative background icon */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    {(() => {
                        const BgIcon = getIconByName(currentService?.icon) || Layout;
                        return <BgIcon size={600} />;
                    })()}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsTabs;
