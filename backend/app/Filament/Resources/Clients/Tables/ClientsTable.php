<?php

namespace App\Filament\Resources\Clients\Tables;

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

class ClientsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('photo')
                    ->collection('client_photos')
                    ->circular(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('business_name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('business_type')
                    ->badge(),
                TextColumn::make('rating')
                    ->numeric()
                    ->sortable()
                    ->formatStateUsing(fn (int $state): string => str_repeat('⭐', $state)),
                IconColumn::make('is_featured')
                    ->boolean()
                    ->label('Featured'),
                IconColumn::make('is_approved')
                    ->boolean()
                    ->label('Approved'),
                TextColumn::make('testimonial_date')
                    ->date()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                SelectFilter::make('business_type')
                    ->options([
                        'Corporate' => 'Corporate',
                        'Startup' => 'Startup',
                        'SME' => 'SME',
                        'NGO' => 'NGO',
                        'Personal' => 'Personal',
                    ]),
                TernaryFilter::make('is_featured'),
                TernaryFilter::make('is_approved'),
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
