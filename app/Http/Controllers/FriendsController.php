<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class FriendsController extends Controller
{
    public function friends() {
        $random_users = User::inRandomOrder()->limit(15)->get();
    
        return Inertia::render('Friends', [
            'users' => $random_users,
        ]);
    }
}
