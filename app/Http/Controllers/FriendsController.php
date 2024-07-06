<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class FriendsController extends Controller
{
    public function index() {
        $random_users = User::inRandomOrder()->get();
    
        return Inertia::render('Friends', [
            'users' => $random_users,
        ]);
    }
}
