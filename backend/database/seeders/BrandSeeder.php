<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Gojek',
                'description' => 'Super-app terkemuka di Asia Tenggara yang menyediakan berbagai layanan mulai dari transportasi, pesan antar makanan, hingga pembayaran digital.',
                'logo_url' => 'https://logo.clearbit.com/gojek.com',
                'website_url' => 'https://www.gojek.com',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Traveloka',
                'description' => 'Platform travel terdepan di Asia Tenggara yang membantu pengguna menemukan dan memesan berbagai produk transportasi, akomodasi, dan gaya hidup.',
                'logo_url' => 'https://logo.clearbit.com/traveloka.com',
                'website_url' => 'https://www.traveloka.com',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Tokopedia',
                'description' => 'Perusahaan teknologi Indonesia dengan misi mencapai pemerataan ekonomi secara digital melalui marketplace yang menghubungkan jutaan penjual dan pembeli.',
                'logo_url' => 'https://logo.clearbit.com/tokopedia.com',
                'website_url' => 'https://www.tokopedia.com',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Bukalapak',
                'description' => 'Salah satu perusahaan teknologi terbesar di Indonesia yang berfokus pada pemberdayaan UMKM melalui platform perdagangan online dan offline.',
                'logo_url' => 'https://logo.clearbit.com/bukalapak.com',
                'website_url' => 'https://www.bukalapak.com',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Blibli',
                'description' => 'E-commerce terpercaya di Indonesia yang berkomitmen memberikan pengalaman belanja online yang aman, nyaman, dan berkualitas dengan berbagai pilihan produk.',
                'logo_url' => 'https://logo.clearbit.com/blibli.com',
                'website_url' => 'https://www.blibli.com',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Telkomsel',
                'description' => 'Operator telekomunikasi seluler terbesar di Indonesia yang menyediakan layanan jaringan berkualitas tinggi dan solusi digital untuk masyarakat luas.',
                'logo_url' => 'https://logo.clearbit.com/telkomsel.com',
                'website_url' => 'https://www.telkomsel.com',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($brands as $brand) {
            // Use updateOrInsert or similar if you want to avoid duplicates if re-running
            Brand::updateOrCreate(
                ['name' => $brand['name']],
                $brand
            );
        }
    }
}
