<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\PostResource;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $category = $request->query('category');
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);

        $cacheKey = 'posts_' . md5(json_encode([$category, $limit, $page, $request->has('featured')]));

        $posts = \Illuminate\Support\Facades\Cache::remember($cacheKey, 1800, function () use ($category, $limit, $request) {
            $query = Post::with(['author', 'media']) // Eager load media too if possible, otherwise just author
                ->where('status', 'published')
                ->orderBy('published_at', 'desc');

            if ($category) {
                $query->where('category', $category);
            }

            if ($request->has('featured')) {
                $query->where('is_featured', true);
            }

            return $query->paginate($limit);
        });

        return $this->success([
            'items' => PostResource::collection($posts->items()),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ]
        ]);
    }

    public function show($slug): JsonResponse
    {
        $post = \Illuminate\Support\Facades\Cache::remember('post_' . $slug, 3600, function () use ($slug) {
            return Post::with(['author', 'media'])
                ->where('slug', $slug)
                ->where('status', 'published')
                ->firstOrFail();
        });

        // Increment view count (fire and forget / async preferred, but here we just do it)
        // Note: We might not want to cache the increment logic, but we can't increment on cached retrieve easily without side effects.
        // For performance, we often skip incrementing on every cached hit or use a separate counter.
        // For now, we'll keep it simple: if cached, views might not update instantly in DB, which saves writes.
        // Or we force increment:
        $post->increment('views_count');

        return $this->success(new PostResource($post));
    }
}
