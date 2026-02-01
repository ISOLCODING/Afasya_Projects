<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@afasya.com')->first();

        $posts = [
            [
                'title' => 'Pentingnya Kehadiran Digital bagi UMKM Indonesia',
                'excerpt' => 'Mengapa di tahun 2026 ini, memiliki website bukan lagi pilihan melainkan keharusan untuk UMKM.',
                'content' => '<p>Di era digital yang semakin pesat, pelaku usaha mikro, kecil, dan menengah (UMKM) dituntut untuk beradaptasi...</p>',
                'category' => 'Bisnis',
            ],
            [
                'title' => '5 Tips Meningkatkan Kecepatan Website Anda',
                'excerpt' => 'Website yang lambat bisa membunuh bisnis Anda. Pelajari cara mengoptimalkannya.',
                'content' => '<p>Kecepatan website adalah salah satu faktor utama dalam peringkat SEO dan kepuasan pengguna...</p>',
                'category' => 'Teknologi',
            ],
            [
                'title' => 'Cara Membangun Brand Identity yang Kuat',
                'excerpt' => 'Brand bukan hanya soal logo, tapi soal bagaimana orang merasakan bisnis Anda.',
                'content' => '<p>Membangun brand identity memerlukan konsistensi dalam desain, suara, dan nilai-nilai perusahaan...</p>',
                'category' => 'Desain',
            ],
            [
                'title' => 'Optimasi SEO untuk Pemula: Panduan Praktis',
                'excerpt' => 'Langkah-langkah mudah agar website Anda muncul di halaman pertama Google.',
                'content' => '<p>SEO adalah investasi jangka panjang yang sangat menguntungkan jika dilakukan dengan benar...</p>',
                'category' => 'Marketing',
            ],
            [
                'title' => 'Tren Desain Web Tahun 2026',
                'excerpt' => 'Eksplorasi tren visual terbaru yang akan mendominasi dunia web tahun ini.',
                'content' => '<p>Tahun ini kita melihat kembalinya gaya maksimalis namun dengan performa yang tetap ringan...</p>',
                'category' => 'Desain',
            ],
        ];

        foreach ($posts as $data) {
            Post::create([
                'uuid' => Str::uuid(),
                'user_id' => $user->id,
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'excerpt' => $data['excerpt'],
                'content' => $data['content'],
                'category' => $data['category'],
                'tags' => ['digital', 'web', 'afasya'],
                'status' => 'published',
                'published_at' => now(),
                'views_count' => rand(100, 1000),
            ]);
        }
    }
}
