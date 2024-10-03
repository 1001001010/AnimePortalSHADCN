<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'cover',
        'screens',
    ];

    public function episodes()
    {
        return $this->hasManyThrough(Episode::class, Season::class);
    }

    public function seasons(): HasMany
    {
        return $this->hasMany(Season::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function favourites()
    {
        return $this->hasMany(Favourite::class);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }
}
