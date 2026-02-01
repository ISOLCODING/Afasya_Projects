<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Service')
                    ->tabs([
                        Tab::make('Basic Info')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('name')
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn ($set, ?string $state) => $set('slug', Str::slug($state))),
                                        TextInput::make('slug')
                                            ->required()
                                            ->unique(ignoreRecord: true),
                                        Textarea::make('short_description')
                                            ->required()
                                            ->maxLength(500)
                                            ->columnSpanFull(),
                                        Builder::make('full_description')
                                            ->label('Service Content Detail')
                                            ->blocks([
                                                Block::make('rich_text')
                                                    ->label('Simple Text Content')
                                                    ->schema([
                                                        RichEditor::make('content')->required(),
                                                    ]),
                                                Block::make('feature_list')
                                                    ->label('Key Features')
                                                    ->schema([
                                                        TextInput::make('title'),
                                                        Builder::make('items')
                                                            ->blocks([
                                                                Block::make('item')
                                                                    ->schema([
                                                                        TextInput::make('text')->required(),
                                                                        TextInput::make('desc'),
                                                                    ]),
                                                            ]),
                                                    ]),
                                                Block::make('process_steps')
                                                    ->label('Working Process')
                                                    ->schema([
                                                        TextInput::make('title'),
                                                        Builder::make('steps')
                                                            ->blocks([
                                                                Block::make('step')
                                                                    ->schema([
                                                                        TextInput::make('title')->required(),
                                                                        Textarea::make('description'),
                                                                    ]),
                                                            ]),
                                                    ]),
                                            ])
                                            ->collapsible()
                                            ->collapsed()
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Details & Pricing')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('price_min')
                                            ->numeric()
                                            ->prefix('IDR')
                                            ->default(0),
                                        TextInput::make('price_max')
                                            ->numeric()
                                            ->prefix('IDR')
                                            ->default(0),
                                        TextInput::make('currency')
                                            ->default('IDR')
                                            ->required(),
                                        TextInput::make('delivery_time')
                                            ->placeholder('e.g. 3-5 days')
                                            ->required(),
                                        TextInput::make('display_order')
                                            ->numeric()
                                            ->default(0),
                                        Toggle::make('is_featured')
                                            ->inline(false),
                                        Toggle::make('is_active')
                                            ->inline(false)
                                            ->default(true),
                                    ])->columns(3),
                            ]),

                        Tab::make('Media')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        SpatieMediaLibraryFileUpload::make('service_icon')
                                            ->collection('service_icon')
                                            ->avatar()
                                            ->label('Icon'),
                                        SpatieMediaLibraryFileUpload::make('service_images')
                                            ->collection('service_images')
                                            ->multiple()
                                            ->reorderable()
                                            ->label('Gallery Images'),
                                    ]),
                            ]),

                        Tab::make('SEO')
                            ->icon('heroicon-o-globe-alt')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('meta_title'),
                                        Textarea::make('meta_description')
                                            ->columnSpanFull(),
                                        TextInput::make('meta_keywords'),
                                    ])->columns(1),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
