<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Client extends Model implements HasMedia
{
    use HasUuid, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'name',
        'email',
        'phone',
        'business_name',
        'business_type',
        'business_since',
        'employee_count',
        'testimonial',
        'rating',
        'project_type',
        'website_url',
        'photo',
        'logo',
        'is_featured',
        'is_approved',
        'display_order',
        'service_id',
        'portfolio_id',
        'created_by',
        'updated_by',
        'testimonial_date',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_featured' => 'boolean',
        'is_approved' => 'boolean',
        'display_order' => 'integer',
        'testimonial_date' => 'date',
        'business_since' => 'integer',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function portfolio(): BelongsTo
    {
        return $this->belongsTo(Portfolio::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('client_photos')
            ->singleFile();
        
        $this->addMediaCollection('client_logos')
            ->singleFile();
    }
}
