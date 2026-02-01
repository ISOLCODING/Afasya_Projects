<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Post extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'user_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category',
        'tags',
        'status',
        'published_at',
        'views_count',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'content' => 'array',
        'tags' => 'array',
        'published_at' => 'datetime',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('post_images');
    }
}
