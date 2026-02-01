<?php

namespace App\Filament\Resources\TeamExpertises;

use App\Filament\Resources\TeamExpertises\Pages\CreateTeamExpertise;
use App\Filament\Resources\TeamExpertises\Pages\EditTeamExpertise;
use App\Filament\Resources\TeamExpertises\Pages\ListTeamExpertises;
use App\Filament\Resources\TeamExpertises\Schemas\TeamExpertiseForm;
use App\Filament\Resources\TeamExpertises\Tables\TeamExpertisesTable;
use App\Models\TeamExpertise;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TeamExpertiseResource extends Resource
{
    protected static ?string $model = TeamExpertise::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-academic-cap';

    protected static \UnitEnum|string|null $navigationGroup = 'Tim';

    public static function form(Schema $schema): Schema
    {
        return TeamExpertiseForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TeamExpertisesTable::configure($table);
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
            'index' => ListTeamExpertises::route('/'),
            'create' => CreateTeamExpertise::route('/create'),
            'edit' => EditTeamExpertise::route('/{record}/edit'),
        ];
    }
}
