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

class Portfolio extends Model implements HasMedia
{
    use HasUuid, HasSlug, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'client_name',
        'client_business',
        'category',
        'industry',
        'service_id',
        'client_id',
        'description',
        'challenge',
        'solution',
        'results',
        'tech_stack',
        'project_url',
        'github_url',
        'demo_url',
        'featured_image',
        'video_url',
        'status',
        'start_date',
        'completion_date',
        'launch_date',
        'views_count',
        'likes_count',
        'shares_count',
        'is_featured',
        'is_published',
        'show_in_showcase',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'created_by',
        'updated_by',
        'published_at',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'start_date' => 'date',
        'completion_date' => 'date',
        'launch_date' => 'date',
        'published_at' => 'datetime',
        'views_count' => 'integer',
        'likes_count' => 'integer',
        'shares_count' => 'integer',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'show_in_showcase' => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(PortfolioImage::class)->orderBy('display_order');
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
        $this->addMediaCollection('portfolio_covers')
            ->singleFile();
            
        $this->addMediaCollection('portfolio_gallery');
    }
}
