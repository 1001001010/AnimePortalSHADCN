<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Groups, GroupMembers, Anime};
use Illuminate\Support\Facades\Hash;
use App\Events\JoinGroupEvent;
use Auth;

class GroupController extends Controller
{
    public function create(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string|min:3',
            'anime' => 'required|integer',
            'method' => 'required'
        ]);

        $group = Groups::create([
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

    public function delete(Request $request) {
        $request->validate([
            'group_id' => 'required|integer|min:1',
            'method' => 'required'
        ]);
        $groupMember = GroupMembers::with('group')->where('id', $request->group_id)->first();
        if ($groupMember) {
            $groupMember->delete();
            $remainingMembers = GroupMembers::where('id', $request->group_id)->count();
            if ($remainingMembers == 0) {
                Groups::find($groupMember->group->id)->delete();
            }
        }

        return redirect(route('index'));
    }

    public function join(Request $request) {
        $request->validate([
            'group_id' => 'required|integer|min:1',
            'password' => 'required'
        ]);

        $group = Groups::with('anime')->find($request->group_id);
        if (!$group) {
            return redirect(route('index'));
        }

        if (!Hash::check($request->password, $group->password)) {
            return redirect()->back();
        }

        GroupMembers::create([
            'group_id' => $group->id,
            'user_id' => Auth::id()
        ]);

        event(new JoinGroupEvent($group->id, Auth::id()));

        return redirect(route('anime', [
            'anime_id' => $group->anime->unix,
            'season_id' => 1,
            'episode_id' => 1,
            'group_id' => $group->unix
        ]));
    }
}
