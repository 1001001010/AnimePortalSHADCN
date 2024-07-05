<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ActiveSession;

class ProfileController extends Controller
{
    public function edit(Request $request): Response {
            $activeSessions = ActiveSession::where('user_id', Auth::user()->id)->get();
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'activeSession' => $activeSessions,
            ]);
    }
    
    public function update(ProfileUpdateRequest $request): RedirectResponse {
        // $validated = $request->validate([
        //     'profile_image' => 'image|mimes:jpg,png,jpeg|max:2048'
        // ]);
    
        $request->user()->fill($request->validated());
    
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $file = $request->file('profile_image');
    
        if ($file) {
            dd($request->all());
            $filename = time(). '.'. $request->file('profile_image')->extension();
            $destination = 'public/avatars';
            $request->file('profile_image')->storeAs($destination, $filename);
            $request->user()->profile_image = $filename;
        }
    
        $request->user()->save();
    
        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
