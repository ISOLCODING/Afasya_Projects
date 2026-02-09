<?php

namespace App\Filament\Widgets;

use App\Models\FAQ;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Str;

class FAQStatsOverview extends BaseWidget
{
    protected static ?int $sort = 0;

    protected function getStats(): array
    {
        $totalFaqs = FAQ::count();
        $activeFaqs = FAQ::active()->count();
        $totalViews = FAQ::sum('view_count');
        
        $mostViewed = FAQ::active()->orderBy('view_count', 'desc')->first();
        $mostHelpful = FAQ::active()->orderBy('helpful_yes', 'desc')->first();

        return [
            Stat::make('Total FAQs', "$activeFaqs / $totalFaqs")
                ->description('Active Questions')
                ->descriptionIcon('heroicon-m-chat-bubble-left-right')
                ->color('primary')
                ->chart([7, 2, 10, 3, 15, 4, 17]),

            Stat::make('Total Views', number_format($totalViews))
                ->description('Global Interest')
                ->descriptionIcon('heroicon-m-eye')
                ->color('success'),

            Stat::make('Most Popular Topic', $mostViewed ? ucfirst($mostViewed->category) : '-')
                ->description($mostViewed ? Str::limit($mostViewed->question, 25) : 'No data')
                ->descriptionIcon('heroicon-m-fire')
                ->color('danger'),
                
            Stat::make('Most Helpful', $mostHelpful ? "👍 {$mostHelpful->helpful_yes}" : '-')
                ->description($mostHelpful ? Str::limit($mostHelpful->question, 25) : 'No data')
                ->descriptionIcon('heroicon-m-hand-thumb-up')
                ->color('success'),
        ];
    }
}
