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
                'key' => 'contact_address',
                'value' => 'Jl. TARUMAJAYA PERUMAHAN BOJONG MAS INDAH KAB BEKASI',
                'type' => 'text',
                'group_name' => 'contact',
                'is_public' => true,
            ],
            [
                'key' => 'contact_map_embed',
                'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1191382176416!2d106.9995681758529!3d-6.114659693871923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a21c789ffe88f%3A0x4412fe0b36477f46!2sWarung%20mama%20faish!5e0!3m2!1sid!2sid!4v1770752168051!5m2!1sid!2sid" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
                'type' => 'url',
                'group_name' => 'contact',
                'is_public' => true,
            ],
            [
                'key' => 'social_links',
                'value' => json_encode([
                    'instagram' => 'https://instagram.com/afasyazynex',
                    'linkedin' => 'https://linkedin.com/company/afasyazynex',
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
