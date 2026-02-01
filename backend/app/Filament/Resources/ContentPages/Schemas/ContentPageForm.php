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

                        Tab::make('Settings & Hierarchy')
                            ->icon('heroicon-o-cog')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        Select::make('parent_id')
                                            ->relationship('parent', 'title')
                                            ->searchable()
                                            ->preload(),
                                        Select::make('page_type')
                                            ->options([
                                                'custom' => 'Custom',
                                                'service' => 'Service Related',
                                                'portfolio' => 'Portfolio Related',
                                                'blog' => 'Blog Related',
                                                'legal' => 'Legal/Privacy',
                                            ])
                                            ->required()
                                            ->default('custom'),
                                        Select::make('template')
                                            ->options([
                                                'default' => 'Default',
                                                'full-width' => 'Full Width',
                                                'sidebar' => 'With Sidebar',
                                                'landing' => 'Landing Page',
                                            ])
                                            ->required()
                                            ->default('default'),
                                        TextInput::make('menu_order')
                                            ->numeric()
                                            ->default(0),
                                        Toggle::make('is_published')
                                            ->inline(false)
                                            ->default(true),
                                        Toggle::make('is_in_menu')
                                            ->inline(false),
                                        DateTimePicker::make('published_at')
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
