<?php

namespace Database\Seeders;

use App\Models\FAQ;
use App\Models\Service;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        // Get services for relational FAQs
        $webDev = Service::where('slug', 'web-development')->first();
        $mobileDev = Service::where('slug', 'mobile-app-development')->first();
        $uiux = Service::where('slug', 'ui-ux-design')->first();

        $faqs = [
            // ========== GENERAL CATEGORY ==========
            [
                'question' => 'Apa itu Afasya Digital Solusi?',
                'answer' => 'Afasya Digital Solusi adalah agency digital terpercaya yang menyediakan layanan lengkap untuk transformasi digital bisnis Anda. Kami spesialis dalam Web Development, Mobile App Development, UI/UX Design, Branding, dan Digital Marketing. Dengan tim profesional berpengalaman 5+ tahun, kami telah membantu 100+ klien dari berbagai industri mencapai kesuksesan digital mereka.',
                'category' => 'general',
                'service_id' => null,
                'display_order' => 1,
                'is_active' => true,
                'view_count' => 245,
                'helpful_yes' => 189,
                'helpful_no' => 12,
            ],
            [
                'question' => 'Berapa lama waktu pengerjaan proyek?',
                'answer' => "Waktu pengerjaan bervariasi tergantung kompleksitas dan paket layanan yang Anda pilih.\n\nUntuk estimasi yang lebih akurat, silakan cek detail layanan kami dengan mengetik nama layanan, misalnya \"Web Development\" atau \"Mobile App Development\".",
                'category' => 'general',
                'service_id' => null,
                'display_order' => 2,
                'is_active' => true,
                'view_count' => 312,
                'helpful_yes' => 278,
                'helpful_no' => 8,
            ],
            [
                'question' => 'Apakah ada garansi untuk proyek yang dikerjakan?',
                'answer' => "Ya! Kami memberikan garansi komprehensif termasuk perbaikan bug setelah launching dan revisi minor.\n\nKami juga menyediakan opsi maintenance jangka panjang untuk update konten dan keamanan. Hubungi kami untuk detail paket maintenance.",
                'category' => 'general',
                'service_id' => null,
                'display_order' => 3,
                'is_active' => true,
                'view_count' => 198,
                'helpful_yes' => 167,
                'helpful_no' => 5,
            ],
            [
                'question' => 'Bagaimana cara kerja sama dengan Afasya?',
                'answer' => "Proses kerja sama sangat mudah:\n\n1️⃣ Konsultasi Gratis - Diskusi kebutuhan dan budget\n2️⃣ Proposal & Quotation - Kami kirim detail scope dan harga\n3️⃣ Kontrak & DP 50% - Mulai pengerjaan setelah DP\n4️⃣ Development - Update progress berkala\n5️⃣ Review & Revision - Anda bisa request perubahan\n6️⃣ Pelunasan 50% - Setelah project selesai\n7️⃣ Handover - Source code, dokumentasi, training\n\nSemua komunikasi transparan via WhatsApp, email, dan project dashboard.",
                'category' => 'general',
                'service_id' => null,
                'display_order' => 4,
                'is_active' => true,
                'view_count' => 156,
                'helpful_yes' => 142,
                'helpful_no' => 3,
            ],

            // ========== SERVICE CATEGORY ==========
            [
                'question' => 'Layanan apa saja yang tersedia di Afasya?',
                'answer' => "Kami menyediakan solusi digital lengkap termasuk Web Development, Mobile App Development, UI/UX Design, dan Digital Marketing.\n\nUntuk melihat daftar lengkap beserta harga dan estimasi waktu, silakan ketik \"Layanan\".",
                'category' => 'service',
                'service_id' => null,
                'display_order' => 1,
                'is_active' => true,
                'view_count' => 423,
                'helpful_yes' => 389,
                'helpful_no' => 7,
            ],
            [
                'question' => 'Apakah bisa request fitur custom?',
                'answer' => "Tentu saja! Kami sangat terbuka dengan kebutuhan custom. Bahkan 80% project kami adalah custom development sesuai unique business process klien.\n\nContoh custom features yang pernah kami kerjakan:\n• Multi-vendor marketplace dengan komisi system\n• Booking system dengan calendar integration\n• Real-time chat & notification\n• Payment gateway integration (Midtrans, Xendit)\n• API integration dengan third-party services\n• Custom reporting & analytics dashboard\n\nTim kami akan mendiskusikan requirement Anda secara detail dan memberikan solusi terbaik sesuai budget dan timeline.",
                'category' => 'service',
                'service_id' => null,
                'display_order' => 2,
                'is_active' => true,
                'view_count' => 267,
                'helpful_yes' => 234,
                'helpful_no' => 11,
            ],
            [
                'question' => 'Teknologi apa yang digunakan untuk Web Development?',
                'answer' => "Kami menggunakan teknologi modern dan proven:\n\n⚡ Frontend:\n• Next.js / React.js - Modern, fast, SEO-friendly\n• Vue.js / Nuxt.js - Progressive framework\n• Tailwind CSS - Utility-first styling\n• TypeScript - Type-safe development\n\n🔧 Backend:\n• Laravel (PHP) - Robust & scalable\n• Node.js / Express - High performance\n• Python / Django - AI/ML integration\n\n💾 Database:\n• MySQL / PostgreSQL - Relational\n• MongoDB - NoSQL\n• Redis - Caching\n\n☁️ Infrastructure:\n• AWS / Google Cloud - Cloud hosting\n• Docker - Containerization\n• CI/CD Pipeline - Auto deployment\n\nTeknologi dipilih berdasarkan kebutuhan spesifik project Anda.",
                'category' => 'service',
                'service_id' => $webDev?->id,
                'display_order' => 3,
                'is_active' => true,
                'view_count' => 189,
                'helpful_yes' => 156,
                'helpful_no' => 4,
            ],
            [
                'question' => 'Berapa biaya untuk membuat mobile app?',
                'answer' => "Biaya pembuatan aplikasi mobile sangat bergantung pada fitur dan platform yang ditargetkan.\n\nUntuk mendapatkan estimasi harga terbaru, silakan ketik \"Harga Mobile App Development\" atau \"Harga Aplikasi\".",
                'category' => 'service',
                'service_id' => $mobileDev?->id,
                'display_order' => 4,
                'is_active' => true,
                'view_count' => 512,
                'helpful_yes' => 467,
                'helpful_no' => 23,
            ],

            // ========== PAYMENT CATEGORY ==========
            [
                'question' => 'Bagaimana sistem pembayaran?',
                'answer' => 'Sistem pembayaran kami fleksibel dan aman. Biasanya kami menerapkan sistem DP (Down Payment) dan pelunasan di akhir, atau sistem termin untuk proyek besar.\n\nHubungi kami untuk mendiskusikan opsi pembayaran yang paling sesuai dengan kebutuhan Anda.',
                'category' => 'payment',
                'service_id' => null,
                'display_order' => 1,
                'is_active' => true,
                'view_count' => 378,
                'helpful_yes' => 334,
                'helpful_no' => 9,
            ],
            [
                'question' => 'Metode pembayaran apa saja yang diterima?',
                'answer' => "Kami menerima berbagai metode pembayaran:\n\n🏦 Transfer Bank:\n• BCA\n• Mandiri\n• BNI\n• BRI\n\n💳 E-Wallet:\n• GoPay\n• OVO\n• Dana\n• ShopeePay\n\n💻 Payment Gateway:\n• Midtrans (Credit Card, Virtual Account)\n• Xendit\n\n📄 Invoice Perusahaan:\n• Untuk corporate client\n• NET 30 days (dengan approval)\n\nSemua transaksi akan mendapat bukti pembayaran resmi dan invoice.",
                'category' => 'payment',
                'service_id' => null,
                'display_order' => 2,
                'is_active' => true,
                'view_count' => 289,
                'helpful_yes' => 256,
                'helpful_no' => 6,
            ],
            [
                'question' => 'Apakah ada biaya tersembunyi?',
                'answer' => "TIDAK ADA biaya tersembunyi! Kami sangat transparan:\n\n✅ Yang SUDAH TERMASUK dalam quotation:\n• Design & Development\n• Testing & Quality Assurance\n• Deployment ke server\n• Training & Dokumentasi\n• 30 hari bug-free guarantee\n• Source code ownership\n\n⚠️ Biaya TAMBAHAN hanya untuk:\n• Perubahan scope di luar kesepakatan awal\n• Request fitur baru setelah project selesai\n• Domain & hosting (jika tidak pakai milik kami)\n• Third-party services (payment gateway fee, SMS gateway, dll)\n\nSemua biaya tambahan akan dikomunikasikan dan disetujui terlebih dahulu.",
                'category' => 'payment',
                'service_id' => null,
                'display_order' => 3,
                'is_active' => true,
                'view_count' => 234,
                'helpful_yes' => 212,
                'helpful_no' => 4,
            ],
            [
                'question' => 'Apakah bisa cicilan untuk project besar?',
                'answer' => 'Ya, kami menyediakan opsi pembayaran bertahap atau cicilan untuk proyek dengan nilai tertentu.\n\nSyarat dan ketentuan berlaku (seperti kelengkapan dokumen perusahaan). Silakan konsultasikan kebutuhan budget Anda dengan tim sales kami untuk mendapatkan solusi terbaik.',
                'category' => 'payment',
                'service_id' => null,
                'display_order' => 4,
                'is_active' => true,
                'view_count' => 167,
                'helpful_yes' => 145,
                'helpful_no' => 8,
            ],

            // ========== PROJECT CATEGORY ==========
            [
                'question' => 'Bagaimana cara memulai proyek?',
                'answer' => "Memulai proyek sangat mudah:\n\n1️⃣ Klik tombol \"Mulai Proyek\" di website\n2️⃣ Isi form data diri dan kebutuhan project\n3️⃣ Pilih paket yang sesuai atau request custom\n4️⃣ Tim kami akan menghubungi dalam 1x24 jam\n5️⃣ Konsultasi gratis via WhatsApp/Zoom\n6️⃣ Terima proposal & quotation detail\n7️⃣ Approve & bayar DP 50%\n8️⃣ Kickoff meeting & mulai development!\n\nAtau langsung chat WhatsApp kami untuk konsultasi cepat: +62 812-3456-7890",
                'category' => 'project',
                'service_id' => null,
                'display_order' => 1,
                'is_active' => true,
                'view_count' => 445,
                'helpful_yes' => 412,
                'helpful_no' => 7,
            ],
            [
                'question' => 'Apakah saya bisa tracking progress proyek?',
                'answer' => "Ya! Transparansi adalah prioritas kami:\n\n📊 Client Dashboard:\n• Real-time progress tracking\n• Milestone & timeline view\n• File & document sharing\n• Direct messaging dengan tim\n• Task completion status\n\n📱 Update Berkala:\n• Weekly progress report via email\n• WhatsApp update untuk milestone penting\n• Screenshot/video demo fitur yang sudah jadi\n\n🎥 Demo Session:\n• Bi-weekly demo meeting (untuk project besar)\n• Feedback & revision discussion\n\nAnda akan selalu tahu apa yang sedang dikerjakan!",
                'category' => 'project',
                'service_id' => null,
                'display_order' => 2,
                'is_active' => true,
                'view_count' => 356,
                'helpful_yes' => 328,
                'helpful_no' => 5,
            ],
            [
                'question' => 'Bagaimana jika saya ingin revisi?',
                'answer' => "Revisi adalah bagian normal dari development:\n\n✅ Free Revision (Termasuk dalam paket):\n• Paket Basic: 2x major revision\n• Paket Professional: 3x major revision\n• Paket Enterprise: Unlimited minor revision\n\n📝 Yang Termasuk Free Revision:\n• Perubahan warna, font, layout\n• Penyesuaian copy/text\n• Bug fixing\n• Performance optimization\n\n💰 Revisi Berbayar:\n• Perubahan fundamental design (redesign)\n• Penambahan fitur baru\n• Perubahan database structure\n• Integration baru\n\nBiaya revisi berbayar: Rp 500.000 - Rp 5.000.000 tergantung kompleksitas. Kami akan berikan estimasi sebelum dikerjakan.",
                'category' => 'project',
                'service_id' => null,
                'display_order' => 3,
                'is_active' => true,
                'view_count' => 298,
                'helpful_yes' => 267,
                'helpful_no' => 12,
            ],
            [
                'question' => 'Apakah source code diserahkan?',
                'answer' => "Ya! 100% source code menjadi milik Anda:\n\n📦 Yang Anda Terima:\n• Full source code (frontend & backend)\n• Database schema & migration files\n• API documentation\n• Deployment guide\n• User manual & admin guide\n• Design files (Figma/Adobe XD)\n\n🔐 Ownership:\n• Anda punya full rights atas code\n• Bisa develop sendiri atau hire developer lain\n• Bisa jual/franchise sistem (jika applicable)\n• No vendor lock-in\n\n💾 Delivery:\n• GitHub private repository\n• ZIP file via Google Drive\n• Dokumentasi lengkap dalam PDF\n\nKami juga bisa bantu setup development environment jika Anda mau lanjut develop sendiri.",
                'category' => 'project',
                'service_id' => null,
                'display_order' => 4,
                'is_active' => true,
                'view_count' => 412,
                'helpful_yes' => 389,
                'helpful_no' => 6,
            ],
            [
                'question' => 'Bagaimana jika project delay?',
                'answer' => "Kami sangat menghargai waktu Anda:\n\n⏰ Komitmen Timeline:\n• 95% project kami selesai on-time atau lebih cepat\n• Timeline buffer sudah diperhitungkan\n• Milestone tracking yang ketat\n\n⚠️ Jika Terjadi Delay:\n• Kami inform segera dengan alasan jelas\n• Berikan revised timeline\n• Kompensasi: Diskon 5-10% untuk delay > 1 minggu\n• Free feature addition (jika delay > 2 minggu)\n\n🚫 Penyebab Delay yang Umum:\n• Perubahan requirement dari client\n• Feedback/approval yang terlambat\n• Third-party API issue\n• Force majeure\n\nKomunikasi transparan adalah kunci. Kami akan selalu update Anda!",
                'category' => 'project',
                'service_id' => null,
                'display_order' => 5,
                'is_active' => true,
                'view_count' => 178,
                'helpful_yes' => 156,
                'helpful_no' => 9,
            ],
        ];

        foreach ($faqs as $faq) {
            FAQ::create($faq);
        }
    }
}
