<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groups extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'unix', 'password', 'anime_id'];

    public function anime()
    {
        return $this->belongsTo(Anime::class);
    }

    public function members()
    {
        return $this->hasMany(GroupMembers::class);
    }
}
