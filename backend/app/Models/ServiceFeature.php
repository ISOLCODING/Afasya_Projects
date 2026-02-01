<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceFeature extends Model
{
    

    protected $fillable = [
        'service_id',
        'feature_name',
        'description',
        'icon',
        'display_order',
    ];

    protected $casts = [
        'display_order' => 'integer',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
