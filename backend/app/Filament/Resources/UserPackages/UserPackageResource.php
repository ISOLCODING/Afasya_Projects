<?php

namespace App\Filament\Resources\UserPackages;

use App\Filament\Resources\UserPackages\Pages\CreateUserPackage;
use App\Filament\Resources\UserPackages\Pages\EditUserPackage;
use App\Filament\Resources\UserPackages\Pages\ListUserPackages;
use App\Filament\Resources\UserPackages\Schemas\UserPackageForm;
use App\Filament\Resources\UserPackages\Tables\UserPackagesTable;
use App\Models\UserPackage;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UserPackageResource extends Resource
{
    protected static ?string $model = UserPackage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return UserPackageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UserPackagesTable::configure($table);
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
            'index' => ListUserPackages::route('/'),
            'create' => CreateUserPackage::route('/create'),
            'edit' => EditUserPackage::route('/{record}/edit'),
        ];
    }
}
