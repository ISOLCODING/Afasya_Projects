<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Client;
use Illuminate\Http\JsonResponse;

class ClientController extends ApiController
{
    public function index(): JsonResponse
    {
        $clients = Client::where('is_approved', true)
            ->where('is_featured', true)
            ->orderBy('display_order')
            ->get()
            ->map(fn($client) => [
                'name' => $client->name,
                'business' => $client->business_name,
                'testimonial' => $client->testimonial,
                'rating' => $client->rating,
                'photo' => $client->getFirstMediaUrl('client_photos'),
                'logo' => $client->getFirstMediaUrl('client_logos'),
            ]);

        return $this->success($clients);
    }
}
