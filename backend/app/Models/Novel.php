<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Novel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'synopsis',
        'status',
        'author',        
        'categories',
        'tags',
        'cover_path',
        'chapter_count',
    ];

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
}
