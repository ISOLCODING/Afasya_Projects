<?php

namespace App\Filament\Widgets;

use App\Models\Service;
use Filament\Widgets\ChartWidget;

class ServiceDistributionChart extends ChartWidget
{
    protected ?string $heading = 'Distribusi Layanan & Prioritas';
    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $services = Service::all();
        $activeCount = $services->where('is_active', true)->count();
        $inactiveCount = $services->where('is_active', false)->count();
        $featuredCount = $services->where('is_featured', true)->count();

        return [
            'datasets' => [
                [
                    'label' => 'Status Layanan',
                    'data' => [$activeCount, $inactiveCount, $featuredCount],
                    'backgroundColor' => [
                        'rgba(16, 185, 129, 0.5)', // Emerald/Green
                        'rgba(239, 68, 68, 0.5)',  // Red
                        'rgba(245, 158, 11, 0.5)', // Amber/Gold
                    ],
                    'borderColor' => [
                        'rgb(16, 185, 129)',
                        'rgb(239, 68, 68)',
                        'rgb(245, 158, 11)',
                    ],
                ],
            ],
            'labels' => ['Aktif', 'Non-Aktif', 'Unggulan'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
