<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)
                    ->schema([
                        Section::make('Konten Utama')
                            ->columnSpan(2)
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Artikel')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),
                                TextInput::make('slug')
                                    ->label('Slug')
                                    ->required()
                                    ->unique(ignoreRecord: true),
                                Textarea::make('excerpt')
                                    ->label('Ringkasan')
                                    ->rows(3),
                                Builder::make('content')
                                    ->label('Isi Artikel')
                                    ->blocks([
                                        Block::make('rich_text')
                                            ->label('Rich Text')
                                            ->icon('heroicon-o-document-text')
                                            ->schema([
                                                RichEditor::make('content')
                                                    ->required(),
                                            ]),
                                        Block::make('image')
                                            ->label('Image')
                                            ->icon('heroicon-o-photo')
                                            ->schema([
                                                FileUpload::make('url')
                                                    ->label('Image')
                                                    ->image()
                                                    ->required(),
                                                TextInput::make('caption')
                                                    ->label('Caption'),
                                            ]),
                                        Block::make('quote')
                                            ->label('Quote')
                                            ->icon('heroicon-o-chat-bubble-bottom-center-text')
                                            ->schema([
                                                Textarea::make('content')
                                                    ->label('Quote')
                                                    ->required(),
                                                TextInput::make('author')
                                                    ->label('Author'),
                                            ]),
                                        Block::make('code')
                                            ->label('Code Block')
                                            ->icon('heroicon-o-code-bracket')
                                            ->schema([
                                                Textarea::make('code')
                                                    ->label('Code')
                                                    ->required()
                                                    ->rows(5),
                                                TextInput::make('language')
                                                    ->label('Language'),
                                            ]),
                                    ])
                                    ->collapsible()
                                    ->collapsed()
                                    ->cloneable()
                                    ->columnSpanFull(),
                            ]),
                        Section::make('Pengaturan & SEO')
                            ->columnSpan(1)
                            ->schema([
                                FileUpload::make('featured_image')
                                    ->label('Gambar Utama')
                                    ->image()
                                    ->directory('blog'),
                                Select::make('user_id')
                                    ->label('Penulis')
                                    ->relationship('user', 'name')
                                    ->default(auth()->id())
                                    ->required(),
                                TextInput::make('category')
                                    ->label('Kategori'),
                                Select::make('status')
                                    ->label('Status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Dipublikasikan',
                                        'archived' => 'Diarsipkan'
                                    ])
                                    ->default('draft')
                                    ->required(),
                                DateTimePicker::make('published_at')
                                    ->label('Tanggal Publikasi'),
                                TextInput::make('meta_title')
                                    ->label('Meta Title (SEO)'),
                                Textarea::make('meta_description')
                                    ->label('Meta Description (SEO)')
                                    ->rows(3),
                            ]),
                    ]),
            ]);
    }
}
