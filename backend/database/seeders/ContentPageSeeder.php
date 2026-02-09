<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContentPage;
use Illuminate\Support\Str;

class ContentPageSeeder extends Seeder
{
    public function run(): void
    {
        // Truncate existing data to avoid duplicates
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        ContentPage::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

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
                'is_in_menu' => true,
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
                            'title' => 'Membangun Masa Depan <span class="text-primary-500">Digital</span> Bersama Afasya',
                            'subtitle' => 'PT Afasya Digital Solution adalah mitra transformasi digital terpercaya yang berdedikasi membangun ekosistem bisnis yang cerdas melalui solusi teknologi inovatif.',
                            'cta_text' => 'Lihat Portfolio',
                            'cta_link' => '/portfolio',
                            'image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200'
                        ]
                    ],
                    [
                        'type' => 'feature_grid',
                        'data' => [
                            'main_image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
                            'title' => 'Empowering Businesses Through Innovation',
                            'description' => 'Kami percaya bahwa teknologi harus menjadi enabler, bukan penghalang. Afasya hadir untuk memastikan setiap UMKM memiliki akses ke infrastruktur digital kelas dunia.',
                            'card_title' => 'Ratusan Solusi Digital di Afasya.id',
                            'card_description' => 'Menyediakan alat yang efektif untuk meningkatkan alur kerja, meningkatkan efisiensi, dan mendorong pertumbuhan bisnis Anda.',
                            'card_link' => '/services'
                        ]
                    ],
                    [
                        'type' => 'stats_dark',
                        'data' => [
                            'title' => 'Pencapaian Kami dalam Angka',
                            'description' => 'Dedikasi kami selama bertahun-tahun tercermin dalam setiap milestone yang kami capai bersama klien.',
                            'items' => [
                                ['label' => 'Mitra UMKM', 'value' => '300+'],
                                ['label' => 'Proyek Selesai', 'value' => '800+'],
                                ['label' => 'Kepuasan Klien', 'value' => '99%'],
                                ['label' => 'Penghargaan', 'value' => '10+'],
                            ]
                        ]
                    ],
                    [
                        'type' => 'team_flip_grid',
                        'data' => [
                            'title' => 'Berkenalan dengan Tim Kami',
                            'description' => 'Talenta terbaik yang siap mendampingi kesuksesan digital bisnis Anda.',
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
                            'title' => 'Solusi Digital yang <span class="text-primary-500">Elevate</span> Bisnis Anda',
                            'subtitle' => 'Kami membantu brand membangun keberadaan digital yang kuat melalui desain premium dan teknologi mutakhir.',
                            'cta_text' => 'Konsultasi Gratis',
                            'cta_link' => '/contact',
                        ]
                    ],
                    [
                        'type' => 'service_showcase',
                        'data' => [
                            'title' => 'PILIHAN JENIS JASA PEMBUATAN WEBSITE',
                            'subtitle' => 'JASA WEBSITE',
                            'description' => 'Dengan Proses Pembuatan Website yang terstruktur dan jelas. Afasya Projects menjamin kepuasan kamu atas Website yang kami buat.'
                        ]
                    ],
                    [
                        'type' => 'service_tabs',
                        'data' => [
                            'title' => 'Detail & Spesifikasi Layanan',
                            'subtitle' => 'Analisis Mendalam',
                            'description' => 'Pahami setiap aspek teknis dan visual yang kami berikan untuk setiap proyek Anda.'
                        ]
                    ],
                    [
                        'type' => 'services_grid',
                        'data' => [
                            'title' => 'Katalog Lengkap Layanan',
                            'description' => 'Pilih paket yang paling sesuai dengan target pertumbuhan bisnis Anda.',
                            'limit' => 12
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
            ],
            [
                'title' => 'Tim Kami',
                'slug' => 'team',
                'excerpt' => 'Bertemu dengan tim profesional yang akan membantu transformasi digital bisnis Anda.',
                'content' => [
                    [
                        'type' => 'hero',
                        'data' => [
                            'title' => 'Mengenal <span class="text-primary-500">Tim Ahli</span> Afasya Projects',
                            'subtitle' => 'Kami adalah tim profesional yang berdedikasi untuk membantu transformasi digital bisnis Anda dengan solusi inovatif dan terpercaya.',
                            'cta_text' => 'Hubungi Kami',
                            'cta_link' => '/contact',
                            'image' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200'
                        ]
                    ],
                    [
                        'type' => 'team_grid',
                        'data' => [
                            'title' => 'Tim Profesional Kami',
                            'description' => 'Bertemu dengan para ahli yang akan membantu mewujudkan visi digital bisnis Anda.',
                            'limit' => null
                        ]
                    ],
                    [
                        'type' => 'stats_showcase',
                        'data' => [
                            'title' => 'Pengalaman & Keahlian',
                            'stats' => [
                                [
                                    'value' => '10+',
                                    'label' => 'Tahun Pengalaman',
                                    'description' => 'Pengalaman kolektif tim dalam industri digital'
                                ],
                                [
                                    'value' => '50+',
                                    'label' => 'Proyek Selesai',
                                    'description' => 'Proyek sukses yang telah kami kerjakan'
                                ],
                                [
                                    'value' => '100%',
                                    'label' => 'Kepuasan Klien',
                                    'description' => 'Komitmen kami untuk hasil terbaik'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Ingin Bergabung dengan Tim Kami?',
                            'description' => 'Kami selalu mencari talenta-talenta terbaik untuk bergabung dalam tim kami. Jika Anda passionate tentang teknologi dan ingin membuat dampak, mari berbicara.',
                            'button_text' => 'Kirim CV',
                            'button_link' => 'mailto:career@afasya.com',
                            'theme' => 'primary'
                        ]
                    ]
                ],
                'page_type' => 'team',
                'template' => 'team',
                'is_in_menu' => true,
                'menu_order' => 6,
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

        // Add Child Pages for Services
        $servicesPage = ContentPage::where('slug', 'services')->first();
        if ($servicesPage) {
            $childPages = [
                [
                    'title' => 'Web Profil & Company Profile',
                    'slug' => 'web-profil-company-profile-child',
                    'excerpt' => 'Solusi website profil perusahaan profesional.',
                ],
                [
                    'title' => 'Toko Online & E-Commerce',
                    'slug' => 'toko-online-e-commerce-child',
                    'excerpt' => 'Bangun toko online Anda hari ini.',
                ],
                [
                    'title' => 'Mobile App Development',
                    'slug' => 'mobile-app-development-child',
                    'excerpt' => 'Aplikasi mobile Android & iOS.',
                ],
            ];

            foreach ($childPages as $idx => $child) {
                ContentPage::updateOrCreate(
                    ['slug' => $child['slug']],
                    [
                        'parent_id' => $servicesPage->id,
                        'title' => $child['title'],
                        'slug' => $child['slug'],
                        'excerpt' => $child['excerpt'],
                        'uuid' => (string) Str::uuid(),
                        'is_published' => true,
                        'published_at' => now(),
                        'is_in_menu' => true,
                        'menu_order' => $idx + 1,
                        'page_type' => 'custom',
                        'template' => 'default',
                        'content' => [],
                    ]
                );
            }
        }
    }
}
