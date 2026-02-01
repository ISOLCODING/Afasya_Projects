<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceFeatureResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->feature_name,
            'description' => $this->description,
            'icon' => $this->icon,
            'is_included' => $this->is_included,
        ];
    }
}
