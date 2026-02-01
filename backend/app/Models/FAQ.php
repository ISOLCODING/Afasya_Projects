<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FAQ extends Model
{
    use HasUuid;

    protected $table = 'faqs';

    protected $fillable = [
        'uuid',
        'question',
        'answer',
        'category',
        'service_id',
        'display_order',
        'is_active',
        'view_count',
        'helpful_yes',
        'helpful_no',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_active' => 'boolean',
        'view_count' => 'integer',
        'helpful_yes' => 'integer',
        'helpful_no' => 'integer',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
