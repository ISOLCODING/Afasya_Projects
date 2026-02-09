import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, CheckCircle2, Sparkles, Send, User, Mail, Phone, Building2, CreditCard, Upload, ExternalLink, ArrowRight } from 'lucide-react';
import type { PackageData } from '@/lib/whatsapp';
import { getWhatsAppLink, getServicePurchaseMessage } from '@/lib/whatsapp';
import { createAssistantOrder, uploadPaymentProof, getPaymentMethods } from '@/lib/api';

interface ChatAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    selectedPackage: PackageData;
}

type Step = 'intro' | 'collect_info' | 'choose_path' | 'inquiry_processing' | 'payment_method' | 'payment_processing' | 'success';

const ChatAssistantModal: React.FC<ChatAssistantModalProps> = ({ isOpen, onClose, serviceName, selectedPackage }) => {
    const [step, setStep] = useState<Step>('intro');
    const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string; component?: React.ReactNode }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [formData, setFormData] = useState({
        client_name: '',
        client_email: '',
        client_whatsapp: '',
        company: '',
        note: ''
    });
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
    const [orderUuid, setOrderUuid] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (isOpen && !hasInitialized.current) {
            hasInitialized.current = true;
            resetChat();
        }
        
        if (!isOpen) {
            hasInitialized.current = false;
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const resetChat = () => {
        setStep('intro');
        setMessages([]);
        setFormData({
            client_name: '',
            client_email: '',
            client_whatsapp: '',
            company: '',
            note: ''
        });
        setOrderUuid(null);
        setSelectedPaymentMethod(null);
        
        addBotMessage(`Halo! Saya **Assistant Afasya**. Senang sekali Anda tertarik dengan layanan **${serviceName}**.`);
        setTimeout(() => {
            addBotMessage("Sebelum kita mulai, boleh saya minta data diri Anda untuk keperluan administrasi?");
            setStep('collect_info');
        }, 800);
    };

    const addBotMessage = (text: string, component?: React.ReactNode) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text, component }]);
            setIsTyping(false);
        }, 600);
    };

    const addUserMessage = (text: string) => {
        setMessages(prev => [...prev, { sender: 'user', text }]);
    };

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addUserMessage(`Nama saya ${formData.client_name} dari ${formData.company || 'Pribadi'}.`);
        setStep('choose_path');
        addBotMessage(`Terima kasih, **${formData.client_name}**! Data Anda sudah saya catat secara aman di sistem kami.`);
        setTimeout(() => {
            addBotMessage("Sekarang, apa yang ingin Anda lakukan selanjutnya?", (
                <div className="grid grid-cols-1 gap-3 mt-4 w-full">
                    <button 
                        onClick={() => handlePathSelection('consultation')}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-white/10 hover:border-primary-500 transition-all text-left group"
                    >
                        <div>
                            <div className="font-bold text-secondary-900 dark:text-white">Konsultasi Dulu</div>
                            <div className="text-xs text-secondary-500">Tanya-tanya via WhatsApp</div>
                        </div>
                        <ArrowRight size={18} className="text-primary-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => handlePathSelection('purchase')}
                        className="flex items-center justify-between p-4 rounded-2xl bg-primary-600 text-white hover:bg-primary-700 transition-all text-left shadow-lg shadow-primary-500/20 group"
                    >
                        <div>
                            <div className="font-bold">Langsung Order</div>
                            <div className="text-xs text-primary-100">Proses pembayaran & aktivasi</div>
                        </div>
                        <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            ));
        }, 800);
    };

    const handlePathSelection = async (path: 'consultation' | 'purchase') => {
        setIsSubmitting(true);
        addUserMessage(path === 'consultation' ? "Saya ingin konsultasi dulu." : "Saya ingin langsung pesan paket ini.");
        
        const result = await createAssistantOrder({
            ...formData,
            path,
            service_package_id: selectedPackage.id
        });

        setIsSubmitting(false);

        if (!result.success) {
            addBotMessage("Waduh, sepertinya ada sedikit kendala koneksi. Bisa coba klik lagi?");
            return;
        }

        setOrderUuid(result.data.uuid);

        if (path === 'consultation') {
            setStep('inquiry_processing');
            addBotMessage("Siap! Saya sudah membuatkan nomor antrian konsultasi untuk Anda.");
            setTimeout(() => {
                const waMessage = getServicePurchaseMessage(serviceName, selectedPackage);
                const waLink = getWhatsAppLink(`[INQUIRY #${result.data.uuid}]\n` + waMessage);
                addBotMessage("Klik tombol di bawah untuk terhubung langsung dengan konsultan ahli kami di WhatsApp.", (
                    <a 
                        href={waLink} 
                        target="_blank" 
                        className="mt-4 flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20"
                    >
                        <Phone size={18} /> Terhubung ke WhatsApp
                    </a>
                ));
            }, 800);
        } else {
            setStep('payment_method');
            const pMethods = await getPaymentMethods();
            setPaymentMethods(pMethods.data || []);
            addBotMessage("Pilihan cerdas! Mari kita selesaikan pembayarannya agar proyek bisa langsung kami kerjakan.");
            setTimeout(() => {
                addBotMessage("Silakan pilih metode pembayaran yang Anda inginkan:");
            }, 800);
        }
    };

    const handlePaymentMethodSelect = (method: any) => {
        setSelectedPaymentMethod(method);
        addUserMessage(`Saya pilih transfer melalui ${method.bank_name}.`);
        setStep('payment_processing');
        
        addBotMessage(`Baik. Silakan lakukan transfer sebesar **Rp ${new Intl.NumberFormat('id-ID').format(Number(selectedPackage.price))}** ke rekening berikut:`);
        setTimeout(() => {
            addBotMessage("", (
                <div className="mt-4 p-5 rounded-3xl bg-white dark:bg-secondary-800 border-2 border-primary-500/20 shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary-500">Rekening Tujuan</span>
                        <div className="px-3 py-1 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-lg text-[10px] font-bold">
                            {method.bank_name}
                        </div>
                    </div>
                    <div className="text-2xl font-black text-secondary-900 dark:text-white mb-1 tracking-wider">
                        {method.number}
                    </div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-400 font-medium mb-4">
                        a.n {method.name}
                    </div>
                    <div className="pt-4 border-t border-secondary-100 dark:border-white/5">
                        <label className="block text-xs font-bold text-secondary-500 mb-2 uppercase">Unggah Bukti Transfer</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden" 
                            id="proof-upload"
                        />
                        <label 
                            htmlFor="proof-upload"
                            className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-secondary-200 dark:border-white/10 p-4 rounded-2xl cursor-pointer hover:bg-secondary-50 dark:hover:bg-white/5 transition-colors group"
                        >
                            <Upload size={20} className="text-primary-500 group-hover:-translate-y-1 transition-transform" />
                            <span className="text-sm font-bold text-secondary-700 dark:text-secondary-300">Pilih File Bukti</span>
                        </label>
                    </div>
                </div>
            ));
        }, 800);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !orderUuid) return;

        setIsSubmitting(true);
        addUserMessage("Ini bukti pembayaran saya.");
        addBotMessage("Sedang memverifikasi bukti pembayaran Anda...");

        const result = await uploadPaymentProof(orderUuid, file);
        setIsSubmitting(false);

        if (result.success) {
            setStep('success');
            addBotMessage("🎉 **PEMBAYARAN TERKONFIRMASI!**");
            setTimeout(() => {
                addBotMessage(`Sistem kami telah secara otomatis membuat proyek **${serviceName}** Anda dan mengaktifkan tim developer.`);
                addBotMessage("Terima kasih telah mempercayakan Afasya Digital Solusi. Anda akan menerima email konfirmasi segera!");
            }, 1000);
        } else {
            addBotMessage("Mohon maaf, terjadi kesalahan saat mengunggah. Bisa dicoba lagi?");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-secondary-900 w-full max-w-lg rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative border border-secondary-100 dark:border-white/10 flex flex-col h-[85vh] max-h-[700px]"
                >
                    {/* Header */}
                    <div className="bg-linear-to-r from-primary-600 to-primary-500 p-6 text-white flex items-center justify-between shadow-lg relative z-20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-inner">
                                <Bot size={28} />
                            </div>
                            <div>
                                <h3 className="font-display font-black text-xl leading-tight tracking-tight">Assistant Afasya</h3>
                                <div className="flex items-center gap-1.5 text-primary-100 text-[10px] font-bold uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    AI-Business Agent Online
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-2xl transition-all">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-secondary-50/50 dark:bg-secondary-950/20 custom-scrollbar"
                    >
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-accent-500 text-secondary-950' 
                                        : 'bg-white dark:bg-secondary-800 text-primary-600 dark:text-primary-400 border border-secondary-100 dark:border-white/10'
                                }`}>
                                    {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                                </div>
                                <div className="flex flex-col gap-2 max-w-[85%]">
                                    {msg.text && (
                                        <div className={`p-4 rounded-3xl shadow-sm ${
                                            msg.sender === 'user'
                                                ? 'bg-accent-500 text-secondary-950 font-bold rounded-tr-none'
                                                : 'bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200 rounded-tl-none border border-secondary-100 dark:border-white/5'
                                        }`}>
                                            <div className="text-sm leading-relaxed space-y-2">
                                                {msg.text.replace(/\\n/g, '\n').split('\n\n').map((paragraph, pIdx) => (
                                                    <div key={pIdx}>
                                                        {paragraph.split('\n').map((line, lIdx) => (
                                                            <div key={lIdx} className="min-h-[1.2em]">
                                                                {line.split(/(\*\*.*?\*\*|_.*?_)/g).map((part, i) => {
                                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                                        return <strong key={i} className="font-bold text-primary-600 dark:text-primary-400">{part.slice(2, -2)}</strong>;
                                                                    }
                                                                    if (part.startsWith('_') && part.endsWith('_')) {
                                                                        return <em key={i} className="italic opacity-80">{part.slice(1, -1)}</em>;
                                                                    }
                                                                    return part;
                                                                })}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {msg.component}
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <div className="flex items-start gap-4 animate-pulse">
                                <div className="w-9 h-9 rounded-xl bg-white dark:bg-secondary-800 flex items-center justify-center text-primary-400 shrink-0">
                                    <Bot size={18} />
                                </div>
                                <div className="bg-white dark:bg-secondary-800 p-4 rounded-3xl rounded-tl-none flex gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}

                        {step === 'collect_info' && !isTyping && (
                            <motion.form 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onSubmit={handleInfoSubmit} 
                                className="bg-white dark:bg-secondary-800 p-6 rounded-[32px] border border-primary-500/10 shadow-xl flex flex-col gap-4"
                            >
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Nama Lengkap" 
                                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary-50 dark:bg-secondary-900 border border-secondary-100 dark:border-white/5 focus:border-primary-500 outline-hidden text-sm transition-all"
                                        value={formData.client_name}
                                        onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary-50 dark:bg-secondary-900 border border-secondary-100 dark:border-white/5 focus:border-primary-500 outline-hidden text-sm transition-all"
                                        value={formData.client_email}
                                        onChange={(e) => setFormData({...formData, client_email: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="WhatsApp" 
                                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary-50 dark:bg-secondary-900 border border-secondary-100 dark:border-white/5 focus:border-primary-500 outline-hidden text-sm transition-all"
                                            value={formData.client_whatsapp}
                                            onChange={(e) => setFormData({...formData, client_whatsapp: e.target.value})}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" size={18} />
                                        <input 
                                            type="text" 
                                            placeholder="Company" 
                                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary-50 dark:bg-secondary-900 border border-secondary-100 dark:border-white/5 focus:border-primary-500 outline-hidden text-sm transition-all"
                                            value={formData.company}
                                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]">
                                    Simpan & Lanjut
                                </button>
                            </motion.form>
                        )}

                        {step === 'payment_method' && !isTyping && paymentMethods.length > 0 && (
                            <div className="grid grid-cols-1 gap-3 w-full">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => handlePaymentMethodSelect(method)}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-white/10 hover:border-primary-500 transition-all text-left group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
                                            <CreditCard size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-secondary-900 dark:text-white uppercase text-xs tracking-widest">{method.bank_name}</div>
                                            <div className="text-xs text-secondary-500">{method.name}</div>
                                        </div>
                                        <ArrowRight size={18} className="text-secondary-300 group-hover:text-primary-500 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 'success' && !isTyping && (
                            <div className="flex flex-col items-center gap-6 mt-4">
                                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                                    <CheckCircle2 size={48} />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Proyek Berhasil Diaktivasi!</h4>
                                    <p className="text-sm text-secondary-500">Anda bisa menutup chat ini atau lanjut konsultasi.</p>
                                </div>
                                <div className="flex gap-3 w-full">
                                    <button 
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-secondary-100 dark:bg-white/5 text-secondary-700 dark:text-white rounded-2xl font-bold transition-all"
                                    >
                                        Tutup Chat
                                    </button>
                                    <a 
                                        href="/dashboard" 
                                        className="flex-1 py-4 bg-primary-600 text-white rounded-2xl font-bold text-center flex items-center justify-center gap-2"
                                    >
                                        Ke Dashboard <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Status */}
                    <div className="p-4 bg-white dark:bg-secondary-900 border-t border-secondary-100 dark:border-white/10 flex items-center justify-center">
                        {isSubmitting ? (
                            <div className="flex items-center gap-3 text-primary-600 font-bold text-sm">
                                <span className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                Memproses Permintaan...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-secondary-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Afasya Business Flow • Protected & Secure
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ChatAssistantModal;
