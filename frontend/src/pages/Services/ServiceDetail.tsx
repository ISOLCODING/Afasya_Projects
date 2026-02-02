import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    ChevronLeft, 
    Clock, 
    Star,
    MessageSquare
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import ServiceEstimator from '@/components/services/ServiceEstimator';
import { getServiceBySlug } from '@/lib/api';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { data: service, isLoading } = useQuery({
        queryKey: ['service', slug],
        queryFn: () => getServiceBySlug(slug!).then(res => res.data),
        enabled: !!slug
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-950">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-950 text-center p-6">
                <h2 className="text-3xl font-display font-bold text-white mb-4">Layanan Tidak Ditemukan</h2>
                <button onClick={() => navigate('/services')} className="btn btn-primary">Kembali ke Layanan</button>
            </div>
        );
    }


    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-white dark:bg-secondary-950 overflow-hidden min-h-[80vh] flex items-center transition-colors duration-300">
                {/* Animated Background Elements */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200/40 dark:bg-primary-600/20 rounded-full blur-[120px] z-0"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-200/40 dark:bg-accent-600/10 rounded-full blur-[100px] z-0"
                />
                
                <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.button
                            variants={item}
                            onClick={() => navigate('/services')}
                            className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-white mb-8 group transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-secondary-200 dark:group-hover:bg-white/10 transition-colors">
                                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                            </div>
                            <span className="text-sm font-medium">Kembali ke Layanan</span>
                        </motion.button>

                        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-white text-xs font-bold uppercase tracking-widest mb-6">
                            <Star size={14} className="fill-primary-600 text-primary-600 dark:fill-primary-400 dark:text-primary-400" />
                            <span className="text-primary-800 dark:text-primary-100">Premium Service</span>
                        </motion.div>

                        <motion.h1 variants={item} className="text-5xl md:text-7xl font-display font-black text-secondary-900 dark:text-white mb-6 leading-[1.1]">
                            {service.name}
                        </motion.h1>

                        <motion.p variants={item} className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 leading-relaxed max-w-lg">
                            {service.short_description}
                        </motion.p>

                        <motion.div variants={item} className="flex flex-wrap gap-4 md:gap-8 items-center p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-sm shadow-xl dark:shadow-none">
                            <div className="flex flex-col">
                                <span className="text-xs text-secondary-500 dark:text-secondary-400 uppercase font-bold tracking-widest mb-1">Mulai Dari</span>
                                <span className="text-3xl font-black text-secondary-900 dark:text-white">
                                    Rp {new Intl.NumberFormat('id-ID').format(Number(service.starting_price || service.price_min))}
                                </span>
                            </div>
                            <div className="h-10 w-px bg-secondary-200 dark:bg-white/10 hidden sm:block" />
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-inner">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-secondary-500 dark:text-secondary-400 uppercase font-bold tracking-widest mb-0.5">Estimasi Waktu</p>
                                    <p className="text-secondary-900 dark:text-white font-bold">{service.delivery_time || '7 - 14 Hari Kerja'}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: 20 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative perspective-1000 hidden lg:block"
                    >
                        {/* 3D Wrapper */}
                        <div className="relative rounded-[48px] border border-white/40 dark:border-white/20 shadow-2xl glass-card bg-white/30 dark:bg-secondary-900/30 p-3 rotate-y-12 hover:rotate-y-0 transition-transform duration-700 ease-out-expo group">

                            {/* Inner Image Container */}
                            <div className="relative rounded-[40px] overflow-hidden shadow-inner">
                                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent z-10 pointer-events-none" />
                                <img 
                                    src={service.icon_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070"} 
                                    alt={service.name}
                                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Floating decorative card */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{
                                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                                    scale: { duration: 0.2 }
                                }}
                                className="absolute -bottom-10 -left-10 bg-white/90 dark:bg-secondary-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 p-6 rounded-3xl shadow-xl dark:shadow-2xl z-20 min-w-[240px]"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                        <Clock size={20} className="text-white relative z-10" />
                                        <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">Available Now</p>
                                        <p className="text-secondary-900 dark:text-white text-sm font-bold">Fast Delivery</p>
                                    </div>
                                </div>
                                <div className="h-1 w-full bg-secondary-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                                </div>
                                <p className="text-secondary-500 dark:text-secondary-400 text-xs mt-3 leading-relaxed">
                                    Tim kami siap mengerjakan proyek Anda hari ini.
                                </p>
                            </motion.div>

                            {/* Additional Floating Badge (Right side) */}
                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-6 -right-6 bg-white dark:bg-secondary-800 text-primary-600 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-2"
                            >
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 border-2 border-white dark:border-secondary-800 flex items-center justify-center text-[8px] font-bold text-primary-700 dark:text-primary-300">
                                            {i}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs font-bold">
                                    <span className="block text-secondary-900 dark:text-white">100+</span>
                                    <span className="text-secondary-500 font-normal">Klien Puas</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features & Packages */}
            <Section background="gray" className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-black/[0.03] dark:bg-grid-white/[0.05] pointer-events-none" />
                
                <div className="space-y-24 md:space-y-32">
                    {/* 1. Features Grid Section */}
                    <div className="relative z-10">
                        <SectionHeader
                            align="center"
                            subtitle="Fitur & Keunggulan"
                            title="Apa yang Anda Dapatkan?"
                            description="Setiap proyek dikerjakan dengan standar kualitas tinggi untuk memastikan kepuasan Anda."
                            className="mb-16"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {(service.features || []).map((feature: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="p-8 rounded-[32px] bg-white dark:bg-white/5 border border-secondary-100 dark:border-white/5 shadow-sm hover:shadow-lg dark:hover:bg-white/10 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-secondary-900 dark:text-white mb-3">{feature.name}</h4>
                                    <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Custom Solution Banner */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative overflow-hidden rounded-[40px] bg-linear-to-r from-primary-600 to-accent-600 p-10 md:p-16 text-center text-white shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10 max-w-2xl mx-auto">
                                <MessageSquare className="w-12 h-12 text-white/80 mx-auto mb-6" />
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                                    Punya Kebutuhan Khusus?
                                </h3>
                                <p className="text-primary-100 text-lg mb-10 leading-relaxed">
                                    Bisnis Anda unik, begitu juga solusinya. Konsultasikan kebutuhan spesifik Anda dan dapatkan penawaran custom yang presisi.
                                </p>
                                <button className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-secondary-50 transition-colors shadow-xl shadow-black/10">
                                    <MessageSquare size={20} />
                                    <span>Konsultasi Gratis</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3. Full Width Pricing & Estimator */}
                    <div className="relative z-10">
                        <SectionHeader
                            align="center"
                            subtitle="Pilihan Investasi"
                            title="Pilih Paket Layanan yang Sesuai"
                            description="Investasi transparan tanpa biaya tersembunyi. Pilih paket yang paling mewakili target bisnis Anda."
                            className="mb-16"
                        />

                        <ServiceEstimator
                            packages={service.packages || []}
                            serviceName={service.name}
                        />
                    </div>
                </div>
            </Section>
        </PageLayout>
    );
};

export default ServiceDetail;
