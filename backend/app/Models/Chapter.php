<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    // <-- Adicione isto:
    protected $fillable = [
        'novel_id',
        'number',
        'title',
        'context',
        'published_at',
    ];

    public function novel()
    {
        return $this->belongsTo(Novel::class);
    }
}
