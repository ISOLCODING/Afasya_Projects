<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPackage extends Model
{
    protected $fillable = [
        'user_id',
        'service_package_id',
        'order_id',
        'status',
        'started_at',
        'expired_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'expired_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function servicePackage(): BelongsTo
    {
        return $this->belongsTo(ServicePackage::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' && 
               ($this->expired_at === null || $this->expired_at->isFuture());
    }
}
