<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'category' => $this->category,
            'tags' => $this->tags,
            'status' => $this->status,
            'published_at' => $this->published_at?->format('Y-m-d H:i:s'),
            'views_count' => $this->views_count,
            'featured_image' => $this->featured_image ?: $this->getFirstMediaUrl('post_images'),
            'author' => [
                'name' => $this->author?->name,
                'avatar' => $this->author?->getFirstMediaUrl('avatars'),
            ],
            'meta' => [
                'title' => $this->meta_title,
                'description' => $this->meta_description,
            ],
        ];
    }
}
