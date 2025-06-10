<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Novel extends Model
{
    protected $fillable = [
        'title',
        'synopsis',
        'status',
        'categories',
        'cover_path',
        'chapter_count',
        'added_at',
    ];
}
