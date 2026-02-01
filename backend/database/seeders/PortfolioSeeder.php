<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Client;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan ada service untuk direferensikan
        $services = Service::all();
        if ($services->isEmpty()) {
            $this->command->warn('No services found. Please run ServiceSeeder or verify services exist first.');
            return;
        }

        $portfolios = [
            [
                'title' => 'Redesign Website Toko Kelontong Barokah',
                'category' => 'Web Development',
                'industry' => 'Retail',
                'client_name' => 'Toko Barokah',
                'client_business' => 'Toko Kelontong & Sembako',
                'description' => 'Transformasi toko kelontong tradisional menjadi toko online modern dengan sistem manajemen stok yang terintegrasi.',
                'challenge' => 'Pemilik kesulitan memantau stok barang yang ribuan dan sering terjadi selisih pencatatan.',
                'solution' => 'Membangun platform E-commerce berbasis Web dengan fitur POS (Point of Sales) terintegrasi.',
                'results' => 'Peningkatan omzet 35% dalam 3 bulan pertama dan efisiensi stok 100%.',
                'tech_stack' => ['Laravel', 'React', 'Tailwind CSS', 'MySQL'],
                'featured_image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074',
                'is_featured' => true,
            ],
            [
                'title' => 'Aplikasi Reservasi Barbershop "Gentlemen Cut"',
                'category' => 'Mobile App',
                'industry' => 'Lifestyle',
                'client_name' => 'Bpk. Andi',
                'client_business' => 'Jasa Barbershop & Grooming',
                'description' => 'Aplikasi mobile untuk memudahkan pelanggan melakukan booking tanpa harus antre lama di lokasi.',
                'challenge' => 'Antrean yang membludak di akhir pekan membuat banyak pelanggan potensial pergi mencari tempat lain.',
                'solution' => 'Sistem reservasi real-time dengan notifikasi WhatsApp.',
                'results' => 'Repeat order meningkat 50% dan kepuasan pelanggan mencapai 4.9/5.0.',
                'tech_stack' => ['Flutter', 'Firebase', 'Node.js'],
                'featured_image' => 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074',
                'is_featured' => true,
            ],
            [
                'title' => 'Landing Page Jasa Laundry "Resik Wangi"',
                'category' => 'UI/UX Design',
                'industry' => 'Service',
                'client_name' => 'Ibu Siti',
                'client_business' => 'Laundry Kiloan & Satuan',
                'description' => 'Landing page yang informatif untuk meningkatkan kredibilitas jasa laundry rumahan di kancah digital.',
                'challenge' => 'Kurangnya kepercayaan pelanggan baru karena tidak ada informasi harga dan lokasi yang jelas secara online.',
                'solution' => 'Desain landing page minimalis dengan kalkulator harga interaktif.',
                'results' => 'Query WhatsApp dari pelanggan baru meningkat hingga 4x lipat.',
                'tech_stack' => ['Vite', 'React', 'Framer Motion'],
                'featured_image' => 'https://images.unsplash.com/photo-1545173153-5c0557d44bee?q=80&w=2070',
                'is_featured' => false,
            ],
            [
                'title' => 'Portal E-Learning UMKM Digital Academy',
                'category' => 'Web Development',
                'industry' => 'Education',
                'client_name' => 'Afasya Foundation',
                'client_business' => 'Lembaga Pelatihan UMKM',
                'description' => 'Platform pembelajaran online khusus untuk pemilik UMKM yang ingin belajar digital marketing.',
                'challenge' => 'Materi pelatihan yang tersebar dan sulit diakses secara sistematis oleh peserta.',
                'solution' => 'Learning Management System (LMS) custom dengan fitur progress tracking dan kuis.',
                'results' => 'Lebih dari 1000 alumni UMKM telah tersertifikasi melalui platform ini.',
                'tech_stack' => ['Next.js', 'Typescript', 'PostgreSQL', 'Prisma'],
                'featured_image' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070',
                'is_featured' => true,
            ],
            [
                'title' => 'Branding & Social Media Kit Toko Roti "Sweet Bites"',
                'category' => 'Digital Marketing',
                'industry' => 'F&B',
                'client_name' => 'Rina Amalia',
                'client_business' => 'Bakery & Pastry',
                'description' => 'Paket lengkap identitas visual dan template konten media sosial untuk toko roti artisan.',
                'challenge' => 'Visual produk yang bagus namun tampilan feed Instagram yang berantakan tidak menarik pembeli kelas atas.',
                'solution' => 'Rebranding logo dan pembuatan 30+ template post/stories yang estetis.',
                'results' => 'Jumlah follower meningkat 2000 dalam sebulan dan peningkatan pesanan online 60%.',
                'tech_stack' => ['Adobe Illustrator', 'Canva', 'Figma'],
                'featured_image' => 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=2072',
                'is_featured' => false,
            ]
        ];

        foreach ($portfolios as $data) {
            $service = $services->random();
            
            Portfolio::create([
                'uuid' => Str::uuid(),
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'client_name' => $data['client_name'],
                'client_business' => $data['client_business'],
                'category' => $data['category'],
                'industry' => $data['industry'],
                'service_id' => $service->id,
                'description' => $data['description'],
                'challenge' => $data['challenge'],
                'solution' => $data['solution'],
                'results' => $data['results'],
                'tech_stack' => $data['tech_stack'],
                'featured_image' => $data['featured_image'],
                'is_featured' => $data['is_featured'],
                'is_published' => true,
                'status' => 'completed',
                'published_at' => now(),
                'completion_date' => now()->subMonths(rand(1, 12)),
            ]);
        }
    }
}
