<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'site_name',
                'value' => 'Afasya Projects',
                'type' => 'string',
                'group_name' => 'general',
                'is_public' => true,
            ],
            [
                'key' => 'site_description',
                'value' => 'Agensi Digital Premium yang mengkhususkan diri dalam aplikasi web & seluler kelas atas.',
                'type' => 'text',
                'group_name' => 'general',
                'is_public' => true,
            ],
            [
                'key' => 'contact_email',
                'value' => 'rrqhoshi891@gmail.com',
                'type' => 'email',
                'group_name' => 'contact',
                'is_public' => true,
            ],
            [
                'key' => 'contact_phone',
                'value' => '081412307340',
                'type' => 'string',
                'group_name' => 'contact',
                'is_public' => true,
            ],
            [
                'key' => 'social_links',
                'value' => json_encode([
                    'instagram' => 'https://instagram.com/faishol_store',
                    'linkedin' => 'https://linkedin.com/company/afasya_projects',
                ]),
                'type' => 'json',
                'group_name' => 'social',
                'is_public' => true,
            ],
            [
                'key' => 'site_favicon',
                'value' => 'site_settings/favicon.png',
                'type' => 'image',
                'group_name' => 'general',
                'is_public' => true,
            ],
            [
                'key' => 'site_logo',
                'value' => 'site_settings/logo.png',
                'type' => 'image',
                'group_name' => 'general',
                'is_public' => true,
            ],
            [
                'key' => 'site_logo_with_text',
                'value' => 'site_settings/logo.png',
                'type' => 'image',
                'group_name' => 'general',
                'is_public' => true,
            ],
            [
                'key' => 'maintenance_mode',
                'value' => false,
                'type' => 'boolean',
                'group_name' => 'system',
                'is_public' => false,
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
