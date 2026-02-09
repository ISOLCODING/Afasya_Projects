<?php

namespace App\Filament\Resources\Orders\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class OrdersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('uuid')
                    ->label('UUID')
                    ->searchable(),
                TextColumn::make('user.name')
                    ->searchable(),
                TextColumn::make('servicePackage.id')
                    ->searchable(),
                TextColumn::make('amount')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('status')
                    ->searchable(),
                TextColumn::make('paymentMethod.name')
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
                \Filament\Actions\Action::make('confirm_payment')
                    ->label('Confirm & Activate')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (\App\Models\Order $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(function (\App\Models\Order $record) {
                        $record->update(['status' => 'confirmed']);

                        \App\Models\Project::create([
                            'user_id' => $record->user_id,
                            'order_id' => $record->id,
                            'service_id' => $record->servicePackage->service_id,
                            'service_package_id' => $record->service_package_id,
                            'status' => 'planning',
                            'name' => 'Project: ' . ($record->servicePackage->service->name ?? 'Service') . ' - ' . ($record->user->name ?? 'Client'),
                        ]);

                        // Keep UserPackage for compatibility if needed, but the user asked for Project
                        \App\Models\UserPackage::create([
                            'user_id' => $record->user_id,
                            'service_package_id' => $record->service_package_id,
                            'order_id' => $record->id,
                            'status' => 'active',
                            'started_at' => now(),
                            'expired_at' => null,
                        ]);
                    })
                    ->successNotificationTitle('Order confirmed and package activated'),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
