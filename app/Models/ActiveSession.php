<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActiveSession extends Model
{
    protected $table = 'sessions'; // assuming your table name is active_sessions

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        // add other columns as needed
    ];
}