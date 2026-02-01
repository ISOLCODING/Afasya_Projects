<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteSetting extends Model
{
    use HasUuid;

    protected $fillable = [
        'uuid',
        'key',
        'value',
        'type',
        'data_type',
        'group_name',
        'subgroup',
        'label',
        'description',
        'placeholder',
        'options',
        'validation_rules',
        'display_order',
        'is_public',
        'is_required',
        'is_encrypted',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'options' => 'array',
        'display_order' => 'integer',
        'is_public' => 'boolean',
        'is_required' => 'boolean',
        'is_encrypted' => 'boolean',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
