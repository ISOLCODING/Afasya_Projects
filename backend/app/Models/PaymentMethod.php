<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class PaymentMethod extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'type',
        'name',
        'number',
        'bank_name',
        'is_active',
        'display_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'display_order' => 'integer',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('qris_image')
            ->singleFile();
            
        $this->addMediaCollection('bank_logo')
            ->singleFile();
    }
}
