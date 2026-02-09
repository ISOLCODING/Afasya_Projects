<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Project;
use App\Models\ServicePackage;
use App\Models\User;
use App\Models\UserPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends ApiController
{
    /**
     * Create an order from the AI Assistant.
     * Path A: Consultation (status: inquiry)
     * Path B: Purchase (status: pending_payment)
     */
    public function storeFromAssistant(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_whatsapp' => 'required|string|max:20',
            'company' => 'nullable|string|max:255',
            'path' => 'required|in:consultation,purchase',
            'service_package_id' => 'required_if:path,purchase|exists:service_packages,id',
            'payment_method_id' => 'nullable|exists:payment_methods,id',
            'note' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation error', 422, $validator->errors());
        }

        try {
            return DB::transaction(function () use ($request) {
                // 1. Find or Create User based on email
                $user = auth('sanctum')->user() ?: User::where('email', $request->client_email)->first();

                if (!$user) {
                    $user = User::create([
                        'name' => $request->client_name,
                        'email' => $request->client_email,
                        'phone' => $request->client_whatsapp,
                        'password' => Hash::make(Str::random(12)), // Random password, can be reset later
                    ]);
                    // Assign default role if needed (e.g., client)
                    if (method_exists($user, 'assignRole')) {
                        try {
                            $user->assignRole('client');
                        } catch (\Exception $e) {
                        }
                    }
                }

                // 2. Prepare Order Data
                $orderData = [
                    'client_name' => $request->client_name,
                    'client_email' => $request->client_email,
                    'client_whatsapp' => $request->client_whatsapp,
                    'company' => $request->company,
                    'note' => $request->note,
                    'user_id' => $user->id,
                    'status' => $request->path === 'consultation' ? 'inquiry' : 'pending_payment',
                ];

                if ($request->path === 'purchase') {
                    $package = ServicePackage::findOrFail($request->service_package_id);
                    $orderData['service_package_id'] = $package->id;
                    $orderData['amount'] = $package->price;
                    $orderData['payment_method_id'] = $request->payment_method_id;
                }

                // 3. Create Order
                $order = Order::create($orderData);

                return $this->success($order, 'Order processed successfully');
            });
        } catch (\Exception $e) {
            return $this->error('Failed to process order', 500, ['error' => $e->getMessage()]);
        }
    }

    /**
     * Upload payment proof and automatically activate Project & UserPackage.
     */
    public function uploadProof(Request $request, $uuid)
    {
        $order = Order::where('uuid', $uuid)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'payment_proof' => 'required|image|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return $this->error('Validation error', 422, $validator->errors());
        }

        try {
            return DB::transaction(function () use ($request, $order) {
                // 1. Save Media
                $order->addMediaFromRequest('payment_proof')
                    ->toMediaCollection('payment_proof');

                // 2. Update Order Status
                $order->update(['status' => 'paid']);

                // 3. Automatically Create Project
                $package = $order->servicePackage;
                $service = $package->service;

                $project = Project::create([
                    'order_id' => $order->id,
                    'user_id' => $order->user_id,
                    'service_id' => $service->id,
                    'name' => "PROJECT: {$order->client_name} - {$package->package_name}",
                    'description' => $package->description,
                    'status' => 'active',
                    'progress' => 0,
                    'total_budget' => $order->amount,
                    'start_date' => now(),
                    'due_date' => now()->addDays($package->delivery_days ?? 7),
                ]);

                // 4. Automatically Create UserPackage (Entitlement)
                UserPackage::updateOrCreate(
                    ['order_id' => $order->id],
                    [
                        'user_id' => $order->user_id,
                        'service_package_id' => $package->id,
                        'status' => 'active',
                        'started_at' => now(),
                        'expired_at' => now()->addMonths(1), // Default 1 month access if subscription-based
                    ]
                );

                return $this->success([
                    'order' => $order,
                    'project' => $project
                ], 'Payment proof uploaded and everything activated!');
            });
        } catch (\Exception $e) {
            return $this->error('Failed to upload proof', 500, ['error' => $e->getMessage()]);
        }
    }

    /**
     * Standard store method
     */
    public function store(Request $request)
    {
        return $this->storeFromAssistant($request);
    }
}
