<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServicePackageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'service_id' => $this->service_id,
            'package_name' => $this->package_name,
            'price' => $this->price,
            'description' => $this->description,
            'included_features' => $this->included_features,
            'excluded_features' => $this->excluded_features,
            'delivery_days' => $this->delivery_days,
            'is_popular' => $this->is_popular,
            'display_order' => $this->display_order,
        ];
    }
}
