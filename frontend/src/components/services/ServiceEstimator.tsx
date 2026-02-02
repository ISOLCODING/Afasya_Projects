import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowRight, Check, Minus, Rocket, ShieldCheck } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Package {
    id: number;
    package_name: string;
    price: string | number;
    description: string;
    included_features: string[];
    is_popular: boolean;
    delivery_days: number;
}

interface ServiceEstimatorProps {
    packages: Package[];
    serviceName: string;
}

const ServiceEstimator: React.FC<ServiceEstimatorProps> = ({ packages, serviceName }) => {
    const navigate = useNavigate();
    // Default to the middle package (usually Pro) or the first one
    const defaultPackage = packages.find(p => p.is_popular) || packages[1] || packages[0];
    const [selectedPkgId, setSelectedPkgId] = useState<number>(defaultPackage?.id);

    const selectedPackage = packages.find(p => p.id === selectedPkgId) || defaultPackage;

    // Collect all unique features for the comparison table
    const allFeatures = useMemo(() => {
        const features = new Set<string>();
        packages.forEach(pkg => {
            if (Array.isArray(pkg.included_features)) {
                pkg.included_features.forEach(f => features.add(f));
            }
        });
        return Array.from(features);
    }, [packages]);

    const formatPrice = (price: string | number) => {
        return new Intl.NumberFormat('id-ID').format(Number(price));
    };

    // Animation for price counting
    const AnimatedPrice = ({ value }: { value: number }) => {
        const count = useMotionValue(0);
        const rounded = useTransform(count, Math.round);
        const display = useTransform(rounded, (latest) => formatPrice(latest));
      
        useEffect(() => {
          const controls = animate(count, value, { duration: 0.8, ease: "circOut" });
          return controls.stop;
        }, [value]);
      
        return <motion.span>{display}</motion.span>;
    };

    const handleOrder = () => {
        if (selectedPackage) {
            navigate(`/checkout/${selectedPackage.id}`);
        }
    };

    if (!packages || packages.length === 0) return null;

    return (
        <div id="pricing-estimator" className="w-full">
            {/* Package Selector Cards (Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {packages.map((pkg) => {
                    const isSelected = selectedPkgId === pkg.id;
                    return (
                        <div 
                            key={pkg.id}
                            onClick={() => setSelectedPkgId(pkg.id)}
                            className={`
                                relative cursor-pointer group rounded-3xl p-6 transition-all duration-300
                                ${isSelected 
                                    ? 'bg-primary-600 shadow-glow scale-105 z-10 border-transparent' 
                                    : 'bg-white dark:bg-white/5 border border-secondary-100 dark:border-white/10 hover:border-primary-500/30 dark:hover:border-white/20 shadow-md dark:shadow-none hover:shadow-xl'
                                }
                            `}
                        >
                            {pkg.is_popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-500 text-secondary-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex flex-col h-full">
                                <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-secondary-900 dark:text-white'}`}>
                                    {pkg.package_name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className={`text-sm font-medium ${isSelected ? 'text-primary-200' : 'text-secondary-500 dark:text-secondary-400'}`}>Rp</span>
                                    <span className={`text-3xl font-black ${isSelected ? 'text-white' : 'text-secondary-900 dark:text-white'}`}>
                                        {formatPrice(pkg.price)}
                                    </span>
                                </div>
                                <p className={`text-sm mb-6 leading-relaxed ${isSelected ? 'text-primary-100' : 'text-secondary-600 dark:text-secondary-400'}`}>
                                    {pkg.description}
                                </p>
                                
                                <div className="mt-auto flex items-center justify-between">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-primary-200' : 'text-secondary-500 dark:text-secondary-500'}`}>
                                        {pkg.delivery_days} Hari Kerja
                                    </span>
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center transition-colors
                                        ${isSelected ? 'bg-white text-primary-600' : 'bg-secondary-100 dark:bg-white/10 text-secondary-600 dark:text-white'}
                                    `}>
                                        {isSelected ? <Check size={16} /> : <ArrowRight size={16} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Interaction / Estimate Area */}
            <motion.div 
                layout
                className="bg-linear-to-br from-secondary-900 to-secondary-950 dark:from-secondary-900 dark:to-secondary-950 border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 relative overflow-hidden text-white"
            >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4 border border-emerald-500/20">
                            <Rocket size={14} />
                            Estimasi Proyek Anda
                        </div>
                        <h3 className="text-3xl font-display font-bold text-white mb-2">
                            {selectedPackage.package_name} Package
                        </h3>
                        <p className="text-secondary-400">
                            Estimasi biaya untuk layanan {serviceName} dengan paket yang dipilih.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right hidden md:block">
                            <span className="text-sm text-secondary-400 block mb-1">Total Investasi</span>
                            <motion.span 
                                key={selectedPackage.price}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-black text-white block min-w-[200px] text-right"
                            >
                                Rp <AnimatedPrice value={Number(selectedPackage.price)} />
                            </motion.span>
                        </div>
                        <button 
                            onClick={handleOrder}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                            Mulai Proyek
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Comparison Table */}
            <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-[800px] text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-6 text-sm font-bold text-secondary-500 dark:text-secondary-400 uppercase tracking-wider w-1/3">Fitur Layanan</th>
                            {packages.map(pkg => (
                                <th key={pkg.id} className={`p-6 text-center w-1/5 ${selectedPkgId === pkg.id ? 'bg-secondary-50/50 dark:bg-white/5 rounded-t-2xl' : ''}`}>
                                    <span className={`text-lg font-bold block mb-1 ${selectedPkgId === pkg.id ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-900 dark:text-white'}`}>
                                        {pkg.package_name}
                                    </span>
                                    <span className="text-sm text-secondary-500 block">
                                        Rp {new Intl.NumberFormat('id-ID', { notation: "compact" }).format(Number(pkg.price))}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-200 dark:divide-white/5">
                        {allFeatures.map((feature, idx) => (
                            <tr key={idx} className="group hover:bg-secondary-50 dark:hover:bg-white/5 transition-colors">
                                <td className="p-6 text-secondary-900 dark:text-white font-medium text-sm flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-secondary-400 dark:bg-secondary-700 group-hover:bg-primary-500 transition-colors" />
                                    {feature}
                                </td>
                                {packages.map(pkg => {
                                    const hasFeature = pkg.included_features.includes(feature);
                                    const isSelected = selectedPkgId === pkg.id;
                                    return (
                                        <td 
                                            key={pkg.id} 
                                            className={`
                                                p-6 text-center transition-colors 
                                                ${isSelected ? 'bg-secondary-50/50 dark:bg-white/5' : ''}
                                                ${isSelected && idx === allFeatures.length - 1 ? 'rounded-b-2xl' : ''}
                                            `}
                                        >
                                            {hasFeature ? (
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${isSelected ? 'bg-primary-500 text-white shadow-glow' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-500'}`}>
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto bg-secondary-100 text-secondary-400 dark:bg-white/5 dark:text-secondary-600">
                                                    <Minus size={16} />
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 text-center">
                <p className="text-secondary-500 dark:text-secondary-400 text-sm flex items-center justify-center gap-2">
                    <ShieldCheck size={16} className="text-primary-500" />
                    Semua paket dilindungi garansi maintenance 30 hari & dukungan teknis prioritas.
                </p>
            </div>
        </div>
    );
};

export default ServiceEstimator;
