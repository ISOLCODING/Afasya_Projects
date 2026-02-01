<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('uuid')
                    ->label('UUID')
                    ->required(),
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Select::make('service_package_id')
                    ->relationship('servicePackage', 'id')
                    ->required(),
                TextInput::make('amount')
                    ->required()
                    ->numeric(),
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'rejected' => 'Rejected',
                    ])
                    ->required()
                    ->default('pending'),
                Select::make('payment_method_id')
                    ->relationship('paymentMethod', 'name'),
                \Filament\Forms\Components\SpatieMediaLibraryFileUpload::make('payment_proof')
                    ->collection('payment_proof')
                    ->label('Payment Proof')
                    ->image()
                    ->columnSpanFull(),
                Textarea::make('admin_note')
                    ->columnSpanFull(),
            ]);
    }
}
