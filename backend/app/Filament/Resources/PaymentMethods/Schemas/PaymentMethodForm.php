<?php

namespace App\Filament\Resources\PaymentMethods\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Get;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PaymentMethodForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('type')
                    ->options([
                        'bank' => 'Bank Transfer',
                        'qris' => 'QRIS',
                    ])
                    ->required()
                    ->live(),
                TextInput::make('name')
                    ->label(fn ($get) => $get('type') === 'qris' ? 'QRIS Label' : 'Account Name')
                    ->required(),
                TextInput::make('bank_name')
                    ->label('Bank/Provider Name')
                    ->placeholder('e.g. BCA, Mandiri, Dana')
                    ->visible(fn ($get) => $get('type') === 'bank'),
                TextInput::make('number')
                    ->label('Account Number')
                    ->visible(fn ($get) => $get('type') === 'bank'),
                SpatieMediaLibraryFileUpload::make('bank_logo')
                    ->collection('bank_logo')
                    ->visible(fn ($get) => $get('type') === 'bank'),
                SpatieMediaLibraryFileUpload::make('qris_image')
                    ->collection('qris_image')
                    ->visible(fn ($get) => $get('type') === 'qris'),
                Toggle::make('is_active')
                    ->default(true),
                TextInput::make('display_order')
                    ->numeric()
                    ->default(0),
            ]);
    }
}
