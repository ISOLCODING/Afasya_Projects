import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PricingCardProps {
    packageData: {
        id: number;
        package_name: string;
        price: number;
        description: string;
        included_features: string[] | string;
        excluded_features: string[] | string;
        delivery_days: number;
        is_popular: boolean;
    };
    onSelect?: (packageId: number) => void;
    index?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ packageData, onSelect, index = 0 }) => {
    const isPopular = packageData.is_popular;
    
    // Parse features if they are JSON strings
    const included = Array.isArray(packageData.included_features) 
        ? packageData.included_features 
        : (typeof packageData.included_features === 'string' ? JSON.parse(packageData.included_features) : []);
        
    const excluded = Array.isArray(packageData.excluded_features) 
        ? packageData.excluded_features 
        : (typeof packageData.excluded_features === 'string' ? JSON.parse(packageData.excluded_features || '[]') : []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
                "relative group flex flex-col p-8 rounded-[40px] transition-all duration-500",
                isPopular 
                    ? "bg-linear-to-b from-primary-600/10 to-transparent border-2 border-primary-500 shadow-glow" 
                    : "glass-card border border-white/10 hover:border-primary-500/30"
            )}
        >
            {isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="bg-primary-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <Zap size={14} fill="currentColor" />
                        Recommended
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h3 className={cn(
                    "text-2xl font-display font-black mb-2",
                    isPopular ? "text-primary-400" : "text-white"
                )}>
                    {packageData.package_name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black text-white">
                        Rp {new Intl.NumberFormat('id-ID').format(packageData.price)}
                    </span>
                    <span className="text-secondary-400 text-sm font-bold uppercase tracking-widest">
                        / Project
                    </span>
                </div>
                <p className="text-secondary-400 text-sm leading-relaxed">
                    {packageData.description}
                </p>
            </div>

            <div className="grow space-y-4 mb-10">
                {included.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 shrink-0">
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm text-secondary-200 font-medium">{feature}</span>
                    </div>
                ))}
                
                {excluded.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 opacity-40">
                        <div className="mt-1 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                            <X size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm text-secondary-400 font-medium line-through">{feature}</span>
                    </div>
                ))}
            </div>

            <button
                onClick={() => onSelect?.(packageData.id)}
                className={cn(
                    "w-full h-14 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300",
                    isPopular 
                        ? "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20" 
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                )}
            >
                Pilih Paket
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
};

export default PricingCard;
