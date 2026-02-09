<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
            Section::make('Informasi Proyek')
                ->description('Detail utama proyek yang sedang berjalan.')
                ->icon('heroicon-m-information-circle')
                ->schema([
                    TextInput::make('name')
                        ->label('Nama Proyek')
                        ->required()
                        ->placeholder('Contoh: Website E-Commerce Afasya'),
                    
                    Select::make('user_id')
                        ->label('Klien')
                        ->relationship('user', 'name')
                        ->required()
                        ->searchable(),
                        
                    Select::make('service_id')
                        ->label('Layanan')
                        ->relationship('service', 'name')
                        ->required(),
                        
                    Select::make('service_package_id')
                        ->label('Paket')
                        ->relationship('servicePackage', 'package_name')
                        ->required(),
                ])->columns(2),

            Section::make('Status & Progres')
                ->icon('heroicon-m-arrow-path')
                ->schema([
                    ToggleButtons::make('status')
                        ->options([
                            'planning' => 'Perencanaan',
                            'active' => 'Sedang Dikerjakan',
                            'on_hold' => 'Tertunda',
                            'completed' => 'Selesai',
                            'cancelled' => 'Dibatalkan',
                        ])
                        ->colors([
                            'planning' => 'info',
                            'active' => 'warning',
                            'on_hold' => 'danger',
                            'completed' => 'success',
                        ])
                        ->icons([
                            'planning' => 'heroicon-o-pencil-square',
                            'active' => 'heroicon-o-play-circle',
                            'completed' => 'heroicon-o-check-badge',
                        ])
                        ->inline(),
                        
                    TextInput::make('progress')
                        ->label('Progres (%)')
                        ->numeric()
                        ->default(0)
                        ->suffix('%')
                        ->required(),
                ])->columns(2),

            Section::make('Timeline & Budget')
                ->icon('heroicon-m-calendar-days')
                ->schema([
                    DatePicker::make('start_date')
                        ->label('Tanggal Mulai'),
                    DatePicker::make('due_date')
                        ->label('Deadline'),
                    TextInput::make('total_budget')
                        ->label('Total Anggaran')
                        ->numeric()
                        ->prefix('Rp')
                        ->step(1000),
                ])->columns(3),

            Section::make('Instruksi & Spesifikasi')
                ->icon('heroicon-m-document-text')
                ->schema([
                    RichEditor::make('instructions')
                        ->label('Instruksi Khusus')
                        ->columnSpanFull(),
                    Textarea::make('credentials')
                        ->label('Akses & Kredensial')
                        ->placeholder('Link staging, login admin, dll.')
                        ->columnSpanFull(),
                ]),
        ]);
    }
}
