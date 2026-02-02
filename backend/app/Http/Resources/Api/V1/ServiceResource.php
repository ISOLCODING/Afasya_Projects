<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'name' => $this->name,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'full_description' => $this->full_description,
            'price_min' => $this->price_min,
            'price_max' => $this->price_max,
            'starting_price' => $this->starting_price,
            'currency' => $this->currency,
            'delivery_time' => $this->delivery_time,
            'is_featured' => $this->is_featured,
            'icon_url' => $this->getFirstMediaUrl('service_icon'),
            'gallery' => $this->getMedia('service_images')->map(fn($media) => [
                'url' => $media->getUrl(),
                'name' => $media->name,
            ]),
            'features' => ServiceFeatureResource::collection($this->whenLoaded('features')),
            'packages' => ServicePackageResource::collection($this->whenLoaded('packages')),
        ];
    }
}
