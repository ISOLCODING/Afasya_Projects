<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContentPage;
use Illuminate\Support\Str;

class ContentPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Home',
                'slug' => 'home',
                'excerpt' => 'Solusi Digital Terpercaya untuk UMKM Indonesia.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Solusi Digital Terpercaya untuk UMKM',
                            'subtitle' => 'Afasya Projects membantu UMKM Indonesia bertransformasi digital dengan website profesional, cepat, dan terjangkau.',
                            'cta_text' => 'Mulai Proyek',
                            'cta_link' => '/contact',
                            'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200'
                        ]
                    ],
                    [
                        'type' => 'services_grid',
                        'data' => [
                            'title' => 'Layanan Digital Terintegrasi',
                            'description' => 'Kami menyediakan solusi end-to-end untuk memastikan bisnis Anda sukses di dunia digital.',
                            'limit' => 3
                        ]
                    ],
                    [
                        'type' => 'image_text',
                        'data' => [
                            'title' => 'Partner Digital Terbaik untuk Transformasi Bisnis UMKM',
                            'content' => '<p>Kami memahami tantangan pemilik usaha dalam membangun kehadiran online. Itulah mengapa kami menawarkan solusi yang tidak hanya cantik secara visual, tapi juga efektif secara fungsional.</p><ul><li>Pengerjaan Cepat (3-7 hari)</li><li>Optimasi SEO</li><li>Desain Responsif</li><li>Support Berkelanjutan</li></ul>',
                            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
                            'image_position' => 'right'
                        ]
                    ],
                    [
                        'type' => 'portfolio_grid',
                        'data' => [
                            'title' => 'Project Pilihan dari Klien Terpercaya',
                            'limit' => 3
                        ]
                    ],
                    [
                        'type' => 'team_grid',
                        'data' => [
                            'title' => 'Tim Ahli Kami',
                            'limit' => 4
                        ]
                    ],
                    [
                        'type' => 'blog_grid',
                        'data' => [
                            'title' => 'Artikel Terbaru',
                            'limit' => 3
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Siap Memulai Perjalanan Digital Bisnis Anda?',
                            'button_text' => 'Isi Form Kontak',
                            'button_link' => '/contact',
                            'theme' => 'primary'
                        ]
                    ]
                ],
                'page_type' => 'home',
                'template' => 'home',
                'is_in_menu' => false,
                'menu_order' => 0,
            ],
            [
                'title' => 'Tentang Kami',
                'slug' => 'about-us',
                'excerpt' => 'Mengenal lebih dekat Afasya Projects dan misi kami untuk UMKM Indonesia.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Inovasi Digital untuk Masa Depan UMKM',
                            'subtitle' => 'Afasya Projects berkomitmen menjadi partner transformasi digital nomor 1 bagi pelaku usaha menengah ke bawah di Indonesia.',
                            'cta_text' => 'Lihat Portfolio',
                            'cta_link' => '/portfolio',
                            'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200'
                        ]
                    ],
                    [
                        'type' => 'image_text',
                        'data' => [
                            'title' => 'Visi & Misi Kami',
                            'content' => '<h3>Membangun Ekosistem Digital</h3><p>Kami percaya bahwa setiap bisnis, sekecil apapun, berhak memiliki identitas digital yang profesional. Kami hadir untuk menjembatani kesenjangan teknologi dengan solusi yang terjangkau namun berkualitas tinggi.</p>',
                            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
                            'image_position' => 'left'
                        ]
                    ],
                    [
                        'type' => 'team_grid',
                        'data' => [
                            'title' => 'Berkenalan dengan Tim Kami',
                            'limit' => 8
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Siap untuk meningkatkan omzet bisnis Anda?',
                            'button_text' => 'Konsultasi Sekarang',
                            'button_link' => '/contact',
                            'theme' => 'primary'
                        ]
                    ]
                ],
                'page_type' => 'custom',
                'template' => 'default',
                'is_in_menu' => true,
                'menu_order' => 1,
            ],
            [
                'title' => 'Layanan',
                'slug' => 'services',
                'excerpt' => 'Solusi digital komprehensif mulai dari Website, Branding, hingga Digital Marketing.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Layanan Digital Terintegrasi',
                            'subtitle' => 'Pilih paket yang paling sesuai dengan target pertumbuhan bisnis Anda.',
                            'cta_text' => 'Hubungi Kami',
                            'cta_link' => '/contact',
                        ]
                    ],
                    [
                        'type' => 'services_grid',
                        'data' => [
                            'title' => 'Layanan Unggulan Kami',
                            'description' => 'Kami menyediakan solusi end-to-end untuk memastikan bisnis Anda sukses di dunia digital.',
                            'limit' => 12
                        ]
                    ],
                    [
                        'type' => 'rich_text',
                        'data' => [
                            'content' => '<div style="text-align: center; max-width: 800px; margin: 0 auto; padding: 60px 0;"><h2>Kenapa Harus Kami?</h2><p>Dengan pengalaman menangani ratusan UMKM, kami mengerti kendala utama Anda: Budget dan Teknis. Kami menyederhanakan keduanya untuk Anda.</p></div>'
                        ]
                    ],
                    [
                        'type' => 'contact_form',
                        'data' => [
                            'title' => 'Diskusikan Kebutuhan Anda',
                            'description' => 'Beri tahu kami tantangan bisnis Anda, dan kami akan berikan solusi digital terbaik.'
                        ]
                    ]
                ],
                'page_type' => 'services',
                'template' => 'services',
                'is_in_menu' => true,
                'menu_order' => 2,
            ],
            [
                'title' => 'Portfolio',
                'slug' => 'portfolio',
                'excerpt' => 'Kumpulan karya terbaik kami yang telah membantu klien mencapai target bisnis mereka.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Karya & Inspirasi',
                            'subtitle' => 'Lihat bagaimana kami mentransformasi ide menjadi realitas digital yang memukau.',
                        ]
                    ],
                    [
                        'type' => 'portfolio_grid',
                        'data' => [
                            'title' => 'Project Terbaru',
                            'limit' => 12
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Mulai Proyek Anda Sekarang',
                            'button_text' => 'Hubungi Kami',
                            'button_link' => '/contact',
                            'theme' => 'dark'
                        ]
                    ]
                ],
                'page_type' => 'portfolio',
                'template' => 'portfolio',
                'is_in_menu' => true,
                'menu_order' => 3,
            ],
            [
                'title' => 'Kontak',
                'slug' => 'contact',
                'excerpt' => 'Hubungi tim Afasya Projects untuk konsultasi gratis.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Hubungi Kami',
                            'subtitle' => 'Kami siap membantu menjawab pertanyaan Anda seputar transformasi digital.',
                        ]
                    ],
                    [
                        'type' => 'contact_form',
                        'data' => [
                            'title' => 'Kirim Pesan',
                            'description' => 'Tim kami akan merespons pesan Anda dalam waktu kurang dari 24 jam.'
                        ]
                    ]
                ],
                'page_type' => 'contact',
                'template' => 'contact',
                'is_in_menu' => true,
                'menu_order' => 4,
            ],
            [
                'title' => 'Blog',
                'slug' => 'posts',
                'excerpt' => 'Wawasan Bisnis & Tips Digital Terkini dari Afasya Projects.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Blog & Artikel',
                            'subtitle' => 'Pelajari strategi digital marketing dan tips pengembangan bisnis untuk UMKM.',
                        ]
                    ],
                    [
                        'type' => 'blog_grid',
                        'data' => [
                            'title' => 'Artikel Terbaru',
                            'limit' => 9
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Dapatkan Update Mingguan',
                            'button_text' => 'Langganan Newsletter',
                            'button_link' => '#',
                            'theme' => 'light'
                        ]
                    ]
                ],
                'page_type' => 'blog',
                'template' => 'blog',
                'is_in_menu' => true,
                'menu_order' => 5,
            ]
        ];

        foreach ($pages as $page) {
            ContentPage::updateOrCreate(
                ['slug' => $page['slug']],
                array_merge($page, [
                    'uuid' => (string) Str::uuid(),
                    'is_published' => true,
                    'published_at' => now(),
                    'meta_title' => $page['title'] . ' | Afasya Projects',
                    'meta_description' => $page['excerpt'] ?? '',
                    'menu_order' => $page['menu_order'] ?? 0,
                    'is_in_menu' => $page['is_in_menu'] ?? true,
                    'page_type' => $page['page_type'] ?? 'custom',
                    'template' => $page['template'] ?? 'default',
                    'content' => $page['content'] ?? [],
                ])
            );
        }
    }
}
