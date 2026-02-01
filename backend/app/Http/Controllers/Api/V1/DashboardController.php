<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\ContactMessage;
use App\Models\ContentPage;
use App\Models\Team;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $stats = [
            [
                'label' => 'Total Services',
                'value' => Service::count(),
                'icon' => 'Layout',
                'color' => 'blue',
            ],
            [
                'label' => 'Total Portfolios',
                'value' => Portfolio::count(),
                'icon' => 'Briefcase',
                'color' => 'emerald',
            ],
            [
                'label' => 'Total Blog Posts',
                'value' => Post::count(),
                'icon' => 'FileText',
                'color' => 'amber',
            ],
            [
                'label' => 'New Messages',
                'value' => ContactMessage::count(),
                'icon' => 'MessageSquare',
                'color' => 'rose',
            ],
            [
                'label' => 'Active Pages',
                'value' => ContentPage::count(),
                'icon' => 'Layers',
                'color' => 'purple',
            ],
        ];

        return response()->json([
            'status' => 'success',
            'data' => [
                'stats' => $stats,
                'summary' => [
                    'services' => Service::latest()->take(5)->get(['id', 'name', 'slug', 'created_at']),
                    'portfolios' => Portfolio::latest()->take(5)->get(['id', 'title', 'slug', 'created_at']),
                    'posts' => Post::latest()->take(5)->get(['id', 'title', 'slug', 'created_at']),
                    'messages' => ContactMessage::latest()->take(5)->get(['id', 'name', 'subject', 'created_at']),
                ]
            ]
        ]);
    }
}
