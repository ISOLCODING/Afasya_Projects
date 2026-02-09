// src/lib/whatsapp.ts

export const WHATSAPP_NUMBER = '6281412307340';

/**
 * Generates a WhatsApp link with a pre-filled message.
 * @param message The message to pre-fill.
 * @returns {string} The formatted WhatsApp URL.
 */
export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export interface PackageData {
  id: number | string;
  package_name: string;
  price: number | string;
  description: string;
  delivery_days: number | string;
  included_features: string[] | string;
}

/**
 * Generates a structured WhatsApp message for purchasing a specific package.
 * @param serviceName Name of the service.
 * @param pkg The package data object.
 * @returns {string} The formatted structured message.
 */
export const getServicePurchaseMessage = (serviceName: string, pkg: PackageData): string => {
  const formatPrice = (p: number | string) => new Intl.NumberFormat('id-ID').format(Number(p));
  
  const features = Array.isArray(pkg.included_features) 
    ? pkg.included_features.map(f => `✅ ${f}`).join('\n')
    : pkg.included_features;

  return `*🤖 ASSISTANT AFASYA - REKOMENDASI PESANAN*
--------------------------------------------------
*RINGKASAN LAYANAN:*
📦 *Layanan:* ${serviceName}
💎 *Paket:* ${pkg.package_name}
🆔 *Ref ID:* #PKG-${pkg.id}

*ESTIMASI INVESTASI:*
💰 *Total Biaya:* Rp ${formatPrice(pkg.price)}
⏳ *Durasi:* ${pkg.delivery_days} Hari Kerja

*DESKRIPSI PAKET:*
${pkg.description}

*FITUR UTAMA:*
${features}

--------------------------------------------------
Halo Admin Afasya, saya ingin melanjutkan pemesanan dengan rincian di atas. Mohon bantuannya untuk proses selanjutnya.`;
};

/**
 * Generates a message for general consultation.
 * @returns {string} The formatted message.
 */
export const getConsultationMessage = (serviceName?: string): string => {
  if (serviceName) {
     return `Selamat datang, apa yang bisa saya bantu?\n\nSaya ingin konsultasi gratis mengenai layanan *${serviceName}*. Kapan waktu yang tepat untuk kita berdiskusi?`;
  }
  return `Selamat datang, apa yang bisa saya bantu?\n\nSaya ingin konsultasi gratis mengenai kebutuhan bisnis saya. Bisa bantu saya memberikan solusi yang tepat?`;
};
