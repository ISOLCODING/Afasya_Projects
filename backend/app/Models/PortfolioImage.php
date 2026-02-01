<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioImage extends Model
{
    

    protected $fillable = [
        'portfolio_id',
        'image_url',
        'alt_text',
        'caption',
        'display_order',
        'is_featured',
        'file_size',
        'mime_type',
        'dimensions',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_featured' => 'boolean',
        'file_size' => 'integer',
    ];

    public function portfolio(): BelongsTo
    {
        return $this->belongsTo(Portfolio::class);
    }
}
