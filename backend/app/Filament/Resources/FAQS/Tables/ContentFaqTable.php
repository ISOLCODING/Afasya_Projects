<?php

namespace App\Filament\Resources\FAQS\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Filters\TextFilter;

class ContentFaqTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('display_order')
                    ->label('No.')
                    ->sortable()
                    ->alignCenter()
                    ->width(70),
                
                TextColumn::make('question')
                    ->label('Pertanyaan')
                    ->searchable()
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->question),
                
                TextColumn::make('answer')
                    ->label('Jawaban')
                    ->html()
                    ->limit(50)
                    ->tooltip(fn ($record) => strip_tags($record->answer)),
                
                IconColumn::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->sortable()
                    ->alignCenter(),
                
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('display_order', 'asc')
            ->reorderable('display_order')
            ->filters([
                SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'Umum' => 'Umum',
                        'Teknis' => 'Teknis',
                        'Harga' => 'Harga',
                        'Layanan' => 'Layanan',
                        'Website' => 'Website',
                        'Aplikasi' => 'Aplikasi',
                    ]),
                
                TernaryFilter::make('is_active')
                    ->label('Status Aktif')
                    ->placeholder('Semua')
                    ->trueLabel('Aktif')
                    ->falseLabel('Tidak Aktif'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}