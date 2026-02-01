<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'client_name' => $this->client_name,
            'description' => $this->description,
            'challenge' => $this->challenge,
            'solution' => $this->solution,
            'results' => $this->results,
            'tech_stack' => $this->tech_stack,
            'project_url' => $this->project_url,
            'featured_image' => $this->featured_image ?: $this->getFirstMediaUrl('portfolio_covers'),
            'gallery' => $this->getMedia('portfolio_gallery')->map(fn($media) => [
                'url' => $media->getUrl(),
            ]),
            'service' => [
                'name' => $this->service?->name,
                'slug' => $this->service?->slug,
            ],
            'completion_date' => $this->completion_date?->format('Y-m-d'),
        ];
    }
}
