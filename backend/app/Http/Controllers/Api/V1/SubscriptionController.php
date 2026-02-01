<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionController extends ApiController
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:subscriptions,email|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Error', 422, $validator->errors());
        }

        Subscription::create([
            'email' => $request->email,
            'status' => 'active',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'source' => 'website',
        ]);

        return $this->success(null, 'Thank you for subscribing to our newsletter!');
    }
}
