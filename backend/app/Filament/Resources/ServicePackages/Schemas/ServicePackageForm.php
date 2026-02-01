<?php

namespace App\Filament\Resources\ServicePackages\Schemas;

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
                TextInput::make('service_id')
                    ->required()
                    ->numeric(),
                TextInput::make('package_name')
                    ->required(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('included_features'),
                TextInput::make('excluded_features'),
                TextInput::make('delivery_days')
                    ->required()
                    ->numeric(),
                Toggle::make('is_popular')
                    ->required(),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
