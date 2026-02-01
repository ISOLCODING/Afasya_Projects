<?php

namespace App\Filament\Resources\PortfolioImages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PortfolioImagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('portfolio_id')
                    ->numeric()
                    ->sortable(),
                ImageColumn::make('image_url'),
                TextColumn::make('alt_text')
                    ->searchable(),
                TextColumn::make('caption')
                    ->searchable(),
                TextColumn::make('display_order')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_featured')
                    ->boolean(),
                TextColumn::make('file_size')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('mime_type')
                    ->searchable(),
                TextColumn::make('dimensions')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
