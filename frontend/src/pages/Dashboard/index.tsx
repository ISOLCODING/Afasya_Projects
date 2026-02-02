import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Package, 
    Calendar, 
    Clock, 
    CheckCircle2, 
    AlertCircle, 
    CreditCard,
    ArrowUpRight,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock/API placeholder
const getUserPackages = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/user-packages`);
    return await res.json();
};

const UserDashboard = () => {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUserPackages();
            if (res.status === 'success') {
                setPackages(res.data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'expired': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
            case 'pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            default: return 'text-secondary-400 bg-secondary-400/10 border-secondary-400/20';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-950">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-950 pt-32 pb-20">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-display font-black text-white mb-2">My Digital Assets</h1>
                        <p className="text-secondary-400">Kelola paket layanan dan akses digital Anda di sini.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-500">
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-secondary-500 uppercase font-bold tracking-widest">Active Services</p>
                            <p className="text-xl font-black text-white">{packages.filter(p => p.status === 'active').length}</p>
                        </div>
                    </div>
                </div>

                {packages.length === 0 ? (
                    <div className="glass-card p-12 rounded-[40px] text-center border border-white/10">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package size={32} className="text-secondary-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Belum ada paket aktif</h3>
                        <p className="text-secondary-400 mb-8 max-w-sm mx-auto">
                            Jelajahi paket layanan kami dan tingkatkan bisnis Anda ke level berikutnya.
                        </p>
                        <a href="/services" className="btn btn-primary px-8 h-12 rounded-xl">
                            Lihat Layanan
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {packages.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-8 rounded-[40px] border border-white/10 flex flex-col lg:flex-row gap-8 items-start lg:items-center group hover:border-primary-500/30 transition-all duration-500"
                            >
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 group-hover:bg-primary-500/10 transition-colors">
                                    <Package size={32} className="text-primary-500" />
                                </div>
                                
                                <div className="grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-white">{item.service_package?.package_name}</h3>
                                        <span className={cn(
                                            "px-4 py-1 rounded-full text-xs font-bold border uppercase tracking-widest",
                                            getStatusColor(item.status)
                                        )}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-secondary-400 mb-4 max-w-2xl">{item.service_package?.description}</p>
                                    
                                    <div className="flex flex-wrap gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-secondary-400">
                                            <Calendar size={16} className="text-primary-500" />
                                            <span>Mulai: {new Date(item.started_at).toLocaleDateString()}</span>
                                        </div>
                                        {item.expires_at && (
                                            <div className="flex items-center gap-2 text-secondary-400">
                                                <Clock size={16} className="text-primary-500" />
                                                <span>Berakhir: {new Date(item.expires_at).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-secondary-400">
                                            <CreditCard size={16} className="text-primary-500" />
                                            <span>Order ID: #{item.order_id}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-auto flex gap-3">
                                    <button className="btn btn-primary grow lg:flex-none px-8 h-14 rounded-2xl font-bold group">
                                        Akses Service
                                        <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Info Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass-card p-8 rounded-[32px] border border-white/10">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-2xl flex items-center justify-center text-primary-500 mb-6">
                            <CheckCircle2 size={24} />
                        </div>
                        <h4 className="font-bold text-white mb-2">Akses Instan</h4>
                        <p className="text-sm text-secondary-400 leading-relaxed">
                            Setelah pembayaran dikonfirmasi, Anda dapat langsung mengakses fitur-fitur eksklusif dalam paket.
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-[32px] border border-white/10">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6">
                            <AlertCircle size={24} />
                        </div>
                        <h4 className="font-bold text-white mb-2">Bantuan 24/7</h4>
                        <p className="text-sm text-secondary-400 leading-relaxed">
                            Butuh bantuan dengan layanan Anda? Tim support kami siap membantu kapan saja melalui pusat bantuan.
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-[32px] border border-white/10">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                            <ArrowUpRight size={24} />
                        </div>
                        <h4 className="font-bold text-white mb-2">Upgrade Tersedia</h4>
                        <p className="text-sm text-secondary-400 leading-relaxed">
                            Ingin fitur lebih? Anda dapat melakukan upgrade paket kapan saja untuk kapasitas yang lebih besar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
