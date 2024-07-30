<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anime extends Model
{
    use HasFactory;

    protected $fillable = [
        'age',
        'status',
        'name',
        'type',
        'original',
        'studio',
        'voice',
        'director',
        'autor',
        'description',
        'grade',
        'cover',
        'screens',
    ];

    public function seasons(): HasMany
    {
        return $this->hasMany(Season::class);
    }
}
