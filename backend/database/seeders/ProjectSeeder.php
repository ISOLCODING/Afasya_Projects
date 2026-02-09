<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Order;
use App\Models\User;
use App\Models\Service;
use App\Models\ServicePackage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create(['name' => 'Trial Client']);
        $service = Service::first();
        $package = ServicePackage::where('service_id', $service->id)->first();
        
        // Create a fake order first if none exists
        $order = Order::first() ?? Order::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $user->id,
            'service_package_id' => $package->id,
            'amount' => $package->price,
            'status' => 'confirmed',
        ]);

        Project::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Website Company Profile - Afasya Prototype',
            'order_id' => $order->id,
            'user_id' => $user->id,
            'service_id' => $service->id,
            'service_package_id' => $package->id,
            'status' => 'active',
            'progress' => 35,
            'total_budget' => $order->amount,
            'start_date' => now()->subDays(5),
            'due_date' => now()->addDays(10),
            'instructions' => 'Buat website yang clean dengan nuansa biru premium. Fokus pada kecepatan load.',
            'specs' => [
                'framework' => 'Laravel 12',
                'frontend' => 'React + Tailwind',
                'features' => ['CMS', 'WhatsApp Integration', 'SEO Optimized']
            ],
            'roadmap' => [
                ['task' => 'UI Design', 'status' => 'completed'],
                ['task' => 'Frontend Dev', 'status' => 'in_progress'],
                ['task' => 'Backend Integration', 'status' => 'pending'],
            ],
            'credentials' => [
                'staging_url' => 'https://staging.afasya.com',
                'admin_panel' => 'Admin Panel via Filament'
            ]
        ]);
        
        Project::create([
            'uuid' => (string) Str::uuid(),
            'name' => 'Mobile App - Afasya Partner',
            'user_id' => $user->id,
            'service_id' => $service->id,
            'service_package_id' => $package->id,
            'status' => 'planning',
            'progress' => 0,
            'total_budget' => 15000000,
            'instructions' => 'Aplikasi untuk tracking order klien.',
        ]);
    }
}
