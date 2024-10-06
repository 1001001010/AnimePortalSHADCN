<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupMembers extends Model
{
    use HasFactory;

    protected $fillable = ['group_id', 'user_id'];

    public function group()
    {
        return $this->belongsTo(Groups::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
