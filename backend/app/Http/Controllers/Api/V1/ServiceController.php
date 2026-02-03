<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends ApiController
{
    public function index(): JsonResponse
    {
        $services = \Illuminate\Support\Facades\Cache::remember('services_all_v1', 3600, function () {
            return Service::where('is_active', true)
                ->with(['media', 'features', 'packages']) // Eager load relationships
                ->orderBy('display_order')
                ->get();
        });

        return $this->success(ServiceResource::collection($services));
    }

    public function show(Service $service): JsonResponse
    {
        if (!$service->is_active) {
            return $this->error('Service not found', 404);
        }

        $service->increment('view_count');
        $service->load(['features', 'packages']);

        return $this->success(new ServiceResource($service));
    }
}
