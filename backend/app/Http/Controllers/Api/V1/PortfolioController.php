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
        $query = Portfolio::where('is_published', true);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        $portfolios = $query->orderBy('published_at', 'desc')->get();

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
