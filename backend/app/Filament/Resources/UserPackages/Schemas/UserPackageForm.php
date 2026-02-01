<?php

namespace App\Filament\Resources\UserPackages\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserPackageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Select::make('service_package_id')
                    ->relationship('servicePackage', 'id')
                    ->required(),
                Select::make('order_id')
                    ->relationship('order', 'id')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                DateTimePicker::make('started_at'),
                DateTimePicker::make('expired_at'),
            ]);
    }
}
