<?php

namespace App\Filament\Resources\Portfolios\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;

class PortfoliosTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('cover')
                    ->collection('portfolio_covers')
                    ->square(),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->wrap(),
                TextColumn::make('client_name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('service.name')
                    ->label('Service')
                    ->sortable(),
                TextColumn::make('category')
                    ->badge()
                    ->searchable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'ongoing' => 'warning',
                        'completed' => 'success',
                        'maintenance' => 'info',
                        default => 'gray',
                    }),
                IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                TextColumn::make('completion_date')
                    ->date()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('views_count')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('service_id')
                    ->relationship('service', 'name')
                    ->label('Service'),
                SelectFilter::make('category')
                    ->options([
                        'Web Development' => 'Web Development',
                        'Mobile App' => 'Mobile App',
                        'UI/UX Design' => 'UI/UX Design',
                        'Branding' => 'Branding',
                        'Digital Marketing' => 'Digital Marketing',
                    ]),
                SelectFilter::make('status')
                    ->options([
                        'ongoing' => 'Ongoing',
                        'completed' => 'Completed',
                        'maintenance' => 'Maintenance',
                    ]),
                TernaryFilter::make('is_featured'),
                TernaryFilter::make('is_published'),
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
