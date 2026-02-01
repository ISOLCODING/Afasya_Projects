<?php

namespace App\Filament\Resources\FAQS\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class FaqFrom 
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Informasi FAQ')
                ->schema([
                    Textarea::make('question')
                        ->label('Pertanyaan')
                        ->required()
                        ->rows(2)
                        ->placeholder('Masukkan pertanyaan yang sering diajukan')
                        ->columnSpanFull(),
                    
                    RichEditor::make('answer')
                        ->label('Jawaban')
                        ->required()
                        ->toolbarButtons([
                            'bold',
                            'italic',
                            'link',
                            'bulletList',
                            'orderedList',
                        ])
                        ->columnSpanFull(),
                    
                    Select::make('category')
                        ->label('Kategori')
                        ->options([
                            'Umum' => 'Umum',
                            'Teknis' => 'Teknis',
                            'Harga' => 'Harga',
                            'Layanan' => 'Layanan',
                            'Website' => 'Website',
                            'Aplikasi' => 'Aplikasi',
                        ])
                        ->default('Umum')
                        ->searchable()
                        ->required(),
                    
                    TextInput::make('display_order')
                        ->label('Urutan Tampilan')
                        ->numeric()
                        ->default(0)
                        ->helperText('Angka lebih kecil akan tampil lebih awal'),
                    
                    Toggle::make('is_active')
                        ->label('Status Aktif')
                        ->default(true)
                        ->helperText('Nonaktifkan untuk menyembunyikan dari halaman depan'),
                ])
                ->columns(2)
        ]);
    }
}