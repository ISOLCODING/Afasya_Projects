<?php

namespace App\Filament\Resources\ContactAttachments\Pages;

use App\Filament\Resources\ContactAttachments\ContactAttachmentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateContactAttachment extends CreateRecord
{
    protected static string $resource = ContactAttachmentResource::class;
}
