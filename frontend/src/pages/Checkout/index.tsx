import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CreditCard, 
    Upload, 
    CheckCircle2, 
    ChevronLeft, 
    ChevronRight, 
    Info, 
    QrCode, 
    Building2,
    Loader2
} from 'lucide-react';
import { cn, getStorageUrl } from '@/lib/utils';
import { getServicePackages, type ServicePackage } from '@/lib/api/services/service_package';
import { getPaymentMethods, type PaymentMethod } from '@/lib/api/services/payment_method';
import { createOrder, uploadPaymentProof } from '@/lib/api/services/order';
import { getWhatsAppLink, getServicePurchaseMessage } from '@/lib/whatsapp';

const CheckoutPage = () => {
    const { packageId } = useParams();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [pkg, setPkg] = useState<ServicePackage | null>(null);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [orderUuid, setOrderUuid] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!packageId) return;
            
            const [pkgRes] = await Promise.all([
                getServicePackages([parseInt(packageId)]),
            ]);
            
            if (pkgRes.success && pkgRes.data.length > 0) {
                const fetchedPkg = pkgRes.data[0];
                const message = getServicePurchaseMessage(fetchedPkg.service?.name || 'Layanan', fetchedPkg.package_name);
                const link = getWhatsAppLink(message);
                window.location.href = link;
            } else {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [packageId]);

    const handleCreateOrder = async () => {
        if (!pkg || !selectedMethod) return;
        
        setSubmitting(true);
        const res = await createOrder({
            service_package_id: pkg.id,
            payment_method_id: selectedMethod.id
        });
        
        if (res.success) {
            setOrderUuid(res.data.uuid);
            setStep(3);
        } else {
            alert(res.message);
        }
        setSubmitting(false);
    };

    const handleUploadProof = async () => {
        if (!orderUuid || !proofFile) return;
        
        setSubmitting(true);
        const res = await uploadPaymentProof(orderUuid, proofFile);
        
        if (res.success) {
            setStep(4);
        } else {
            alert(res.message);
        }
        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary-950">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-secondary-950 p-6 text-center">
                <h2 className="text-2xl font-display font-bold text-white mb-4">Paket Tidak Ditemukan</h2>
                <button onClick={() => navigate('/')} className="btn btn-primary">Kembali ke Beranda</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-950 pt-32 pb-20">
            <div className="container-custom max-w-5xl">
                {/* Progress Mini */}
                <div className="flex justify-center mb-12">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500",
                                step >= i ? "bg-primary-500 text-white shadow-glow" : "bg-white/5 text-secondary-500 border border-white/10"
                            )}>
                                {step > i ? <CheckCircle2 size={20} /> : i}
                            </div>
                            {i < 4 && (
                                <div className={cn(
                                    "w-12 h-1 mx-2 rounded-full transition-all duration-500",
                                    step > i ? "bg-primary-500" : "bg-white/5"
                                )} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="glass-card p-8 rounded-[40px] border border-white/10"
                                >
                                    <h2 className="text-3xl font-display font-black text-white mb-8">Review Pesanan</h2>
                                    <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-primary-400 mb-1">{pkg.package_name}</h3>
                                                <p className="text-secondary-400 text-sm">{pkg.description}</p>
                                            </div>
                                            <span className="text-2xl font-black text-white">
                                                Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                            </span>
                                        </div>
                                        <div className="pt-4 border-t border-white/10 flex justify-between items-center font-bold text-lg">
                                            <span className="text-secondary-300">Total Investasi</span>
                                            <span className="text-white">Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-10 text-secondary-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Info size={16} className="text-primary-500" />
                                            <span>Estimasi pengerjaan: {pkg.delivery_days} Hari Kerja</span>
                                        </div>
                                        <p>Silakan lanjut untuk memilih metode pembayaran manual yang tersedia.</p>
                                    </div>

                                    <button 
                                        onClick={() => setStep(2)}
                                        className="btn btn-primary w-full h-16 rounded-2xl text-lg font-bold group"
                                    >
                                        Pilih Metode Pembayaran
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="glass-card p-8 rounded-[40px] border border-white/10"
                                >
                                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-primary-500 mb-6 hover:underline">
                                        <ChevronLeft size={16} /> Kembali
                                    </button>
                                    <h2 className="text-3xl font-display font-black text-white mb-8">Metode Pembayaran</h2>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        {paymentMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setSelectedMethod(method)}
                                                className={cn(
                                                    "p-6 rounded-3xl border text-left transition-all duration-300 relative group overflow-hidden",
                                                    selectedMethod?.id === method.id 
                                                        ? "bg-primary-500/10 border-primary-500" 
                                                        : "bg-white/5 border-white/10 hover:border-primary-500/50"
                                                )}
                                            >
                                                {method.type === 'qris' ? <QrCode size={24} className="mb-4 text-primary-400" /> : <Building2 size={24} className="mb-4 text-primary-400" />}
                                                <h4 className="font-bold text-white mb-1">{method.name}</h4>
                                                <p className="text-xs text-secondary-400 uppercase tracking-tighter">{method.bank_name || 'Scan QRIS'}</p>
                                                {selectedMethod?.id === method.id && (
                                                    <div className="absolute top-4 right-4 text-primary-500">
                                                        <CheckCircle2 size={24} />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={handleCreateOrder}
                                        disabled={!selectedMethod || submitting}
                                        className="btn btn-primary w-full h-16 rounded-2xl text-lg font-bold disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" /> : 'Buat Pesanan'}
                                    </button>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="glass-card p-8 rounded-[40px] border border-white/10"
                                >
                                    <h2 className="text-3xl font-display font-black text-white mb-8">Instruksi Pembayaran</h2>
                                    
                                    <div className="bg-primary-500/10 rounded-3xl p-8 mb-8 text-center border border-primary-500/20">
                                        <p className="text-secondary-300 text-sm mb-4">Silakan transfer tepat sebesar:</p>
                                        <div className="text-4xl font-black text-white mb-6">
                                            Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}
                                        </div>
                                        
                                        {selectedMethod?.type === 'bank' ? (
                                            <div className="space-y-3">
                                                <div className="bg-black/20 p-4 rounded-2xl">
                                                    <p className="text-xs text-secondary-500 uppercase font-bold tracking-widest mb-1">Bank {selectedMethod.bank_name}</p>
                                                    <p className="text-xl font-mono text-primary-400">{selectedMethod.number}</p>
                                                    <p className="text-sm text-white mt-1">a/n {selectedMethod.name}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white p-4 rounded-2xl inline-block">
                                                {selectedMethod?.qris_image_url ? (
                                                    <img src={getStorageUrl(selectedMethod.qris_image_url)} alt="QRIS" className="w-48 h-48 mx-auto" />
                                                ) : (
                                                    <div className="w-48 h-48 bg-secondary-100 flex items-center justify-center text-secondary-400">QR Code</div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-10">
                                        <h4 className="font-bold text-white mb-4">Unggah Bukti Transfer</h4>
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-[32px] hover:border-primary-500/50 transition-all cursor-pointer group bg-white/5">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                {proofFile ? (
                                                    <div className="flex items-center gap-2 text-primary-400 font-bold">
                                                        <CheckCircle2 /> {proofFile.name}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-10 h-10 text-secondary-500 group-hover:text-primary-500 transition-colors mb-4" />
                                                        <p className="text-sm text-secondary-400">Klik atau seret file bukti bayar ke sini</p>
                                                    </>
                                                )}
                                            </div>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*" 
                                                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                                            />
                                        </label>
                                    </div>

                                    <button 
                                        onClick={handleUploadProof}
                                        disabled={!proofFile || submitting}
                                        className="btn btn-primary w-full h-16 rounded-2xl text-lg font-bold disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" /> : 'Kirim Bukti Pembayaran'}
                                    </button>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="glass-card p-12 rounded-[40px] border border-white/10 text-center"
                                >
                                    <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow ring-8 ring-primary-500/20">
                                        <CheckCircle2 size={48} className="text-white" />
                                    </div>
                                    <h2 className="text-4xl font-display font-black text-white mb-6">Pembayaran Terkirim!</h2>
                                    <p className="text-secondary-400 text-lg mb-10 leading-relaxed max-w-md mx-auto">
                                        Bukti pembayaran Anda sedang kami verifikasi. Paket layanan akan otomatis aktif setelah verifikasi admin selesai.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button onClick={() => navigate('/dashboard')} className="btn btn-primary px-10 h-14 rounded-2xl">
                                            Ke Dashboard
                                        </button>
                                        <button onClick={() => navigate('/')} className="btn bg-white/5 text-white px-10 h-14 rounded-2xl border border-white/10">
                                            Kembali ke Beranda
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-8 rounded-[40px] border border-white/10 sticky top-32">
                            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard size={20} className="text-primary-500" />
                                Ringkasan Pembayaran
                            </h4>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-secondary-400 text-sm">
                                    <span>Item</span>
                                    <span className="text-white font-medium">{pkg.package_name}</span>
                                </div>
                                <div className="flex justify-between text-secondary-400 text-sm">
                                    <span>Harga</span>
                                    <span className="text-white font-medium">Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between text-white font-black text-xl">
                                    <span>Total</span>
                                    <span>Rp {new Intl.NumberFormat('id-ID').format(pkg.price)}</span>
                                </div>
                            </div>
                            <div className="bg-secondary-900/50 rounded-2xl p-4 flex gap-4">
                                <Info size={20} className="text-primary-500 shrink-0 mt-1" />
                                <p className="text-xs text-secondary-400 leading-relaxed">
                                    Pembayaran ini diverifikasi secara manual oleh tim kami dalam waktu maksimal 1x24 jam.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
