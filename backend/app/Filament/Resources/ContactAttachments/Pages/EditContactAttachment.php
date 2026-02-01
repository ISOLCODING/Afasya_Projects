<?php

namespace App\Filament\Resources\ContactAttachments\Pages;

use App\Filament\Resources\ContactAttachments\ContactAttachmentResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditContactAttachment extends EditRecord
{
    protected static string $resource = ContactAttachmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
