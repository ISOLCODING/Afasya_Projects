<?php

namespace App\Filament\Resources\ContentPages\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use App\Models\ServicePackage;
use Illuminate\Support\Str;

class ContentPageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Content Page')
                    ->tabs([
                        Tab::make('Content')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('title')
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),
                                        TextInput::make('slug')
                                            ->required()
                                            ->unique(ignoreRecord: true),
                                        Textarea::make('excerpt')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        Builder::make('content')
                                            ->blocks([
                                                Block::make('rich_text')
                                                    ->label('Rich Text')
                                                    ->icon('heroicon-o-document-text')
                                                    ->schema([
                                                        RichEditor::make('content')
                                                            ->required(),
                                                    ]),
                                                Block::make('hero')
                                                    ->label('Hero Section')
                                                    ->icon('heroicon-o-sparkles')
                                                    ->schema([
                                                        TextInput::make('title')->required(),
                                                        TextInput::make('subtitle'),
                                                        TextInput::make('cta_text')->label('Button Label'),
                                                        TextInput::make('cta_link')->label('Button URL'),
                                                        FileUpload::make('image')->image()->directory('page-blocks'),
                                                    ])->columns(2),
                                                Block::make('image_text')
                                                    ->label('Image with Text')
                                                    ->icon('heroicon-o-photo')
                                                    ->schema([
                                                        FileUpload::make('image')->image()->required(),
                                                        RichEditor::make('content')->required(),
                                                        Select::make('image_position')
                                                            ->options([
                                                                'left' => 'Image Left',
                                                                'right' => 'Image Right',
                                                            ])->default('left'),
                                                    ]),
                                                Block::make('services_grid')
                                                    ->label('Services Grid')
                                                    ->icon('heroicon-o-squares-2x2')
                                                    ->schema([
                                                        TextInput::make('title')->default('Layanan Kami'),
                                                        Textarea::make('description'),
                                                        TextInput::make('limit')->numeric()->default(6),
                                                    ]),
                                                Block::make('portfolio_grid')
                                                    ->label('Portfolio Grid')
                                                    ->icon('heroicon-o-briefcase')
                                                    ->schema([
                                                        TextInput::make('title')->default('Portfolio Terbaru'),
                                                        TextInput::make('limit')->numeric()->default(6),
                                                    ]),
                                                Block::make('team_grid')
                                                    ->label('Team Grid')
                                                    ->icon('heroicon-o-users')
                                                    ->schema([
                                                        TextInput::make('title')->default('Tim Ahli Kami'),
                                                        TextInput::make('limit')->numeric()->default(4),
                                                    ]),
                                                Block::make('blog_grid')
                                                    ->label('Blog Posts')
                                                    ->icon('heroicon-o-newspaper')
                                                    ->schema([
                                                        TextInput::make('title')->default('Artikel Terbaru'),
                                                        TextInput::make('limit')->numeric()->default(3),
                                                    ]),
                                                Block::make('brands_marquee')
                                                    ->label('Brands Marquee')
                                                    ->icon('heroicon-o-building-office')
                                                    ->schema([
                                                        TextInput::make('title')->default('Partner Collaboration'),
                                                        TextInput::make('subtitle')->default('Dipercaya Oleh Brand Ternama'),
                                                        Textarea::make('description')->default('Kami bangga bekerja sama dengan perusahaan-perusahaan inovatif untuk menghadirkan solusi digital terbaik.'),
                                                    ]),
                                                Block::make('pricing_grid')
                                                    ->label('Pricing Grid')
                                                    ->icon('heroicon-o-currency-dollar')
                                                    ->schema([
                                                        TextInput::make('title')->default('Pilihan Paket Layanan'),
                                                        TextInput::make('subtitle')->default('Investasi Digital Terbaik untuk Bisnis Anda'),
                                                        Textarea::make('description'),
                                                        Select::make('package_ids')
                                                            ->label('Select Packages')
                                                            ->multiple()
                                                            ->options(ServicePackage::all()->pluck('package_name', 'id'))
                                                            ->preload()
                                                            ->searchable(),
                                                        Select::make('columns')
                                                            ->options([
                                                                '2' => '2 Columns',
                                                                '3' => '3 Columns',
                                                                '4' => '4 Columns',
                                                            ])->default('3'),
                                                    ]),
                                                Block::make('contact_form')
                                                    ->label('Contact Form')
                                                    ->icon('heroicon-o-envelope')
                                                    ->schema([
                                                        TextInput::make('title')->default('Hubungi Kami'),
                                                        Textarea::make('description'),
                                                    ]),
                                                Block::make('cta_section')
                                                    ->label('Call to Action')
                                                    ->icon('heroicon-o-megaphone')
                                                    ->schema([
                                                        TextInput::make('title')->required(),
                                                        TextInput::make('button_text')->required(),
                                                        TextInput::make('button_link')->required(),
                                                        Select::make('theme')
                                                            ->options([
                                                                'primary' => 'Primary (Emerald)',
                                                                'dark' => 'Dark (Deep Blue)',
                                                                'light' => 'Light (Gray)',
                                                            ])->default('primary'),
                                                    ])->columns(2),
                                            ])
                                            ->collapsible()
                                            ->collapsed()
                                            ->cloneable()
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Navigation & Status')
                            ->icon('heroicon-o-bars-3-center-left')
                            ->schema([
                                Section::make('Navbar Configuration')
                                    ->description('Atur bagaimana halaman ini muncul di menu navigasi atas (Navbar).')
                                    ->icon('heroicon-o-cursor-arrow-rays')
                                    ->schema([
                                        Toggle::make('is_in_menu')
                                            ->label('Tampilkan di Navbar?')
                                            ->helperText('Jika diaktifkan, halaman ini akan muncul di menu utama.')
                                            ->default(true)
                                            ->live(),

                                        Select::make('parent_id')
                                            ->label('Posisi Menu (Parent)')
                                            ->placeholder('Menu Utama (Root)')
                                            ->helperText('Pilih "Layanan" jika Anda ingin halaman ini menjadi sub-menu di bawah Layanan.')
                                            ->relationship('parent', 'title')
                                            ->searchable()
                                            ->preload()
                                            ->visible(fn($get) => $get('is_in_menu')),

                                        Select::make('menu_icon')
                                            ->label('Icon Menu')
                                            ->options([
                                                'layout' => 'Layout / General',
                                                'building-2' => 'Web Profil / Company',
                                                'shopping-cart' => 'E-Commerce / Toko',
                                                'smartphone' => 'Mobile / App',
                                                'calendar-range' => 'Booking / Reservasi',
                                                'search' => 'SEO / Marketing',
                                                'database' => 'System / Database',
                                                'shield' => 'Security / Keamanan',
                                                'globe' => 'Cloud / Hosting',
                                                'monitor' => 'Design / UI UX',
                                                'code-2' => 'Development / Code',
                                                'zap' => 'Interactive / Fast',
                                                'star' => 'Featured / Highlight',
                                            ])
                                            ->searchable()
                                            ->preload()
                                            ->helperText('Pilih ikon yang paling menggambarkan halaman ini.')
                                            ->visible(fn($get) => $get('is_in_menu')),

                                        TextInput::make('menu_order')
                                            ->label('Urutan Menu')
                                            ->numeric()
                                            ->default(0)
                                            ->helperText('Angka lebih kecil akan muncul lebih awal.')
                                            ->visible(fn($get) => $get('is_in_menu')),
                                    ])->columns(2),

                                Section::make('Page Settings')
                                    ->description('Konfigurasi tipe dan status publikasi halaman.')
                                    ->icon('heroicon-o-cog-6-tooth')
                                    ->schema([
                                        Select::make('page_type')
                                            ->label('Tipe Halaman')
                                            ->options([
                                                'custom' => 'Custom (Bebas)',
                                                'service' => 'Terkait Layanan',
                                                'portfolio' => 'Terkait Portfolio',
                                                'blog' => 'Terkait Blog',
                                                'legal' => 'Legal/Privacy Policy',
                                            ])
                                            ->required()
                                            ->default('custom'),
                                        
                                        Select::make('template')
                                            ->label('Template Layout')
                                            ->options([
                                                'default' => 'Default (Modern)',
                                                'full-width' => 'Layar Penuh',
                                                'landing' => 'Landing Page (Tanpa Header)',
                                            ])
                                            ->required()
                                            ->default('default'),

                                        Toggle::make('is_published')
                                            ->label('Publish Halaman')
                                            ->helperText('Hanya halaman yang di-publish yang bisa diakses publik.')
                                            ->default(true),

                                        DateTimePicker::make('published_at')
                                            ->label('Tanggal Publish')
                                            ->default(now()),
                                    ])->columns(2),
                            ]),

                        Tab::make('SEO & Media')
                            ->icon('heroicon-o-globe-alt')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('meta_title'),
                                        Textarea::make('meta_description')
                                            ->columnSpanFull(),
                                        TextInput::make('meta_keywords'),
                                        SpatieMediaLibraryFileUpload::make('og_images')
                                            ->collection('og_images')
                                            ->label('OG Image'),
                                    ])->columns(1),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
