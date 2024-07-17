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
use App\Models\User;

class ProfileController extends Controller
{
    public function index() {
        return Inertia::render('Profile');
    }

    public function edit(Request $request): Response {
            $activeSessions = ActiveSession::where('user_id', Auth::user()->id)->get();
            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'activeSession' => $activeSessions,
            ]);
    }
    
    public function update(ProfileUpdateRequest $request): RedirectResponse {
        $request->user()->fill($request->validated());
    
        $request->user()->save();
    
        return Redirect::route('profile.edit');
    }

    public function photo(Request $request) {
        if ($request->hasFile('photo')) {
            $validated = $request->validate([
                'photo' => 'required|image|mimes:jpg,png,jpeg|max:2048'
            ]);
            $user = User::where('id', Auth::user()->id)->first();
            $photoPath = $user->profile_image;
            if (file_exists($photoPath)) {
                // Если аватарка уже есть, то удаляем старое фото
                unlink($photoPath);
            }
            $name = time(). ".". $request->file('photo')->extension();
            $destination = 'public/avatars';
            $path = $request->file('photo')->storeAs($destination, $name);
            User::where('id', Auth::user()->id)->update([
                'profile_image' => 'storage/avatars/' . $name
            ]);
        }
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
