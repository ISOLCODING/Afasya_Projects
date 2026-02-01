<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function index()
    {
        $methods = PaymentMethod::where('is_active', true)
            ->orderBy('display_order')
            ->get()
            ->map(function ($method) {
                return [
                    'id' => $method->id,
                    'type' => $method->type,
                    'name' => $method->name,
                    'number' => $method->number,
                    'bank_name' => $method->bank_name,
                    'bank_logo_url' => $method->getFirstMediaUrl('bank_logo'),
                    'qris_image_url' => $method->getFirstMediaUrl('qris_image'),
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $methods,
            'message' => 'Payment methods retrieved successfully',
        ]);
    }
}
