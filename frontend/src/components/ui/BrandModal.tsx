import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe } from 'lucide-react';
import type { Brand } from '../../lib/api/services/brand';
import { getStorageUrl } from '../../lib/utils';

interface BrandModalProps {
   brand: Brand | null;
   isOpen: boolean;
   onClose: () => void;
}

const BrandModal: React.FC<BrandModalProps> = ({ brand, isOpen, onClose }) => {
   if (!brand) return null;

   return (
      <AnimatePresence>
         {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
               {/* Backdrop */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
               />

               {/* Modal Content */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[32px] shadow-premium overflow-hidden border border-neutral-200 dark:border-white/10"
               >
                  {/* Close Button */}
                  <button
                     onClick={onClose}
                     className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors z-10"
                  >
                     <X size={20} />
                  </button>

                  <div className="p-10">
                     {/* Logo & Name */}
                     <div className="flex flex-col items-center mb-10">
                        <div className="w-28 h-28 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center mb-6 border border-neutral-100 dark:border-white/5 shadow-inner">
                           <img
                              src={getStorageUrl(brand.logo_url)}
                              alt={brand.name}
                              className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-110"
                           />
                        </div>
                        <h3 className="text-3xl font-display font-black text-neutral-900 dark:text-white tracking-tight">
                           {brand.name}
                        </h3>
                        {brand.website_url && (
                           <a
                              href={brand.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-black text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors mt-2 uppercase tracking-widest"
                           >
                              <Globe size={14} />
                              <span>View Website</span>
                           </a>
                        )}
                     </div>

                     {/* Description */}
                     <div className="mb-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
                           About the Partner
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg font-medium">
                           {brand.description || "No description available for this partner. We collaborate to deliver excellence across digital disciplines."}
                        </p>
                     </div>

                     {/* Actions */}
                     <div className="flex justify-end gap-4">
                        <button
                           onClick={onClose}
                           className="px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                           Close
                        </button>
                        {brand.website_url && (
                           <a
                              href={brand.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary-600 text-white hover:bg-primary-500 flex items-center gap-2 transition-all shadow-glow"
                           >
                              <span>Visit Website</span>
                              <ExternalLink size={16} />
                           </a>
                        )}
                     </div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600" />
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};

export default BrandModal;
