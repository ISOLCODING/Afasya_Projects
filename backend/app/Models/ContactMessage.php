<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContactMessage extends Model
{
    use HasUuid;

    protected $fillable = [
        'uuid',
        'name',
        'email',
        'phone',
        'company',
        'job_title',
        'service_id',
        'budget_range',
        'project_deadline',
        'project_description',
        'message',
        'status',
        'source',
        'priority',
        'ip_address',
        'user_agent',
        'referrer_url',
        'page_url',
        'assigned_to',
        'response_note',
        'responded_at',
        'response_channel',
        'follow_up_date',
        'follow_up_notes',
    ];

    protected $casts = [
        'responded_at' => 'datetime',
        'follow_up_date' => 'date',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(ContactAttachment::class, 'contact_id');
    }
}
