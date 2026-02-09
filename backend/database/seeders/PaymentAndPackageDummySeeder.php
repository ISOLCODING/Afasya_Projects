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

        // 2. Service Packages are now handled in ServiceSeeder.php with detailed data.
        // We only trigger a save here if we need to ensure any observers or price calculations are fresh, 
        // though ServiceSeeder already handles this.

    }
}
