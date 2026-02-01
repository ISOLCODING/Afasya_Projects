<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FAQ;
use Illuminate\Support\Str;

class FAQSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Berapa lama pengerjaan satu website?',
                'answer' => 'Tergantung kompleksitas, biasanya untuk landing page standar memerlukan waktu 3-7 hari kerja.',
            ],
            [
                'question' => 'Apakah harga yang tertera sudah termasuk hosting?',
                'answer' => 'Ya, paket kami sudah termasuk domain (.com/.id) dan hosting untuk satu tahun pertama.',
            ],
            [
                'question' => 'Apakah saya bisa mengajukan revisi?',
                'answer' => 'Tentu, kami menyediakan kuota revisi sesuai paket yang dipilih untuk memastikan kepuasan Anda.',
            ],
        ];

        foreach ($faqs as $data) {
            FAQ::create([
                'uuid' => Str::uuid(),
                'question' => $data['question'],
                'answer' => $data['answer'],
                'category' => 'General',
                'is_active' => true,
                'display_order' => rand(1, 10),
            ]);
        }
    }
}
