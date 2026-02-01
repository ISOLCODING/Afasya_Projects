<?php

namespace App\Filament\Resources\PortfolioImages\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PortfolioImageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('portfolio_id')
                    ->required()
                    ->numeric(),
                FileUpload::make('image_url')
                    ->image()
                    ->required(),
                TextInput::make('alt_text'),
                TextInput::make('caption'),
                TextInput::make('display_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_featured')
                    ->required(),
                TextInput::make('file_size')
                    ->numeric(),
                TextInput::make('mime_type'),
                TextInput::make('dimensions'),
            ]);
    }
}
