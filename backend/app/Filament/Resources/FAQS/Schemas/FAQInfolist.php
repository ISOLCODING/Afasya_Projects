<?php

namespace App\Filament\Resources\FAQS\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class FAQInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('uuid')
                    ->label('UUID'),
                TextEntry::make('question')
                    ->columnSpanFull(),
                TextEntry::make('answer')
                    ->columnSpanFull(),
                TextEntry::make('category'),
                TextEntry::make('service.name')
                    ->label('Service')
                    ->placeholder('-'),
                TextEntry::make('display_order')
                    ->numeric(),
                IconEntry::make('is_active')
                    ->boolean(),
                TextEntry::make('view_count')
                    ->numeric(),
                TextEntry::make('helpful_yes')
                    ->numeric(),
                TextEntry::make('helpful_no')
                    ->numeric(),
                TextEntry::make('created_by')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('updated_by')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
