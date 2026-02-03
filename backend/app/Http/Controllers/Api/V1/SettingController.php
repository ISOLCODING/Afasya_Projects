<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SettingController extends ApiController
{
    public function index(): JsonResponse
    {
        $settings = \Illuminate\Support\Facades\Cache::remember('settings_public_v1', 3600, function () {
            return SiteSetting::where('is_public', true)
                ->orderBy('display_order')
                ->get()
                ->mapWithKeys(function ($item) {
                    $value = $item->value;
                    if ($item->type === 'image' && !empty($value)) {
                        // Generate full URL for images
                        $value = asset('storage/' . $value);
                    }
                    return [$item->key => $value];
                });
        });

        return $this->success($settings);
    }
}
