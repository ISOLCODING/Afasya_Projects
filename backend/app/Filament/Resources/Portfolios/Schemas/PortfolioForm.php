<?php

namespace App\Filament\Resources\Portfolios\Schemas;

use App\Models\Client;
use App\Models\Service;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PortfolioForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Portfolio')
                    ->tabs([
                        Tab::make('Project Overview')
                            ->icon('heroicon-o-briefcase')
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
                                        Select::make('service_id')
                                            ->relationship('service', 'name')
                                            ->required()
                                            ->searchable()
                                            ->preload(),
                                        Select::make('client_id')
                                            ->relationship('client', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->createOptionForm([
                                                TextInput::make('name')->required(),
                                                TextInput::make('business_name')->required(),
                                            ]),
                                        TextInput::make('client_name')
                                            ->required()
                                            ->helperText('Override client name if needed'),
                                        TextInput::make('client_business')
                                            ->required(),
                                        Select::make('category')
                                            ->options([
                                                'Web Development' => 'Web Development',
                                                'Mobile App' => 'Mobile App',
                                                'UI/UX Design' => 'UI/UX Design',
                                                'Branding' => 'Branding',
                                                'Digital Marketing' => 'Digital Marketing',
                                            ])
                                            ->required(),
                                        TextInput::make('industry')
                                            ->required(),
                                        TagsInput::make('tech_stack')
                                            ->required(),
                                        Select::make('status')
                                            ->options([
                                                'ongoing' => 'Ongoing',
                                                'completed' => 'Completed',
                                                'maintenance' => 'Maintenance',
                                            ])
                                            ->required()
                                            ->default('completed'),
                                    ])->columns(2),
                            ]),

                        Tab::make('Content')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        RichEditor::make('description')
                                            ->required()
                                            ->columnSpanFull(),
                                        RichEditor::make('challenge')
                                            ->columnSpanFull(),
                                        RichEditor::make('solution')
                                            ->columnSpanFull(),
                                        RichEditor::make('results')
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Tab::make('Links & Dates')
                            ->icon('heroicon-o-link')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('project_url')->url(),
                                        TextInput::make('github_url')->url(),
                                        TextInput::make('demo_url')->url(),
                                        TextInput::make('video_url')->url(),
                                        DatePicker::make('start_date'),
                                        DatePicker::make('completion_date'),
                                        DatePicker::make('launch_date'),
                                        DateTimePicker::make('published_at')
                                            ->default(now()),
                                    ])->columns(2),
                            ]),

                        Tab::make('Media')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        SpatieMediaLibraryFileUpload::make('portfolio_covers')
                                            ->collection('portfolio_covers')
                                            ->label('Cover Image')
                                            ->required(),
                                        SpatieMediaLibraryFileUpload::make('portfolio_gallery')
                                            ->collection('portfolio_gallery')
                                            ->multiple()
                                            ->reorderable()
                                            ->label('Gallery Images'),
                                    ]),
                            ]),

                        Tab::make('Visibility & SEO')
                            ->icon('heroicon-o-eye')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        Toggle::make('is_featured'),
                                        Toggle::make('is_published')->default(true),
                                        Toggle::make('show_in_showcase')->default(true),
                                        TextInput::make('meta_title'),
                                        Textarea::make('meta_description')->columnSpanFull(),
                                        TextInput::make('meta_keywords'),
                                    ])->columns(3),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
