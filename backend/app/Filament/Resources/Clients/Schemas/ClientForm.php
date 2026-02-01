<?php

namespace App\Filament\Resources\Clients\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class ClientForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Client')
                    ->tabs([
                        Tab::make('Person & Business')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('name')
                                            ->required(),
                                        TextInput::make('email')
                                            ->email(),
                                        TextInput::make('phone')
                                            ->tel(),
                                        TextInput::make('business_name')
                                            ->required(),
                                        Select::make('business_type')
                                            ->options([
                                                'Corporate' => 'Corporate',
                                                'Startup' => 'Startup',
                                                'SME' => 'SME',
                                                'NGO' => 'NGO',
                                                'Personal' => 'Personal',
                                            ])
                                            ->required(),
                                        TextInput::make('business_since')
                                            ->numeric()
                                            ->placeholder('e.g. 2015'),
                                        TextInput::make('employee_count'),
                                        TextInput::make('website_url')
                                            ->url(),
                                        Select::make('service_id')
                                            ->relationship('service', 'name')
                                            ->label('Acquired Service'),
                                        Select::make('portfolio_id')
                                            ->relationship('portfolio', 'title')
                                            ->label('Related Project'),
                                    ])->columns(2),
                            ]),

                        Tab::make('Testimonial')
                            ->icon('heroicon-o-chat-bubble-bottom-center-text')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        Textarea::make('testimonial')
                                            ->required()
                                            ->rows(5)
                                            ->columnSpanFull(),
                                        Select::make('rating')
                                            ->options([
                                                1 => '1 Star',
                                                2 => '2 Stars',
                                                3 => '3 Stars',
                                                4 => '4 Stars',
                                                5 => '5 Stars',
                                            ])
                                            ->required()
                                            ->default(5),
                                        DatePicker::make('testimonial_date')
                                            ->default(now()),
                                        TextInput::make('project_type')
                                            ->placeholder('e.g. Web Development'),
                                    ])->columns(2),
                            ]),

                        Tab::make('Media')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        SpatieMediaLibraryFileUpload::make('client_photos')
                                            ->collection('client_photos')
                                            ->avatar()
                                            ->label('Person Photo'),
                                        SpatieMediaLibraryFileUpload::make('client_logos')
                                            ->collection('client_logos')
                                            ->label('Company Logo'),
                                    ])->columns(2),
                            ]),

                        Tab::make('Settings')
                            ->icon('heroicon-o-cog')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        Toggle::make('is_featured')
                                            ->inline(false),
                                        Toggle::make('is_approved')
                                            ->inline(false)
                                            ->default(true),
                                        TextInput::make('display_order')
                                            ->numeric()
                                            ->default(0),
                                    ])->columns(3),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
