<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class ContentPage extends Model implements HasMedia
{
    use HasUuid, HasSlug, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'content',
        'excerpt',
        'page_type',
        'template',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_image',
        'is_published',
        'is_in_menu',
        'menu_order',
        'view_count',
        'parent_id',
        'created_by',
        'updated_by',
        'published_at',
    ];

    protected $casts = [
        'content' => 'array',
        'is_published' => 'boolean',
        'is_in_menu' => 'boolean',
        'menu_order' => 'integer',
        'view_count' => 'integer',
        'published_at' => 'datetime',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(ContentPage::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(ContentPage::class, 'parent_id')->orderBy('menu_order');
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
        $this->addMediaCollection('page_images');
        
        $this->addMediaCollection('og_images')
            ->singleFile();
    }
}
