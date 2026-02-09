<?php

namespace App\Filament\Resources\FAQS\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class FAQForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('FAQ Details')
                    ->schema([
                        TextInput::make('question')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                            
                        RichEditor::make('answer')
                            ->required()
                            ->columnSpanFull(),
                            
                        Grid::make(3)
                            ->schema([
                                Select::make('category')
                                    ->options([
                                        'general' => 'General',
                                        'service' => 'Service',
                                        'payment' => 'Payment',
                                        'project' => 'Project',
                                    ])
                                    ->required()
                                    ->searchable(),
                                    
                                Select::make('service_id')
                                    ->relationship('service', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->placeholder('Select Service (Optional)'),
                                    
                                TextInput::make('display_order')
                                    ->numeric()
                                    ->default(0)
                                    ->minValue(0),
                            ]),
                            
                        Toggle::make('is_active')
                            ->default(true)
                            ->onIcon('heroicon-m-check')
                            ->offIcon('heroicon-m-x-mark')
                            ->onColor('success'),
                    ]),
                    
                Section::make('Statistics')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextInput::make('view_count')
                                    ->label('Views')
                                    ->disabled()
                                    ->default(0),
                                    
                                TextInput::make('helpful_yes')
                                    ->label('👍 Helpful')
                                    ->disabled()
                                    ->default(0),
                                    
                                TextInput::make('helpful_no')
                                    ->label('👎 Not Helpful')
                                    ->disabled()
                                    ->default(0),
                            ]),
                    ])
                    ->collapsed(),
            ]);
    }
}
