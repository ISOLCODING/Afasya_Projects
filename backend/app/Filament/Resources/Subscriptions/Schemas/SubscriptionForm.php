<?php

namespace App\Filament\Resources\Subscriptions\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SubscriptionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Subscriber Details')
                    ->schema([
                        TextInput::make('email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true),
                        TextInput::make('name'),
                        TextInput::make('phone')
                            ->tel(),
                        Select::make('status')
                            ->options([
                                'active' => 'Active',
                                'unsubscribed' => 'Unsubscribed',
                                'bounced' => 'Bounced',
                                'complained' => 'Complained',
                            ])
                            ->required()
                            ->default('active'),
                        Toggle::make('is_verified')
                            ->inline(false),
                    ])->columns(2),

                Section::make('Preferences')
                    ->schema([
                        TagsInput::make('preferences')
                            ->placeholder('New preference...'),
                        TagsInput::make('interests')
                            ->placeholder('New interest...'),
                    ])->columns(2),

                Section::make('Verification & Engagement')
                    ->schema([
                        DateTimePicker::make('verification_sent_at'),
                        DateTimePicker::make('verified_at'),
                        TextInput::make('emails_sent')->numeric()->default(0),
                        TextInput::make('emails_opened')->numeric()->default(0),
                        TextInput::make('emails_clicked')->numeric()->default(0),
                        DateTimePicker::make('last_engaged_at'),
                    ])->columns(3),

                Section::make('System Info')
                    ->schema([
                        TextInput::make('source')->disabled(),
                        TextInput::make('ip_address')->disabled(),
                    ])->columns(2)->collapsed(),
            ]);
    }
}
