<?php

namespace App\Filament\Resources\Projects\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Support\HtmlString;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama Proyek')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.name')
                    ->label('Klien')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'planning' => 'info',
                        'active' => 'warning',
                        'on_hold' => 'danger',
                        'completed' => 'success',
                        'cancelled' => 'gray',
                        default => 'gray',
                    }),
                TextColumn::make('progress')
                    ->label('Progres')
                    ->formatStateUsing(fn ($state) => new HtmlString("
                        <div class='flex items-center gap-2 w-full min-w-[100px]'>
                            <div class='flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                                <div class='h-full bg-primary-600' style='width: {$state}%'></div>
                            </div>
                            <span class='text-xs font-medium'>{$state}%</span>
                        </div>
                    ")),
                TextColumn::make('due_date')
                    ->label('Deadline')
                    ->date()
                    ->sortable()
                    ->color(fn ($record) => $record->due_date && $record->due_date->isPast() ? 'danger' : 'gray'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'planning' => 'Perencanaan',
                        'active' => 'Sedang Dikerjakan',
                        'on_hold' => 'Tertunda',
                        'completed' => 'Selesai',
                        'cancelled' => 'Dibatalkan',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('notify_whatsapp')
                    ->label('Update ke WhatsApp')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->color('success')
                    ->url(function ($record) {
                        $phone = $record->user->phone ?? '6281412307340'; // Fallback
                        $message = urlencode("Halo *{$record->user->name}*,\n\nUpdate progres proyek *{$record->name}* saat ini sudah mencapai *{$record->progress}%*.\n\nStatus: *{$record->status}*\n\nTerima kasih atas kepercayaannya! 🙏");
                        return "https://wa.me/{$phone}?text={$message}";
                    })
                    ->openUrlInNewTab(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
