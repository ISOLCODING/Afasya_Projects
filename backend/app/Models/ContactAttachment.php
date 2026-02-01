<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactAttachment extends Model
{
    

    protected $fillable = [
        'contact_id',
        'file_path',
        'file_name',
        'file_type',
        'file_size',
        'mime_type',
        'description',
        'download_count',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'download_count' => 'integer',
    ];

    public function contact(): BelongsTo
    {
        return $this->belongsTo(ContactMessage::class, 'contact_id');
    }
}
