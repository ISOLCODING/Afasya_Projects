<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'view_admin',
            'manage_users',
            'manage_services',
            'manage_portfolios',
            'manage_team',
            'manage_clients',
            'manage_content',
            'manage_settings',
            'view_messages',
            'manage_messages',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // Create Roles and Assign Permissions
        $admin = Role::findOrCreate('admin');
        $admin->givePermissionTo(Permission::all());

        $editor = Role::findOrCreate('editor');
        $editor->givePermissionTo([
            'view_admin',
            'manage_services',
            'manage_portfolios',
            'manage_content',
            'view_messages',
        ]);

        // Create Default Admin
        $adminUser = User::updateOrCreate(
            ['email' => 'admin@afasya.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $adminUser->assignRole($admin);

        // Create Default Editor
        $editorUser = User::updateOrCreate(
            ['email' => 'editor@afasya.com'],
            [
                'name' => 'Afasya Editor',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $editorUser->assignRole($editor);
    }
}
