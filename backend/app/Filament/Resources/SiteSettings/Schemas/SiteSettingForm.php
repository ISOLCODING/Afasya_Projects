<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Setting Identification')
                    ->schema([
                        TextInput::make('key')
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('label')
                            ->required(),
                        TextInput::make('group_name')
                            ->required()
                            ->placeholder('e.g. general, social, api'),
                        TextInput::make('subgroup'),
                        Textarea::make('description')
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('Setting Value')
                    ->schema([
                        Select::make('type')
                            ->options([
                                'text' => 'Text Area',
                                'string' => 'Single Line Text',
                                'boolean' => 'Toggle',
                                'number' => 'Numeric',
                                'json' => 'JSON/Key-Value',
                                'url' => 'URL',
                                'email' => 'Email',
                                'image' => 'Image/File',
                            ])
                            ->required()
                            ->default('string')
                            ->live(),
                        
                        TextInput::make('value')
                            ->label('Value (as String)')
                            ->visible(fn (callable $get) => in_array($get('type'), ['string', 'url', 'email', 'number'])),
                        
                        Textarea::make('value')
                            ->label('Value (as Text)')
                            ->visible(fn (callable $get) => $get('type') === 'text'),
                        
                        Toggle::make('value')
                            ->label('Value (as Boolean)')
                            ->visible(fn (callable $get) => $get('type') === 'boolean'),
                        
                         \Filament\Forms\Components\FileUpload::make('value')
                            ->label('Value (Image)')
                            ->image()
                            ->directory('site_settings')
                            ->visibility('public')
                            ->visible(fn (callable $get) => $get('type') === 'image'),
                        
                        KeyValue::make('options')
                            ->label('Options (for Select Type or JSON)'),
                    ]),

                Section::make('Configuration')
                    ->schema([
                        TextInput::make('display_order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_public')
                            ->label('Publicly Available?'),
                        Toggle::make('is_required')
                            ->label('Is Required?'),
                        Toggle::make('is_encrypted')
                            ->label('Encrypt Value?'),
                    ])->columns(4),
            ]);
    }
}
