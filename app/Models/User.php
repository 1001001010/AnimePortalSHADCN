<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use OwenIt\Auditing\Contracts\Auditable;

class User extends Authenticatable implements MustVerifyEmail, Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'unix',
        'email_verified_at',
        'profile_image',
        'regist_method',
        'created_at',
    ];

    public function friends()
    {
        return $this->hasMany(Friend::class);
    }

    public function friendships()
    {
        return $this->hasMany(Friendship::class);
    }

    public function friendsOf()
    {
        return $this->hasMany(Friend::class, 'friend_id');
    }

    public function friendshipsOf()
    {
        return $this->hasMany(Friendship::class, 'friend_id');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function favourites()
    {
        return $this->hasMany(Favourite::class);
    }

    public function groupMembers()
    {
        return $this->hasMany(GroupMember::class);
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
