<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Layanan', \App\Models\Service::count())
                ->description('Layanan aktif saat ini')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('success'),
            Stat::make('Portfolio Selesai', \App\Models\Portfolio::count())
                ->description('Proyek yang telah dipublish')
                ->descriptionIcon('heroicon-m-check-badge')
                ->color('info'),
            Stat::make('Artikel Blog', \App\Models\Post::count())
                ->description('Konten edukasi/berita')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('warning'),
            Stat::make('Pesan Masuk', \App\Models\ContactMessage::count())
                ->description('Permintaan klien baru')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('danger'),
            Stat::make('Total Tim', \App\Models\Team::count())
                ->description('Talenta profesional')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),
            Stat::make('Mitra Brand', \App\Models\Brand::count())
                ->description('Partner bisnis & klien')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('success'),
        ];
    }
}
