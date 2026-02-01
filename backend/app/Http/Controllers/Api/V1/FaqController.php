<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\FAQ;
use Illuminate\Http\JsonResponse;

class FaqController extends ApiController
{
    public function index(): JsonResponse
    {
        $faqs = FAQ::where('is_active', true)
            ->orderBy('display_order')
            ->get()
            ->groupBy('category');

        return $this->success($faqs);
    }
}
