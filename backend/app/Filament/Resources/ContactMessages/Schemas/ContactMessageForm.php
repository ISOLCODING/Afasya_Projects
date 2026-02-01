<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class ContactMessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Contact Message')
                    ->tabs([
                        Tab::make('Sender & Message')
                            ->icon('heroicon-o-envelope')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('name')->disabled(),
                                        TextInput::make('email')->email()->disabled(),
                                        TextInput::make('phone')->tel()->disabled(),
                                        TextInput::make('company')->disabled(),
                                        TextInput::make('job_title')->disabled(),
                                        TextInput::make('source')->disabled(),
                                        Textarea::make('message')
                                            ->disabled()
                                            ->rows(5)
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Project Details')
                            ->icon('heroicon-o-presentation-chart-line')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        Select::make('service_id')
                                            ->relationship('service', 'name')
                                            ->disabled(),
                                        TextInput::make('budget_range')->disabled(),
                                        TextInput::make('project_deadline')->disabled(),
                                        Textarea::make('project_description')
                                            ->disabled()
                                            ->rows(5)
                                            ->columnSpanFull(),
                                    ])->columns(3),
                            ]),

                        Tab::make('Response & Management')
                            ->icon('heroicon-o-chat-bubble-left-right')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        Select::make('status')
                                            ->options([
                                                'new' => 'New',
                                                'read' => 'Read',
                                                'contacted' => 'Contacted',
                                                'qualified' => 'Qualified',
                                                'lost' => 'Lost',
                                                'junk' => 'Junk',
                                            ])
                                            ->required(),
                                        Select::make('priority')
                                            ->options([
                                                'low' => 'Low',
                                                'medium' => 'Medium',
                                                'high' => 'High',
                                                'urgent' => 'Urgent',
                                            ])
                                            ->required(),
                                        Select::make('assigned_to')
                                            ->relationship('assignee', 'name')
                                            ->searchable()
                                            ->preload(),
                                        Textarea::make('response_note')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                        DateTimePicker::make('responded_at'),
                                        TextInput::make('response_channel'),
                                        DatePicker::make('follow_up_date'),
                                        Textarea::make('follow_up_notes')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ])->columns(2),
                            ]),

                        Tab::make('Metadata')
                            ->icon('heroicon-o-cpu-chip')
                            ->schema([
                                Section::make()
                                    ->schema([
                                        TextInput::make('ip_address')->disabled(),
                                        TextInput::make('page_url')->disabled(),
                                        TextInput::make('referrer_url')->disabled(),
                                        Textarea::make('user_agent')
                                            ->disabled()
                                            ->columnSpanFull(),
                                    ])->columns(3),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }
}
