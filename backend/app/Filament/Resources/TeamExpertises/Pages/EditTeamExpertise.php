<?php

namespace App\Filament\Resources\TeamExpertises\Pages;

use App\Filament\Resources\TeamExpertises\TeamExpertiseResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTeamExpertise extends EditRecord
{
    protected static string $resource = TeamExpertiseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
