<?php

namespace App\Filament\Resources\TeamExpertises\Pages;

use App\Filament\Resources\TeamExpertises\TeamExpertiseResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTeamExpertises extends ListRecords
{
    protected static string $resource = TeamExpertiseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
