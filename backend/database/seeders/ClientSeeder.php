<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use Illuminate\Support\Str;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'name' => 'Bpk. H. Ahmad',
                'business_name' => 'Catering Berkah',
                'business_type' => 'F&B',
                'testimonial' => 'Setelah dibuatkan website oleh Afasya, pesanan katering kami naik drastis karena pelanggan lebih percaya.',
                'rating' => 5,
            ],
            [
                'name' => 'Ibu Maya',
                'business_name' => 'Maya Boutique',
                'business_type' => 'Fashion',
                'testimonial' => 'Layanan UI/UX desainnya sangat memuaskan, tampilan website butik saya jadi sangat elegan.',
                'rating' => 5,
            ],
            [
                'name' => 'Sdr. Kevin',
                'business_name' => 'Tech Start Indo',
                'business_type' => 'Technology',
                'testimonial' => 'Tim Afasya sangat profesional dalam mendevelop aplikasi mobile kami. Supportnya mantap!',
                'rating' => 4,
            ],
        ];

        foreach ($clients as $data) {
            Client::create([
                'uuid' => Str::uuid(),
                'name' => $data['name'],
                'business_name' => $data['business_name'],
                'business_type' => $data['business_type'],
                'testimonial' => $data['testimonial'],
                'rating' => $data['rating'],
                'is_approved' => true,
            ]);
        }
    }
}
