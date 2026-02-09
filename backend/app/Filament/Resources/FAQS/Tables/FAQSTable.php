<?php

namespace App\Filament\Resources\FAQS\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class FAQSTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question')
                    ->searchable()
                    ->sortable()
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->question),
                
                TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'general' => 'gray',
                        'service' => 'info',
                        'payment' => 'warning',
                        'project' => 'success',
                        default => 'gray',
                    })
                    ->searchable(),
                    
                TextColumn::make('service.name')
                    ->label('Service')
                    ->searchable()
                    ->placeholder('-'),
                    
                ToggleColumn::make('is_active')
                    ->label('Active')
                    ->sortable(),
                    
                TextColumn::make('view_count')
                    ->label('Views')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('helpful_stats')
                    ->label('Feedback')
                    ->state(fn ($record) => "👍 {$record->helpful_yes} • 👎 {$record->helpful_no}")
                    ->color('gray'),
                    
                TextColumn::make('display_order')
                    ->label('Order')
                    ->sortable(),
                    
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'general' => 'General',
                        'service' => 'Service',
                        'payment' => 'Payment',
                        'project' => 'Project',
                    ]),
                TernaryFilter::make('is_active')
                    ->label('Status')
                    ->boolean()
                    ->trueLabel('Active FAQs')
                    ->falseLabel('Inactive FAQs')
                    ->native(false),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('display_order', 'asc');
    }
}
