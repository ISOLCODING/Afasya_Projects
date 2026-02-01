<?php

namespace App\Filament\Widgets;

use Filament\Actions\BulkActionGroup;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class LatestMessages extends TableWidget
{
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';
    protected static ?string $heading = 'Pesan Kontak Terbaru';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                \App\Models\ContactMessage::query()->latest()->limit(5)
            )
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('name')
                    ->label('Nama Pengirim')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('email')
                    ->label('Email'),
                \Filament\Tables\Columns\TextColumn::make('priority')
                    ->label('Prioritas')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'low' => 'gray',
                        'medium' => 'warning',
                        'high' => 'danger',
                        default => 'gray',
                    }),
                \Filament\Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'info',
                        'read' => 'success',
                        'replied' => 'primary',
                        default => 'gray',
                    }),
                \Filament\Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime()
                    ->sortable(),
            ]);
    }
}
