<?php

namespace App\Filament\Resources\ContactAttachments\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ContactAttachmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('contact_id')
                    ->required()
                    ->numeric(),
                TextInput::make('file_path')
                    ->required(),
                TextInput::make('file_name')
                    ->required(),
                TextInput::make('file_type')
                    ->required(),
                TextInput::make('file_size')
                    ->required()
                    ->numeric(),
                TextInput::make('mime_type')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('download_count')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
