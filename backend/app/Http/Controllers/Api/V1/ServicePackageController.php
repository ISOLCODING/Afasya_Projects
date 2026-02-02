<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ServicePackageResource;
use Illuminate\Http\JsonResponse;

class ServicePackageController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        $query = ServicePackage::query();

        if ($request->has('ids')) {
            $ids = is_array($request->ids) ? $request->ids : explode(',', $request->ids);
            $query->whereIn('id', $ids);
        }

        $packages = $query->orderBy('display_order')->get();

        return $this->success(ServicePackageResource::collection($packages));
    }
}
