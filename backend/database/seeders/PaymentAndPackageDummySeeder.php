<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;
use App\Models\Service;
use App\Models\ServicePackage;

class PaymentAndPackageDummySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Payment Methods
        $paymentMethods = [
            [
                'type' => 'bank',
                'name' => 'PT. Afasya Digital Solusi',
                'bank_name' => 'Bank Mandiri',
                'number' => '1234567890',
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'type' => 'bank',
                'name' => 'Afasya Creative',
                'bank_name' => 'Bank DKI',
                'number' => '0987654321',
                'is_active' => true,
                'display_order' => 2,
            ]
        ];

        foreach ($paymentMethods as $pm) {
            PaymentMethod::updateOrCreate(
                ['bank_name' => $pm['bank_name']],
                $pm
            );
        }

        // 2. Create Service Packages for all services
        $services = Service::all();

        foreach ($services as $service) {
            // Clear existing packages to avoid duplicates if running multiple times
            $service->packages()->delete();

            // Basic Package
            ServicePackage::create([
                'service_id' => $service->id,
                'package_name' => 'Starter / Basic',
                'price' => rand(1500000, 3000000),
                'description' => 'Solusi hemat untuk kebutuhan standard.',
                'delivery_days' => 7,
                'is_popular' => false,
                'display_order' => 1,
                'included_features' => ['Fitur Dasar', '1x Revisi', 'Dukungan Standar'],
                'excluded_features' => ['Fitur Premium', 'Custom Design', 'Optimasi Lanjut'],
            ]);

            // Pro Package
            ServicePackage::create([
                'service_id' => $service->id,
                'package_name' => 'Business / Pro',
                'price' => rand(5000000, 10000000),
                'description' => 'Pilihan favorit untuk hasil maksimal.',
                'delivery_days' => 14,
                'is_popular' => true,
                'display_order' => 2,
                'included_features' => ['Semua Fitur Basic', 'Custom Design', 'Optimasi SEO', '3x Revisi', 'Prioritas Dukungan'],
                'excluded_features' => ['Fitur Enterprise', 'Dedicated Manager'],
            ]);

            // Enterprise Package
            ServicePackage::create([
                'service_id' => $service->id,
                'package_name' => 'Advanced / Enterprise',
                'price' => rand(15000000, 30000000),
                'description' => 'Solusi kustom penuh untuk skala besar.',
                'delivery_days' => 30,
                'is_popular' => false,
                'display_order' => 3,
                'included_features' => ['Semua Fitur Pro', 'Dedicated Account Manager', 'Keamanan Lanjut', 'Revisi Sepuasnya', 'Backup Berkala'],
                'excluded_features' => [],
            ]);

            // Save the service to trigger the 'booted' logic that updates price_min/price_max
            $service->save();
        }
    }
}
