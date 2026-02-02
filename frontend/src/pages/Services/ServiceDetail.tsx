import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    ChevronLeft, 
    Clock, 
    ShieldCheck, 
    Zap, 
    Star,
    MessageSquare
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import PricingCard from '@/components/ui/PricingCard';
import { getServiceBySlug } from '@/lib/api';

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

    const handlePackageSelect = (packageId: number) => {
        navigate(`/checkout/${packageId}`);
    };

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 bg-secondary-950 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] z-0" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-600/10 rounded-full blur-[100px] z-0" />
                
                <div className="container-custom relative z-10">
                    <button 
                        onClick={() => navigate('/services')}
                        className="flex items-center gap-2 text-primary-500 mb-8 hover:underline group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Semua Layanan
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <Star size={14} className="fill-primary-500" />
                                Layanan Unggulan
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
                                {service.name}
                            </h1>
                            <p className="text-xl text-secondary-400 mb-10 leading-relaxed max-w-xl">
                                {service.short_description}
                            </p>
                            
                            <div className="flex flex-wrap gap-8 items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs text-secondary-500 uppercase font-bold tracking-widest mb-1">Mulai Dari</span>
                                    <span className="text-3xl font-black text-white">
                                        Rp {new Intl.NumberFormat('id-ID').format(Number(service.starting_price || service.price_min))}
                                    </span>
                                </div>
                                <div className="h-10 w-px bg-white/10 hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary-500 border border-white/10">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-secondary-500 uppercase font-bold tracking-widest">Waktu Pengerjaan</p>
                                        <p className="text-white font-bold">{service.delivery_time || '7 - 14 Hari Kerja'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="relative rounded-[48px] overflow-hidden border border-white/10 shadow-2xl glass-card p-2">
                                <img 
                                    src={service.icon_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070"} 
                                    alt={service.name}
                                    className="w-full aspect-video object-cover rounded-[40px]"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-secondary-950/80 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features & Packages */}
            <Section background="dark" className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-white opacity-5 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left side: Features detail */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <SectionHeader
                                light
                                align="left"
                                subtitle="Fitur & Keunggulan"
                                title="Apa yang Anda Dapatkan?"
                                description="Setiap proyek dikerjakan dengan standar kualitas tinggi untuk memastikan kepuasan Anda."
                                className="mb-10"
                            />
                            
                            <div className="space-y-4">
                                {(service.features || []).map((feature: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary-500/30 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 shrink-0 mt-1">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{feature.name}</h4>
                                            <p className="text-sm text-secondary-400">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 p-8 rounded-[32px] bg-primary-600 text-white shadow-glow">
                                <MessageSquare className="mb-4 w-10 h-10" />
                                <h4 className="text-xl font-bold mb-2">Punya Kebutuhan Khusus?</h4>
                                <p className="text-primary-100 text-sm mb-6 leading-relaxed">
                                    Kami siap melayani kustomisasi fitur sesuai dengan kebutuhan unik bisnis Anda.
                                </p>
                                <button className="btn bg-white text-primary-600 hover:bg-secondary-50 w-full h-12 rounded-xl font-bold">
                                    Konsultasi Gratis
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Pricing Packages */}
                    <div className="lg:col-span-8">
                        <SectionHeader
                            light
                            align="left"
                            subtitle="Pilihan Investasi"
                            title="Pilih Paket Layanan yang Sesuai"
                            description="Investasi transparan tanpa biaya tersembunyi. Pilih paket yang paling mewakili target bisnis Anda."
                            className="mb-12"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {(service.packages || []).map((pkg: any, idx: number) => (
                                <PricingCard 
                                    key={pkg.id} 
                                    packageData={pkg} 
                                    index={idx} 
                                    onSelect={handlePackageSelect}
                                />
                            ))}
                        </div>

                        {/* Additional Info Cards */}
                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 rounded-[32px] border border-white/10 bg-white/5 flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-500 shrink-0">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Garansi Maintenance</h4>
                                    <p className="text-sm text-secondary-400 leading-relaxed">
                                        Dukungan teknis pasca-produksi untuk memastikan website Anda tetap berjalan optimal.
                                    </p>
                                </div>
                            </div>
                            <div className="p-8 rounded-[32px] border border-white/10 bg-white/5 flex gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                    <Zap size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-2">Optimasi Kecepatan</h4>
                                    <p className="text-sm text-secondary-400 leading-relaxed">
                                        Fokus pada performa tinggi dan user experience yang mulus di semua perangkat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </PageLayout>
    );
};

export default ServiceDetail;
