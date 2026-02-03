<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = \Illuminate\Support\Facades\Cache::remember('brands_all_v1', 3600, function () {
            return Brand::where('is_active', true)
                ->orderBy('sort_order', 'asc')
                ->get();
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Brands retrieved successfully',
            'data' => $brands
        ]);
    }
}
