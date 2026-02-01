<?php

namespace App\Filament\Resources\Teams\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class TeamForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Team Member')
                    ->tabs([
                        Tab::make('Identity')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('name')
                                            ->required(),
                                        TextInput::make('position')
                                            ->required()
                                            ->placeholder('e.g. Senior Backend Developer'),
                                        TextInput::make('email')
                                            ->email(),
                                        TextInput::make('phone')
                                            ->tel(),
                                        DatePicker::make('join_date'),
                                        TextInput::make('experience_years')
                                            ->numeric()
                                            ->default(0),
                                        TextInput::make('display_order')
                                            ->numeric()
                                            ->default(0),
                                        Toggle::make('is_active')
                                            ->default(true),
                                    ])->columns(2),
                            ]),

                        Tab::make('Bio')
                            ->icon('heroicon-o-identification')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('short_bio')
                                            ->maxLength(500)
                                            ->columnSpanFull(),
                                        Textarea::make('bio')
                                            ->rows(5)
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Tab::make('Social & Portfolio')
                            ->icon('heroicon-o-link')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('linkedin_url')->url(),
                                        TextInput::make('github_url')->url(),
                                        TextInput::make('twitter_url')->url(),
                                        TextInput::make('portfolio_url')->url(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Media')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        SpatieMediaLibraryFileUpload::make('team_photos')
                                            ->collection('team_photos')
                                            ->avatar()
                                            ->label('Profile Photo'),
                                    ]),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
