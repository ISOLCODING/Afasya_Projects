<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\ServiceFeature;
use App\Models\ServicePackage;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate existing data to avoid duplicates
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        ServiceFeature::truncate();
        ServicePackage::truncate();
        Service::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        $services = [
            [
                'name' => 'Web Profil & Company Profile',
                'description' => 'Website representatif untuk meningkatkan kredibilitas bisnis Anda secara profesional.',
                'icon' => 'globe',
                'full_description' => [
                    'title' => 'Design with Impact',
                    'subtitle' => 'Identitas Digital yang Kuat',
                    'content' => 'Desain website profil perusahaan yang dirancang untuk membangun citra brand yang kuat. Kami fokus pada desain yang elegan, kecepatan akses, dan kemudahan navigasi bagi calon klien Anda.',
                    'bullets' => [
                        'Pengguna mudah memahami bagaimana berinteraksi dengan produk',
                        'Konsistensi dalam tata letak, warna, tipografi, dan elemen-elemen lainnya.',
                        'Membuat pengalaman mereka lebih menyenangkan',
                        'Pengguna dapat mengakses produk Anda melalui berbagai perangkat'
                    ]
                ],
                'sub_services' => [
                    'Website Company Profile',
                    'Website Ekspor Komoditas',
                    'Website Sekolah',
                    'Website Komunitas / Organisasi'
                ],
                'features' => [
                    ['name' => 'Responsive Design', 'desc' => 'Tampilan website menyesuaikan otomatis di HP, Tablet, dan Desktop.', 'icon' => 'smartphone'],
                    ['name' => 'SEO Optimization', 'desc' => 'Struktur website ramah Google untuk memudahkan bisnis ditemukan klien.', 'icon' => 'search'],
                    ['name' => 'Fast Performance', 'desc' => 'Optimasi kecepatan loading untuk pengalaman pengguna yang maksimal.', 'icon' => 'zap'],
                    ['name' => 'Custom UI/UX', 'desc' => 'Desain eksklusif yang disesuaikan dengan identitas brand perusahaan Anda.', 'icon' => 'palette'],
                ],
                'packages' => [
                    [
                        'name' => 'Paket Lite',
                        'price' => 1500000,
                        'days' => 7,
                        'description' => 'Solusi ekonomis untuk startup atau bisnis kecil.',
                        'included' => ['5 Halaman Utama', 'Responsive Design', 'SEO Dasar', 'SSL Certificate', 'Domain .com (1 Thn)'],
                        'excluded' => ['Fitur Custom', 'Manajemen Artikel', 'Multi Bahasa']
                    ],
                    [
                        'name' => 'Paket Premium',
                        'price' => 3500000,
                        'days' => 14,
                        'description' => 'Pilihan populer dengan fitur lengkap untuk bisnis berkembang.',
                        'included' => ['10 Halaman Utama', 'Desain Custom Modern', 'Blog/Artikel System', 'Integrasi WhatsApp', 'Optimasi Kecepatan'],
                        'excluded' => ['Fitur Booking', 'Multi Bahasa']
                    ],
                    [
                        'name' => 'Paket Luxury',
                        'price' => 5500000,
                        'days' => 21,
                        'description' => 'Desain eksklusif dan performa maksimal untuk korporasi.',
                        'included' => ['Halaman Unlimited', 'Desain Unik / Request', 'Multi Bahasa', 'Priority Support', 'Bonus Logo Dasar'],
                        'excluded' => []
                    ]
                ]
            ],
            [
                'name' => 'Toko Online & E-Commerce',
                'description' => 'Mulai jualan online dengan sistem otomatisasi pembayaran dan pengiriman.',
                'icon' => 'shopping-cart',
                'full_description' => [
                    'title' => 'Sell Everywhere, Anytime.',
                    'subtitle' => 'Tingkatkan Penjualan 24/7',
                    'content' => 'Platform e-commerce lengkap dengan fitur manajemen produk, keranjang belanja, integrasi payment gateway (Midtrans), dan hitung ongkir otomatis.',
                    'bullets' => [
                        'Sistem pembayaran otomatis aman dan terpercaya',
                        'Integrasi kurir nasional otomatis',
                        'Manajemen stok terpusat',
                        'Notifikasi pesanan via WhatsApp/Email'
                    ]
                ],
                'sub_services' => [
                    'Website E-Commerce',
                    'Toko Online Checkout via WA',
                    'Website Katalog FnB',
                    'Landing Page Produk'
                ],
                'features' => [
                    ['name' => 'Payment Gateway', 'desc' => 'Terima pembayaran otomatis via Transfer Bank, QRIS, dan E-Wallet.', 'icon' => 'credit-card'],
                    ['name' => 'Auto Shipping Rate', 'desc' => 'Perhitungan ongkos kirim otomatis terintegrasi dengan berbagai kurir.', 'icon' => 'truck'],
                    ['name' => 'Inventory System', 'desc' => 'Manajemen stok produk yang akurat dan otomatis berkurang saat terjual.', 'icon' => 'package'],
                    ['name' => 'Customer Dashboard', 'desc' => 'Halaman khusus pembeli untuk melacak pesanan dan riwayat belanja.', 'icon' => 'user'],
                ],
                'packages' => [
                    [
                        'name' => 'E-Commerce Starter',
                        'price' => 5000000,
                        'days' => 14,
                        'description' => 'Toko online siap pakai dengan fitur dasar lengkap.',
                        'included' => ['Manajemen Produk', 'Keranjang Belanja', 'WhatsApp Checkout', 'Laporan Penjualan Dasar'],
                        'excluded' => ['Payment Gateway', 'Hitung Ongkir Otomatis']
                    ],
                    [
                        'name' => 'E-Commerce Pro',
                        'price' => 10000000,
                        'days' => 30,
                        'description' => 'Sistem e-commerce profesional dengan skala enterprise.',
                        'included' => ['Integrasi Midtrans/Xendit', 'API Ongkir Otomatis', 'Sistem Reseller/Dropship', 'Mobile App Webview', 'Keamanan Tinggi'],
                        'excluded' => []
                    ]
                ]
            ],
            [
                'name' => 'Web Booking & Reservasi',
                'description' => 'Sistem reservasi online untuk hotel, klinik, atau jasa profesional lainnya.',
                'icon' => 'calendar-range',
                'full_description' => [
                    'title' => 'Seamless Reservations',
                    'subtitle' => 'Booking Tanpa Antre',
                    'content' => 'Sistem booking kustom yang memudahkan pelanggan melakukan reservasi kapan saja. Dilengkapi dengan kalender ketersediaan dan notifikasi otomatis.',
                    'bullets' => [
                        'Kalender ketersediaan real-time',
                        'Sistem deposit untuk mengurangi pembatalan',
                        'Pengingat jadwal otomatis (Reminder)',
                        'Dashboard manajemen reservasi lengkap'
                    ]
                ],
                'sub_services' => [
                    'Website Tour Travel',
                    'Website Rental Mobil',
                    'Website Hotel / Villa',
                    'Website Sewa Barang'
                ],
                'features' => [
                    ['name' => 'Live Calendar', 'desc' => 'Pelanggan bisa langsung memilih slot waktu yang tersedia secara real-time.', 'icon' => 'calendar'],
                    ['name' => 'Automated Alerts', 'desc' => 'Notifikasi pengingat otomatis dikirim via Email atau WhatsApp.', 'icon' => 'bell'],
                    ['name' => 'Admin Control Panel', 'desc' => 'Kelola semua jadwal reservasi dan data pelanggan dalam satu dashboard.', 'icon' => 'layout'],
                    ['name' => 'Secure Deposits', 'desc' => 'Sistem pembayaran deposit atau DP untuk menjamin keseriusan booking.', 'icon' => 'shield-check'],
                ],
                'packages' => [
                    [
                        'name' => 'Booking Basic',
                        'price' => 7500000,
                        'days' => 21,
                        'description' => 'Sistem booking standar untuk satu lokasi/layanan.',
                        'included' => ['Kalendar Reservasi', 'Manajemen Slot Waktu', 'Notifikasi Email', 'Admin Dashboard'],
                        'excluded' => ['Integrasi Pembayaran', 'Multi-Vendor']
                    ],
                    [
                        'name' => 'Booking Advanced',
                        'price' => 15000000,
                        'days' => 45,
                        'description' => 'Sistem reservasi kompleks dengan manajemen aset dan pembayaran.',
                        'included' => ['Deposit Pembayaran', 'Sinkronisasi Google Calendar', 'Laporan Analytics', 'Multi-Branch/Cabang'],
                        'excluded' => []
                    ]
                ]
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Aplikasi Android dan iOS kustom untuk solusi bisnis yang lebih personal.',
                'icon' => 'smartphone',
                'full_description' => [
                    'title' => 'Pocket-Sized Power.',
                    'subtitle' => 'Hadir Lebih Dekat dengan Pelanggan',
                    'content' => 'Pengembangan aplikasi mobile menggunakan teknologi Flutter/React Native untuk performa maksimal di Android dan iOS.',
                    'bullets' => [
                        'Aplikasi cross-platform stabil Android & iOS',
                        'Fitur offline yang cerdas',
                        'Integrasi hardware mobile (Kamera, GPS, Push Notification)',
                        'UX jempolan yang memudahkan jari berinteraksi'
                    ]
                ],
                'sub_services' => [
                    'Aplikasi Kurir',
                    'Aplikasi E-Learning',
                    'Sistem Kasir Mobile',
                    'Aplikasi Booking Service'
                ],
                'features' => [
                    ['name' => 'Android & iOS', 'desc' => 'Aplikasi berjalan lancar di kedua platform dengan satu basis kode (Cross-Platform).', 'icon' => 'smartphone'],
                    ['name' => 'Push Notifications', 'desc' => 'Kirim promo dan info penting langsung ke layar HP pengguna Anda.', 'icon' => 'message-square'],
                    ['name' => 'Real-time Sync', 'desc' => 'Sinkronisasi data instan antara aplikasi mobile and dashboard admin.', 'icon' => 'refresh-cw'],
                    ['name' => 'Smooth Animations', 'desc' => 'Transisi halaman yang halus untuk kenyamanan navigasi pengguna.', 'icon' => 'activity'],
                ],
                'packages' => [
                    [
                        'name' => 'MVP Mobile App',
                        'price' => 25000000,
                        'days' => 45,
                        'description' => 'Versi awal aplikasi dengan fitur inti untuk testing pasar.',
                        'included' => ['Android & iOS Apps', 'User Authentication', 'Push Notifications', 'API Integration'],
                        'excluded' => ['Real-time Chat', 'Offline Mode Complex']
                    ],
                    [
                        'name' => 'Enterprise Mobile App',
                        'price' => 50000000,
                        'days' => 90,
                        'description' => 'Aplikasi skala penuh dengan fitur kustom yang kompleks.',
                        'included' => ['Microservices Backend', 'High Security Standard', 'Maintenance 6 Bulan', 'Full Source Code'],
                        'excluded' => []
                    ]
                ]
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'Desain visual yang memukau dan pengalaman pengguna yang seamless.',
                'icon' => 'feather',
                'full_description' => [
                    'title' => 'Visual Storytelling',
                    'subtitle' => 'Lebih Dari Sekedar Gambar Bagus',
                    'content' => 'Kami menciptakan desain yang tidak hanya indah secara visual tetapi juga sangat mudah digunakan oleh audiens Anda.',
                    'bullets' => [
                        'Riset mendalam kebiasaan pengguna',
                        'Desain antarmuka yang bersih dan modern',
                        'Prototyping interaktif sebelum koding',
                        'Dokumentasi desain sistem masif'
                    ]
                ],
                'sub_services' => [
                    'Redesign Website',
                    'Dashboard Design',
                    'Mobile App UI',
                    'Design System Library'
                ],
                'features' => [
                    ['name' => 'User-Centric UI', 'desc' => 'Desain antarmuka yang intuitif dan memanjakan mata pengguna.', 'icon' => 'eye'],
                    ['name' => 'Interactive Prototype', 'desc' => 'Simulasi klik aplikasi secara nyata sebelum masuk ke tahap koding.', 'icon' => 'mouse-pointer'],
                    ['name' => 'Design System', 'desc' => 'Dokumentasi komponen desain yang konsisten untuk skala jangka panjang.', 'icon' => 'layers'],
                    ['name' => 'Brand Consistency', 'desc' => 'Menjaga keselarasan warna dan gaya sesuai dengan identitas bisnis.', 'icon' => 'award'],
                ],
                'packages' => [
                    [
                        'name' => 'Landing Page Design',
                        'price' => 2500000,
                        'days' => 5,
                        'description' => 'Desain satu halaman fokus pada konversi.',
                        'included' => ['Figma File', 'Responsive Mockup', 'High-Fidelity UI', 'Icon Custom'],
                        'excluded' => ['Slicing HTML/CSS']
                    ],
                    [
                        'name' => 'Full App Design',
                        'price' => 12000000,
                        'days' => 21,
                        'description' => 'Desain aplikasi lengkap hingga puluhan screen.',
                        'included' => ['User Journey Map', 'Interactive Prototype', 'Design System', 'Unlimited Revisions'],
                        'excluded' => []
                    ]
                ]
            ],
            [
                'name' => 'SEO & Digital Marketing',
                'description' => 'Dominasi mesin pencari dan jangkau lebih banyak audiens tertarget.',
                'icon' => 'search',
                'full_description' => [
                    'title' => 'Rank Number 1.',
                    'subtitle' => 'Strategi Digital yang Terukur',
                    'content' => 'Kami membantu bisnis Anda tampil di halaman pertama Google dan mengelola promosi di media sosial secara profesional.',
                    'bullets' => [
                        'Audit SEO komprehensif',
                        'Strategi konten yang menjual',
                        'Manajemen iklan Google & Meta',
                        'Laporan performa bulanan detail'
                    ]
                ],
                'sub_services' => [
                    'SEO On-Page & Off-Page',
                    'Social Media Ads',
                    'Content Marketing',
                    'Google Business Optimization'
                ],
                'features' => [
                    ['name' => 'Keyword Research', 'desc' => 'Analisis kata kunci paling potensial untuk bisnis Anda.', 'icon' => 'search'],
                    ['name' => 'Content Strategy', 'desc' => 'Perencanaan konten yang berkualitas dan relevan.', 'icon' => 'layout'],
                    ['name' => 'Performance Ads', 'desc' => 'Iklan berbayar yang fokus pada hasil dan konversi.', 'icon' => 'zap'],
                    ['name' => 'Monthly Reporting', 'desc' => 'Laporan hasil kerja yang transparan setiap bulan.', 'icon' => 'award'],
                ],
                'packages' => [
                    [
                        'name' => 'SEO Starter',
                        'price' => 3000000,
                        'days' => 30,
                        'description' => 'Optimasi dasar untuk bisnis lokal.',
                        'included' => ['Audit Website', 'On-Page SEO', 'GMB Optimization', '2 Artikel Pilar'],
                        'excluded' => ['Backlink Management', 'Social Media Ads']
                    ],
                    [
                        'name' => 'Digital Growth',
                        'price' => 8000000,
                        'days' => 30,
                        'description' => 'Paket lengkap untuk pertumbuhan agresif.',
                        'included' => ['Monthly SEO', 'Ads Management', 'High Authority Backlinks', 'Weekly Content'],
                        'excluded' => []
                    ]
                ]
            ],
        ];

        foreach ($services as $index => $data) {
            $service = Service::create([
                'uuid' => (string) Str::uuid(),
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'icon' => $data['icon'],
                'short_description' => $data['description'],
                'full_description' => $data['full_description'],
                'sub_services' => $data['sub_services'],
                'delivery_time' => $data['packages'][0]['days'] . '-' . end($data['packages'])['days'] . ' Hari',
                'display_order' => $index + 1,
                'is_active' => true,
                'is_featured' => true,
            ]);

            // Create Features
            foreach ($data['features'] as $fIndex => $fData) {
                ServiceFeature::create([
                    'service_id' => $service->id,
                    'feature_name' => $fData['name'],
                    'description' => $fData['desc'],
                    'icon' => $fData['icon'],
                    'display_order' => $fIndex + 1,
                ]);
            }

            // Create Packages
            $prices = [];
            foreach ($data['packages'] as $pkgIndex => $pkgData) {
                ServicePackage::create([
                    'service_id' => $service->id,
                    'package_name' => $pkgData['name'],
                    'price' => $pkgData['price'],
                    'delivery_days' => $pkgData['days'],
                    'description' => $pkgData['description'],
                    'included_features' => $pkgData['included'],
                    'excluded_features' => $pkgData['excluded'],
                    'display_order' => $pkgIndex + 1,
                    'is_popular' => $pkgIndex === 1,
                ]);
                $prices[] = $pkgData['price'];
            }

            // Update Service with calculated prices
            if (!empty($prices)) {
                $service->update([
                    'price_min' => min($prices),
                    'price_max' => max($prices),
                ]);
            }
        }
    }
}
