<?php

namespace App\Filament\Resources\ServicePackages\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ServicePackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('service_id')
                    ->relationship('service', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                TextInput::make('package_name')
                    ->required(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('IDR'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('included_features')
                    ->helperText('Contoh: Fitur A, Fitur B (Pisahkan dengan koma)'),
                TextInput::make('excluded_features')
                    ->helperText('Contoh: Fitur C (Pisahkan dengan koma)'),
                TextInput::make('delivery_days')
                    ->label('Estimated Delivery (Days)')
                    ->required()
                    ->numeric()
                    ->default(7),
                Toggle::make('is_popular')
                    ->label('Tandai sebagai Populer')
                    ->default(false),
                TextInput::make('display_order')
                    ->numeric()
                    ->default(0),
            ]);
    }
}
