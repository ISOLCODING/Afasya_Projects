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

        $query = Post::with('author')->where('status', 'published')->orderBy('published_at', 'desc');

        if ($category) {
            $query->where('category', $category);
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        $posts = $query->paginate($limit);

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
        $post = Post::with('author')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $post->increment('views_count');

        return $this->success(new PostResource($post));
    }
}
