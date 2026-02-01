<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ContentPage;
use Illuminate\Http\JsonResponse;

class PageController extends ApiController
{
    public function index(): JsonResponse
    {
        $pages = ContentPage::where('is_published', true)
            ->orderBy('menu_order')
            ->get(['title', 'slug', 'excerpt', 'is_in_menu', 'menu_order']);

        return $this->success($pages);
    }

    public function show(ContentPage $page): JsonResponse
    {
        if (!$page->is_published) {
            return $this->error('Page not found', 404);
        }

        $page->increment('view_count');

        return $this->success([
            'title' => $page->title,
            'slug' => $page->slug,
            'content' => $page->content,
            'excerpt' => $page->excerpt,
            'meta' => [
                'title' => $page->meta_title,
                'description' => $page->meta_description,
                'keywords' => $page->meta_keywords,
                'og_image' => $page->getFirstMediaUrl('og_images'),
            ]
        ]);
    }
}
