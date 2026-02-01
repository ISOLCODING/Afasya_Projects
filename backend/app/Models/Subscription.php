<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasUuid;

    protected $fillable = [
        'uuid',
        'email',
        'name',
        'phone',
        'preferences',
        'interests',
        'status',
        'is_verified',
        'source',
        'ip_address',
        'user_agent',
        'verification_token',
        'verification_sent_at',
        'verified_at',
        'unsubscribe_token',
        'emails_sent',
        'emails_opened',
        'emails_clicked',
        'last_engaged_at',
    ];

    protected $casts = [
        'preferences' => 'array',
        'interests' => 'array',
        'is_verified' => 'boolean',
        'verification_sent_at' => 'datetime',
        'verified_at' => 'datetime',
        'emails_sent' => 'integer',
        'emails_opened' => 'integer',
        'emails_clicked' => 'integer',
        'last_engaged_at' => 'datetime',
    ];
}
