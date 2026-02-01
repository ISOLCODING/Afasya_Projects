<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ServicePackage;
use Illuminate\Http\Request;

class ServicePackageController extends Controller
{
    public function index(Request $request)
    {
        $query = ServicePackage::query();

        if ($request->has('ids')) {
            $ids = explode(',', $request->ids);
            $query->whereIn('id', $ids);
        }

        $packages = $query->orderBy('display_order')->get();

        return response()->json([
            'status' => 'success',
            'data' => $packages,
            'message' => 'Service packages retrieved successfully',
        ]);
    }
}
