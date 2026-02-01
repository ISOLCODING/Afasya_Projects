<?php

namespace App\Filament\Resources\ContactAttachments\Pages;

use App\Filament\Resources\ContactAttachments\ContactAttachmentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListContactAttachments extends ListRecords
{
    protected static string $resource = ContactAttachmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
