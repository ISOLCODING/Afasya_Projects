<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SettingController extends ApiController
{
    public function index(): JsonResponse
    {
        $settings = SiteSetting::where('is_public', true)
            ->orderBy('display_order')
            ->get()
            ->pluck('value', 'key');

        return $this->success($settings);
    }
}
