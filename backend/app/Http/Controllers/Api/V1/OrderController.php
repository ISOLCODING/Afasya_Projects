<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ServicePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_package_id' => 'required|exists:service_packages,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $package = ServicePackage::findOrFail($request->service_package_id);

        $order = Order::create([
            'user_id' => auth()->id() ?? 1, // Fallback for dev if needed, replace with real auth
            'service_package_id' => $request->service_package_id,
            'payment_method_id' => $request->payment_method_id,
            'amount' => $package->price,
            'status' => 'pending',
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $order,
            'message' => 'Order created successfully',
        ]);
    }

    public function uploadProof(Request $request, $uuid)
    {
        $order = Order::where('uuid', $uuid)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'payment_proof' => 'required|image|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $order->addMediaFromRequest('payment_proof')
            ->toMediaCollection('payment_proof');

        return response()->json([
            'status' => 'success',
            'message' => 'Payment proof uploaded successfully',
        ]);
    }
}
