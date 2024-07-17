<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Auth;

class FriendsController extends Controller
{
    public function index() {
        $id = Auth::user()->id;
        $random_users = User::where('id', '<>', $id)->inRandomOrder()->get();
    
        return Inertia::render('Friends', [
            'users' => $random_users,
        ]);
    }

    public function add_friends(Request $request)
    {
        dd($request);
    }
}
