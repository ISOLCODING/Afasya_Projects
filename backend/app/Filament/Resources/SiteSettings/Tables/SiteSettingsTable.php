<?php

namespace App\Filament\Resources\SiteSettings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('uuid')
                    ->label('UUID')
                    ->searchable(),
                TextColumn::make('key')
                    ->searchable(),
                TextColumn::make('type')
                    ->searchable(),
                TextColumn::make('data_type')
                    ->searchable(),
                TextColumn::make('group_name')
                    ->searchable(),
                TextColumn::make('subgroup')
                    ->searchable(),
                TextColumn::make('label')
                    ->searchable(),
                TextColumn::make('placeholder')
                    ->searchable(),
                TextColumn::make('display_order')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_public')
                    ->boolean(),
                IconColumn::make('is_required')
                    ->boolean(),
                IconColumn::make('is_encrypted')
                    ->boolean(),
                TextColumn::make('created_by')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('updated_by')
                    ->numeric()
                    ->sortable(),
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
