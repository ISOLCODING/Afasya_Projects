<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamExpertise extends Model
{
    

    protected $table = 'team_expertise';

    protected $fillable = [
        'team_id',
        'expertise_name',
        'icon',
        'proficiency_level',
        'display_order',
        'years_experience',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'years_experience' => 'decimal:1',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
