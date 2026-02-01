<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\UserPackage;
use Illuminate\Http\Request;

class UserDashboardController extends Controller
{
    public function userPackages()
    {
        $userId = auth()->id() ?? 1; // Replace with auth()->id() when auth is fully ready

        $packages = UserPackage::with('servicePackage')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $packages,
            'message' => 'User packages retrieved successfully',
        ]);
    }
}
