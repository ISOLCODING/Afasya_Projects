<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Service extends Model implements HasMedia
{
    use HasUuid, HasSlug, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'uuid',
        'name',
        'slug',
        'icon',
        'short_description',
        'full_description',
        'price_min',
        'price_max',
        'currency',
        'delivery_time',
        'display_order',
        'is_featured',
        'is_active',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'view_count',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'full_description' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'price_min' => 'decimal:2',
        'price_max' => 'decimal:2',
        'view_count' => 'integer',
        'display_order' => 'integer',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function features(): HasMany
    {
        return $this->hasMany(ServiceFeature::class)->orderBy('display_order');
    }

    public function packages(): HasMany
    {
        return $this->hasMany(ServicePackage::class)->orderBy('display_order');
    }

    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class);
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(FAQ::class)->orderBy('display_order');
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
        $this->addMediaCollection('service_images')
            ->useFallbackUrl('/images/placeholder-service.jpg');
        
        $this->addMediaCollection('service_icon')
            ->singleFile();
    }
}
