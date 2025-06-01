<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',          // precisa estar aqui
        'email',         // precisa estar aqui
        'password',      // precisa estar aqui
        'code',
        'expires_at',
    ];
}