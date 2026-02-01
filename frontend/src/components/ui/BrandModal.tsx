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
                  className="absolute inset-0 bg-secondary-950/80 backdrop-blur-sm"
               />

               {/* Modal Content */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-lg bg-white dark:bg-secondary-900 rounded-2xl shadow-2xl overflow-hidden border border-secondary-200 dark:border-secondary-800"
               >
                  {/* Close Button */}
                  <button
                     onClick={onClose}
                     className="absolute top-4 right-4 p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-500 hover:text-secondary-900 dark:hover:text-white transition-colors z-10"
                  >
                     <X size={20} />
                  </button>

                  <div className="p-8">
                     {/* Logo & Name */}
                     <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 p-4 rounded-xl bg-secondary-50 dark:bg-secondary-800/50 flex items-center justify-center mb-4 border border-secondary-100 dark:border-secondary-700">
                           <img
                              src={getStorageUrl(brand.logo_url)}
                              alt={brand.name}
                              className="max-w-full max-h-full object-contain"
                           />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-secondary-900 dark:text-white">
                           {brand.name}
                        </h3>
                        {brand.website_url && (
                           <a
                              href={brand.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mt-1"
                           >
                              <Globe size={14} />
                              <span>View Website</span>
                           </a>
                        )}
                     </div>

                     {/* Description */}
                     <div className="mb-8">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary-400 mb-3">
                           About the Brand
                        </h4>
                        <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed text-lg">
                           {brand.description || "No description available for this partner."}
                        </p>
                     </div>

                     {/* Actions */}
                     <div className="flex justify-end gap-3 mt-auto">
                        <button
                           onClick={onClose}
                           className="px-6 py-2.5 rounded-xl font-medium text-secondary-600 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                        >
                           Close
                        </button>
                        {brand.website_url && (
                           <a
                              href={brand.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-2.5 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2 transition-all shadow-lg shadow-primary-500/20"
                           >
                              <span>Visit Website</span>
                              <ExternalLink size={16} />
                           </a>
                        )}
                     </div>
                  </div>

                  {/* Bottom Accent Bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600" />
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};

export default BrandModal;
