<?php

namespace App\Filament\Resources\Projects\Infolists;

use Filament\Infolists\Components\Grid;
use Filament\Infolists\Components\Group;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\Tabs;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;
use Filament\Support\Enums\FontWeight;
use Filament\Support\Enums\IconPosition;

class ProjectInfolist
{
    public static function make(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)
                    ->schema([
                        Group::make()
                            ->schema([
                                Section::make('Status Proyek')
                                    ->schema([
                                        TextEntry::make('status')
                                            ->badge()
                                            ->color(fn (string $state): string => match ($state) {
                                                'planning' => 'info',
                                                'active' => 'warning',
                                                'on_hold' => 'danger',
                                                'completed' => 'success',
                                                'cancelled' => 'gray',
                                                default => 'gray',
                                            })
                                            ->size(TextEntry\TextEntrySize::Large),
                                        
                                        TextEntry::make('progress')
                                            ->label('Progres Pengerjaan')
                                            ->suffix('%')
                                            ->weight(FontWeight::Bold)
                                            ->size(TextEntry\TextEntrySize::Large)
                                            ->color('primary'),
                                    ])->columns(2),
                            ])->columnSpan(2),

                        Section::make('Timeline')
                            ->schema([
                                TextEntry::make('start_date')
                                    ->label('Mulai')
                                    ->date()
                                    ->icon('heroicon-m-calendar-days')
                                    ->iconColor('primary'),
                                TextEntry::make('due_date')
                                    ->label('Deadline')
                                    ->date()
                                    ->icon('heroicon-m-clock')
                                    ->iconColor('danger'),
                            ])->columnSpan(1),
                    ]),

                Tabs::make('Tabs')
                    ->tabs([
                        Tabs\Tab::make('Detail Proyek')
                            ->icon('heroicon-m-information-circle')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextEntry::make('name')
                                            ->label('Nama Proyek')
                                            ->weight(FontWeight::Bold),
                                        TextEntry::make('user.name')
                                            ->label('Klien')
                                            ->icon('heroicon-m-user')
                                            ->weight(FontWeight::Bold),
                                        TextEntry::make('service.name')
                                            ->label('Layanan Utama'),
                                        TextEntry::make('total_budget')
                                            ->label('Anggaran')
                                            ->money('IDR'),
                                    ]),
                            ]),

                        Tabs\Tab::make('Teknis & Kredensial')
                            ->icon('heroicon-m-cpu-chip')
                            ->schema([
                                Section::make('Spesifikasi')
                                    ->schema([
                                        TextEntry::make('specs')
                                            ->label(false)
                                            ->listWithLineBreaks()
                                            ->bulleted(),
                                    ])->compact(),
                                
                                Section::make('Kredensial / Akses')
                                    ->schema([
                                        TextEntry::make('credentials')
                                            ->label(false)
                                            ->markdown(),
                                    ])->compact(),
                            ]),

                        Tabs\Tab::make('Roadmap')
                            ->icon('heroicon-m-map')
                            ->schema([
                                TextEntry::make('roadmap')
                                    ->label(false)
                                    ->listWithLineBreaks()
                                    ->bulleted(),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
