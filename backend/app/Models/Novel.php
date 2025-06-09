<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Novel extends Model
{
    protected $fillable = [
        'title',
        'author',
        'description',
        'slug',
        'cover_path',
        'epub_path',
    ];
}
