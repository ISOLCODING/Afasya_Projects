<?php

namespace App\Filament\Resources\ServiceFeatures\Pages;

use App\Filament\Resources\ServiceFeatures\ServiceFeatureResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditServiceFeature extends EditRecord
{
    protected static string $resource = ServiceFeatureResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
