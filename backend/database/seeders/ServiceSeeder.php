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
        $services = [
            [
                'name' => 'Web Development',
                'description' => 'Membangun website modern, cepat, dan responsif untuk bisnis Anda.',
                'icon' => 'globe',
                'features' => ['Responsive Design', 'SEO Optimization', 'Custom Dashboard', 'Fast Loading'],
            ],
            [
                'name' => 'Mobile App Development',
                'description' => 'Pemuatan aplikasi Android dan iOS dengan performa tinggi.',
                'icon' => 'smartphone',
                'features' => ['Cross Platform', 'Push Notifications', 'Offline Mode', 'App Store Ready'],
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'Desain antarmuka yang cantik dan pengalaman pengguna yang intuitif.',
                'icon' => 'layout',
                'features' => ['User Research', 'Wireframing', 'Interactive Prototyping', 'Style Guide'],
            ],
            [
                'name' => 'Digital Marketing',
                'description' => 'Strategi pemasaran digital untuk meningkatkan penjualan Anda.',
                'icon' => 'trending-up',
                'features' => ['Social Media Ads', 'Google Ads', 'Email Marketing', 'Conversion Tracking'],
            ],
        ];

        foreach ($services as $data) {
            $service = Service::create([
                'uuid' => Str::uuid(),
                'name' => $data['name'],
                'slug' => Str::slug($data['name']),
                'icon' => $data['icon'],
                'short_description' => $data['description'],
                'full_description' => 'Kami menyediakan layanan ' . $data['name'] . ' yang komprehensif mulai dari perencanaan hingga peluncuran.',
                'price_min' => rand(1000000, 5000000),
                'price_max' => rand(10000000, 50000000),
                'delivery_time' => '14-30 Hari',
                'is_active' => true,
                'is_featured' => true,
            ]);

            foreach ($data['features'] as $featureName) {
                ServiceFeature::create([
                    'service_id' => $service->id,
                    'feature_name' => $featureName,
                    'is_included' => true,
                ]);
            }

            ServicePackage::create([
                'service_id' => $service->id,
                'package_name' => 'Paket Basic',
                'price' => $service->price_min,
                'delivery_days' => 14,
                'description' => 'Solusi tepat untuk memulai kehadiran digital Anda.',
            ]);

            ServicePackage::create([
                'service_id' => $service->id,
                'package_name' => 'Paket Pro',
                'price' => $service->price_max / 2,
                'delivery_days' => 21,
                'is_popular' => true,
                'description' => 'Pilihan terbaik untuk bisnis yang sedang berkembang.',
            ]);
        }
    }
}
