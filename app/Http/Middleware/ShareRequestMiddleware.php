<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Friendship;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Auth;

class ShareRequestMiddleware {
    public function handle(Request $request, Closure $next)
    {
        $friendship = $this->checkFriendship();
        Inertia::share('friendship', $friendship);
        return $next($request);
    }

    private function checkFriendship()
    {
        if (Auth::user()) {
            $info = Friendship::where('friend_id', Auth::user()->id)->exists();
            return $info ? true : false;
        }

        return false;
    }
}
