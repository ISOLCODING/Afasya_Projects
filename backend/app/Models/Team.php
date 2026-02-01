<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Team extends Model implements HasMedia
{
    use HasUuid, InteractsWithMedia;

    protected $fillable = [
        'uuid',
        'name',
        'position',
        'bio',
        'short_bio',
        'photo',
        'email',
        'phone',
        'linkedin_url',
        'github_url',
        'portfolio_url',
        'twitter_url',
        'experience_years',
        'display_order',
        'is_active',
        'join_date',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'experience_years' => 'integer',
        'display_order' => 'integer',
        'is_active' => 'boolean',
        'join_date' => 'date',
    ];

    public function expertises(): HasMany
    {
        return $this->hasMany(TeamExpertise::class)->orderBy('display_order');
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
        $this->addMediaCollection('team_photos')
            ->singleFile();
    }
}
