<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Grops, GroupMembers, Anime};
use Illuminate\Support\Facades\Hash;
use Auth;

class GroupController extends Controller
{
    public function create(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string|min:3',
            'anime' => 'required|integer'
        ]);

        $group = Grops::create([
            'name' => $request->name,
            'unix' => time(),
            'password' => Hash::make($request->password),
            'anime_id' => $request->anime
        ]);

        $user = Auth::user();
        $existingMembership = GroupMembers::where('user_id', $user->id)->first();

        if ($existingMembership) {
            $existingMembership->update(['group_id' => $group->id]);
        } else {
            GroupMembers::create([
                'group_id' => $group->id,
                'user_id' => $user->id
            ]);
        }
        $anime = Anime::findOrFail($request->anime);
        return redirect(route('anime', [
            'anime_id' => $anime->unix,
            'season_id' => 1,
            'episode_id' => 1,
            'group_id' => $group->unix
        ]));
    }
}
