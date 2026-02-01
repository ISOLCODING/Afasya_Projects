<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServicePackage extends Model
{
    

    protected $fillable = [
        'service_id',
        'package_name',
        'price',
        'description',
        'included_features',
        'excluded_features',
        'delivery_days',
        'is_popular',
        'display_order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'included_features' => 'array',
        'excluded_features' => 'array',
        'delivery_days' => 'integer',
        'is_popular' => 'boolean',
        'display_order' => 'integer',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
