<?php

namespace App\Filament\Resources\ServiceFeatures\Pages;

use App\Filament\Resources\ServiceFeatures\ServiceFeatureResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListServiceFeatures extends ListRecords
{
    protected static string $resource = ServiceFeatureResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
