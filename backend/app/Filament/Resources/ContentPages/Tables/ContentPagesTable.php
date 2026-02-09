<?php

namespace App\Filament\Resources\ContentPages\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;

class ContentPagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Judul Halaman')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('parent.title')
                    ->label('Parent (Induk)')
                    ->placeholder('Menu Utama')
                    ->sortable(),
                TextColumn::make('slug')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('page_type')
                    ->label('Tipe')
                    ->badge(),
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),
                IconColumn::make('is_in_menu')
                    ->boolean()
                    ->label('Navbar'),
                TextColumn::make('menu_icon')
                    ->label('Icon')
                    ->toggleable(),
                TextColumn::make('menu_order')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('view_count')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                SelectFilter::make('page_type')
                    ->options([
                        'custom' => 'Custom',
                        'service' => 'Service Related',
                        'portfolio' => 'Portfolio Related',
                        'blog' => 'Blog Related',
                        'legal' => 'Legal/Privacy',
                    ]),
                TernaryFilter::make('is_published'),
                TernaryFilter::make('is_in_menu'),
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
