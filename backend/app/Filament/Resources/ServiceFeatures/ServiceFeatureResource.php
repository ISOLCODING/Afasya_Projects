<?php

namespace App\Filament\Resources\ServiceFeatures;

use App\Filament\Resources\ServiceFeatures\Pages\CreateServiceFeature;
use App\Filament\Resources\ServiceFeatures\Pages\EditServiceFeature;
use App\Filament\Resources\ServiceFeatures\Pages\ListServiceFeatures;
use App\Filament\Resources\ServiceFeatures\Schemas\ServiceFeatureForm;
use App\Filament\Resources\ServiceFeatures\Tables\ServiceFeaturesTable;
use App\Models\ServiceFeature;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ServiceFeatureResource extends Resource
{
    protected static ?string $model = ServiceFeature::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-list-bullet';

    protected static \UnitEnum|string|null $navigationGroup = 'Layanan';

    public static function form(Schema $schema): Schema
    {
        return ServiceFeatureForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ServiceFeaturesTable::configure($table);
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
            'index' => ListServiceFeatures::route('/'),
            'create' => CreateServiceFeature::route('/create'),
            'edit' => EditServiceFeature::route('/{record}/edit'),
        ];
    }
}
