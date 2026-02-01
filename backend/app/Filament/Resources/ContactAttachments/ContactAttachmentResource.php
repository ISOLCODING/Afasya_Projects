<?php

namespace App\Filament\Resources\ContactAttachments;

use App\Filament\Resources\ContactAttachments\Pages\CreateContactAttachment;
use App\Filament\Resources\ContactAttachments\Pages\EditContactAttachment;
use App\Filament\Resources\ContactAttachments\Pages\ListContactAttachments;
use App\Filament\Resources\ContactAttachments\Schemas\ContactAttachmentForm;
use App\Filament\Resources\ContactAttachments\Tables\ContactAttachmentsTable;
use App\Models\ContactAttachment;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ContactAttachmentResource extends Resource
{
    protected static ?string $model = ContactAttachment::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-paper-clip';

    protected static \UnitEnum|string|null $navigationGroup = 'Inbox';

    public static function form(Schema $schema): Schema
    {
        return ContactAttachmentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ContactAttachmentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListContactAttachments::route('/'),
            'create' => CreateContactAttachment::route('/create'),
            'edit' => EditContactAttachment::route('/{record}/edit'),
        ];
    }
}
