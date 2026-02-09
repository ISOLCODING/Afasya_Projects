<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class OrderForm
{
    public static function schema(): array
    {
        return [
            Section::make('Customer & Service')
                ->schema([
                    TextInput::make('client_name')
                        ->label('Client Name')
                        ->placeholder('Nama lengkap klien')
                        ->columnSpanFull(),
                    TextInput::make('client_email')
                        ->label('Client Email')
                        ->email()
                        ->placeholder('email@example.com'),
                    TextInput::make('client_whatsapp')
                        ->label('WhatsApp')
                        ->tel()
                        ->placeholder('08123456789'),
                    TextInput::make('company')
                        ->label('Company')
                        ->placeholder('Nama perusahaan (opsional)'),
                    Select::make('user_id')
                        ->relationship('user', 'name')
                        ->label('Linked User Account')
                        ->searchable()
                        ->preload()
                        ->nullable()
                        ->helperText('Otomatis dibuat jika email belum terdaftar'),
                    Select::make('service_package_id')
                        ->relationship('servicePackage', 'package_name')
                        ->label('Service Package')
                        ->searchable()
                        ->preload()
                        ->nullable()
                        ->helperText('Kosong untuk inquiry'),
                ])->columns(2),

            Section::make('Payment Details')
                ->schema([
                    TextInput::make('amount')
                        ->numeric()
                        ->prefix('Rp')
                        ->default(0)
                        ->helperText('Otomatis terisi dari harga paket'),
                    Select::make('status')
                        ->options([
                            'inquiry' => 'Inquiry (Konsultasi)',
                            'pending_payment' => 'Pending Payment',
                            'paid' => 'Paid',
                            'confirmed' => 'Confirmed',
                            'rejected' => 'Rejected',
                        ])
                        ->required()
                        ->default('pending'),
                    Select::make('payment_method_id')
                        ->relationship('paymentMethod', 'name')
                        ->label('Payment Method')
                        ->searchable()
                        ->nullable(),
                ])->columns(3),

            Section::make('Proof & Notes')
                ->schema([
                    SpatieMediaLibraryFileUpload::make('payment_proof')
                        ->collection('payment_proof')
                        ->label('Payment Proof')
                        ->image()
                        ->maxSize(5120)
                        ->columnSpanFull(),
                    Textarea::make('note')
                        ->label('Client Note')
                        ->placeholder('Catatan dari klien')
                        ->rows(3)
                        ->columnSpanFull(),
                    Textarea::make('admin_note')
                        ->label('Admin Note')
                        ->placeholder('Catatan internal admin')
                        ->rows(3)
                        ->columnSpanFull(),
                ]),
        ];
    }
}
