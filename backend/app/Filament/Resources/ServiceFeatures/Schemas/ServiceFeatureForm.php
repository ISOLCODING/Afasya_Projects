<?php

namespace App\Filament\Resources\ServiceFeatures\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ServiceFeatureForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('service_id')
                    ->required()
                    ->numeric(),
                TextInput::make('feature_name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('icon')
                    ->default('✓'),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
