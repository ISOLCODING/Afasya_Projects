import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageCircle, X, Send, ChevronDown, ChevronRight, 
    Sparkles, Phone, Mail, ThumbsUp, ThumbsDown 
} from 'lucide-react';
import { getSupportFaqs, sendSupportMessage, incrementFaqView, markFaqHelpful, type Faq } from '@/lib/api';
import { getWhatsAppLink } from '@/lib/whatsapp';

const SupportChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'faq' | 'chat'>('faq');
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    
    // Chat States
    const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', text: string, timestamp: Date, action_link?: string}>>([
        { type: 'bot', text: 'Halo! 👋 Saya asisten virtual Afasya. Ada yang bisa saya bantu? Anda bisa tanya tentang layanan, harga, atau timeline pengerjaan.', timestamp: new Date() }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 'all', label: 'Semua', icon: '📋' },
        { id: 'general', label: 'Umum', icon: '💡' },
        { id: 'service', label: 'Layanan', icon: '🛠️' },
        { id: 'payment', label: 'Pembayaran', icon: '💳' },
        { id: 'project', label: 'Proyek', icon: '🚀' },
    ];

    useEffect(() => {
        if (isOpen && faqs.length === 0) {
            loadFaqs();
        }
    }, [isOpen]);

    // Auto scroll chat
    useEffect(() => {
        if (activeTab === 'chat') {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory, activeTab]);

    const loadFaqs = async () => {
        setIsLoading(true);
        try {
            const response = await getSupportFaqs();
            if (response.status === 'success' && Array.isArray(response.data)) {
                setFaqs(response.data);
            }
        } catch (error) {
            console.error('Failed to load FAQs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const message = userMessage;
        setUserMessage('');
        setActiveTab('chat'); // Switch to chat mode
        
        // Add User Message
        setChatHistory(prev => [...prev, { type: 'user', text: message, timestamp: new Date() }]);
        setIsTyping(true);

        try {
            // Call API
            const response = await sendSupportMessage(message);
            
            setIsTyping(false);
            if (response.status === 'success') {
                setChatHistory(prev => [...prev, { 
                    type: 'bot', 
                    text: response.data.text, 
                    timestamp: new Date(),
                    action_link: response.data.action_link
                }]);
            } else {
                setChatHistory(prev => [...prev, { type: 'bot', text: 'Maaf, terjadi kesalahan sistem.', timestamp: new Date() }]);
            }
        } catch (error) {
            setIsTyping(false);
            setChatHistory(prev => [...prev, { type: 'bot', text: 'Maaf, saya sedang mengalami gangguan koneksi.', timestamp: new Date() }]);
        }
    };

    const handleWhatsAppRedirect = (customMessage?: string) => {
        const message = customMessage || userMessage || 'Halo, saya ingin bertanya tentang layanan Afasya.';
        const waLink = getWhatsAppLink(message);
        window.open(waLink, '_blank');
    };

    const filteredFaqs = selectedCategory === 'all' 
        ? faqs 
        : faqs.filter(faq => faq.category === selectedCategory);

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-linear-to-br from-primary-600 to-primary-500 text-white rounded-full shadow-2xl shadow-primary-500/40 flex items-center justify-center group hover:shadow-primary-500/60 transition-all"
                    >
                        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white dark:bg-secondary-900 rounded-[24px] shadow-2xl border border-secondary-100 dark:border-white/10 flex flex-col overflow-hidden font-sans"
                    >
                        {/* Header */}
                        <div className="bg-linear-to-r from-primary-600 to-primary-500 p-4 text-white flex items-center justify-between shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base leading-tight">Asisten Afasya</h3>
                                    <div className="flex items-center gap-1.5 text-primary-100 text-[10px] font-bold uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => setActiveTab('faq')}
                                    className={`p-2 rounded-lg transition-all ${activeTab === 'faq' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}
                                    title="FAQ List"
                                >
                                    <span className="text-xs font-bold">FAQ</span>
                                </button>
                                <button 
                                    onClick={() => setActiveTab('chat')}
                                    className={`p-2 rounded-lg transition-all ${activeTab === 'chat' ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'}`}
                                    title="Chat"
                                >
                                    <MessageCircle size={18} />
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all ml-1"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-secondary-50 dark:bg-secondary-950/50 relative overflow-hidden">
                            
                            {/* FAQ VIEW */}
                            {activeTab === 'faq' && (
                                <div className="absolute inset-0 flex flex-col">
                                    {/* Category Tabs */}
                                    <div className="px-4 py-3 bg-white dark:bg-secondary-900 border-b border-secondary-100 dark:border-white/5 z-10">
                                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                                                        selectedCategory === cat.id
                                                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                                                            : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                                                    }`}
                                                >
                                                    <span className="mr-1.5">{cat.icon}</span>
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* List */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                        {isLoading ? (
                                            <div className="flex justify-center py-10">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                                            </div>
                                        ) : filteredFaqs.length === 0 ? (
                                            <p className="text-center text-secondary-500 text-sm py-10">Tidak ada FAQ ditemukan.</p>
                                        ) : (
                                            filteredFaqs.map((faq) => (
                                                <motion.div
                                                    key={faq.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white dark:bg-secondary-800 rounded-xl border border-secondary-100 dark:border-white/5 overflow-hidden shadow-sm"
                                                >
                                                    <button
                                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                                        className="w-full p-3.5 flex items-start gap-3 text-left hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
                                                    >
                                                        <div className={`mt-0.5 transition-transform duration-200 ${expandedFaq === faq.id ? 'rotate-90 text-primary-500' : 'text-secondary-400'}`}>
                                                            <ChevronRight size={16} />
                                                        </div>
                                                        <span className="font-bold text-sm text-secondary-800 dark:text-secondary-100 leading-snug">
                                                            {faq.question}
                                                        </span>
                                                    </button>
                                                    <AnimatePresence>
                                                        {expandedFaq === faq.id && (
                                                            <motion.div
                                                                initial={{ height: 0 }}
                                                                animate={{ height: 'auto' }}
                                                                exit={{ height: 0 }}
                                                                className="overflow-hidden"
                                                                onAnimationComplete={() => incrementFaqView(faq.uuid).catch(() => {})}
                                                            >
                                                                <div className="px-4 pb-4 pl-10">
                                                                    <div className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed space-y-2">
                                                                        {faq.answer.replace(/\\n/g, '\n').split('\n\n').map((paragraph: string, pIdx: number) => (
                                                                            <div key={pIdx}>
                                                                                {paragraph.split('\n').map((line: string, lIdx: number) => (
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
                                                                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-dashed border-secondary-100 dark:border-white/5">
                                                                        <span className="text-[10px] text-secondary-400 font-medium uppercase tracking-wide">Membantu?</span>
                                                                        <div className="flex gap-2">
                                                                            <button onClick={() => markFaqHelpful(faq.uuid, true)} className="p-1 hover:bg-emerald-50 text-secondary-400 hover:text-emerald-500 rounded transition-colors"><ThumbsUp size={14}/></button>
                                                                            <button onClick={() => markFaqHelpful(faq.uuid, false)} className="p-1 hover:bg-red-50 text-secondary-400 hover:text-red-500 rounded transition-colors"><ThumbsDown size={14}/></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* CHAT VIEW */}
                            {activeTab === 'chat' && (
                                <div className="absolute inset-0 flex flex-col">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                        {chatHistory.map((msg, idx) => (
                                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`
                                                    max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
                                                    ${msg.type === 'user' 
                                                        ? 'bg-primary-600 text-white rounded-br-none' 
                                                        : 'bg-white dark:bg-secondary-800 text-secondary-800 dark:text-secondary-100 rounded-bl-none border border-secondary-100 dark:border-white/5'}
                                                `}>
                                                    <div className="space-y-2">
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
                                                    {msg.action_link && (
                                                        <a href={msg.action_link} className="inline-block mt-2 text-xs font-bold underline opacity-90 hover:opacity-100">
                                                            Lihat Detail →
                                                        </a>
                                                    )}
                                                    <div className={`text-[10px] mt-1 text-right ${msg.type === 'user' ? 'text-white/60' : 'text-secondary-400'}`}>
                                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-white dark:bg-secondary-800 px-4 py-3 rounded-2xl rounded-bl-none border border-secondary-100 dark:border-white/5 shadow-sm">
                                                    <div className="flex gap-1">
                                                        <span className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}/>
                                                        <span className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}/>
                                                        <span className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white dark:bg-secondary-900 border-t border-secondary-100 dark:border-white/5">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={activeTab === 'faq' ? "Cari layanan atau tanya sesuatu..." : "Tulis pesan..."}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-secondary-50 dark:bg-secondary-950/50 border border-secondary-200 dark:border-white/10 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-secondary-400"
                                />
                                {userMessage.trim() ? (
                                    <button
                                        onClick={handleSendMessage}
                                        className="p-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-lg shadow-primary-500/20"
                                    >
                                        <Send size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleWhatsAppRedirect()}
                                        className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                                        title="WhatsApp"
                                    >
                                        <Phone size={18} />
                                    </button>
                                )}
                            </div>
                            <div className="mt-2 text-center">
                                <span className="text-[10px] text-secondary-400">Powered by Afasya AI Assistant</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SupportChatWidget;
