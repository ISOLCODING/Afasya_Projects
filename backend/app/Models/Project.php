<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasUuid, SoftDeletes;

    protected $fillable = [
        'uuid',
        'order_id',
        'user_id',
        'service_id',
        'service_package_id',
        'name',
        'status',
        'instructions',
        'specs',
        'due_date',
        'roadmap',
        'credentials',
    ];

    protected $casts = [
        'specs' => 'array',
        'roadmap' => 'array',
        'credentials' => 'array',
        'due_date' => 'date',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function servicePackage(): BelongsTo
    {
        return $this->belongsTo(ServicePackage::class);
    }
}
