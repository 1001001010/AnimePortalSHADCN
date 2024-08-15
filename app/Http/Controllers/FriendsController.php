<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{User, Friendship};
use Inertia\Inertia;
use Auth;

class FriendsController extends Controller
{
    public function index() {
        $id = Auth::user()->id;
        $random_users = User::where('id', '<>', $id)->inRandomOrder()->get();
        $request = Friendship::where('user_id', $id)->get();
    
        return Inertia::render('Friends', [
            'users' => $random_users,
            'request' => $request
        ]);
    }

    public function add_friends(Request $request) {
        $user_id = auth()->id ();
        $friend_id = $request->input('friend_id');
    
        if (Friendship::where('user_id', $user_id)->where('friend_id', $friend_id)->exists()) {
            return redirect()->back()->with('error', 'You are already friends with this user.');
        }
    
        $friendship = new Friendship();
        $friendship->user_id = $user_id;
        $friendship->friend_id = $friend_id;
        $friendship->save();
    
        return redirect()->back();
    }
}
