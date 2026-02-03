<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\PortfolioResource;
use App\Models\Portfolio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        // Generate unique cache key based on filters
        $cacheKey = 'portfolios_' . md5(json_encode($request->all()));

        $portfolios = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($request) {
            $query = Portfolio::with(['media', 'service']) // Eager load crucial relations
                ->where('is_published', true);

            if ($request->has('category')) {
                $query->where('category', $request->category);
            }

            if ($request->has('featured')) {
                $query->where('is_featured', true);
            }

            return $query->orderBy('published_at', 'desc')->get();
        });

        return $this->success(PortfolioResource::collection($portfolios));
    }

    public function show(Portfolio $portfolio): JsonResponse
    {
        if (!$portfolio->is_published) {
            return $this->error('Portfolio not found', 404);
        }

        $portfolio->increment('views_count');
        $portfolio->load('service');

        return $this->success(new PortfolioResource($portfolio));
    }
}
