<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\ServiceFeature;
use App\Models\ServicePackage;
use App\Models\Portfolio;
use App\Models\Client;
use App\Models\Team;
use App\Models\TeamExpertise;
use App\Models\FAQ;
use App\Models\ContentPage;
use App\Models\ContactMessage;
use App\Models\Subscription;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PermissionsSeeder::class,
            SiteSettingSeeder::class,
            ServiceSeeder::class,      // realistic services
            TeamSeeder::class,         // realistic team
            PortfolioSeeder::class,     // realistic portfolios
            PostSeeder::class,          // realistic posts/blog
            ContentPageSeeder::class,   // dynamic pages
            ClientSeeder::class,        // realistic clients
            FAQSeeder::class,           // realistic FAQs
            BrandSeeder::class,         // realistic partner brands
        ]);

        $this->command->info('✅ Afasya Projects Database Seeded Successfully without Factories!');
    }
}
