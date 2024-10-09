<?php

namespace App\Http\Controllers;

use App\Events\NotificationDisplayedEvent;
use Illuminate\Http\Request;
use App\Models\{User, Friendship, Friend};
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Auth;

class FriendsController extends Controller
{
    public function index(): \Inertia\Response {
        $id = Auth::user()->id;
        $friend_list = Friend::with('user')->with('friend')->where('user_id', $id)->orWhere('friend_id', $id)->get();
        $friend_ids = $friend_list->pluck('user_id')->merge($friend_list->pluck('friend_id'))->unique()->filter(function ($value) use ($id) {
            return $value != $id;
        });

        return Inertia::render('Friends', [
            'users' => User::where('id', '<>', $id)->whereNotIn('id', $friend_ids)->inRandomOrder()->get(),
            'request' => Friendship::where('user_id', $id)->get(),
            'friend_list' => $friend_list
        ]);
    }

    public function add_friends(Request $request) {
        $validatedData = $request->validate([
            'friend_id' => 'required|integer',
        ]);

        $user_id = auth()->id();
        $friend_id = $request->input('friend_id');

        if (Friendship::where('user_id', $user_id)->where('friend_id', $friend_id)->exists()) {
            return redirect()->back()->with('error', 'You are already friends with this user.');
        }

        $friendship = new Friendship();
        $friendship->user_id = $user_id;
        $friendship->friend_id = $friend_id;
        $friendship->save();

        try {
            event(new NotificationDisplayedEvent($friendship));
        } catch (\Exception $e) {
            Log::error('Failed to dispatch event: ' . $e->getMessage());
            return redirect()->back();
        }

        return redirect()->back();
    }

    public function edit_status(Request $request): RedirectResponse {
        $validatedData = $request->validate([
            'status' => 'required|in:accepted,declined',
            'user_id' => 'required|integer',
            'friend_id' => 'required|integer',
        ]);

        if ($request->status == 'accepted') {
            Friendship::where('user_id', $request->user_id)
                ->where('friend_id', $request->friend_id)
                ->delete();
            Friend::create([
                'user_id' => $request->user_id,
                'friend_id' => $request->friend_id,
            ]);
        } elseif ($request->status == 'declined') {
            Friendship::where('user_id', $request->user_id)
                ->where('friend_id', $request->friend_id)
                ->delete();
        }

        return redirect()->back();
    }
}
