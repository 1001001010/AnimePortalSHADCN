<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword'=>Route::has('password.request'),
            'status'=>session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request) {
        $user = User::where('email', $request->input('email'))->first();
        if ($user && $user->regist_method == 'yandex') {
            return inertia('Auth/Login', ['ErrorMsg' => 'Пожалуйста, используйте Yandex для входа']);
        }

        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('index', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Редирект на авторизацию яндекса.
     */
    public function RedirectYandex(): RedirectResponse {
        return Socialite::driver('yandex')->redirect();
    }

    /**
     *получаем токен яндекса
     */
    public function CallbackYandex() {
        $user = Socialite::driver('yandex')->user();
        $info = $this->RegOrUser($user);
        if ($info === 'default') {
            return inertia('Auth/Login', ['ErrorMsg' => 'Пожалуйста, используйте Email и пароль для входа']);
        } else {
            return redirect()->route('index');
        }
    }

    /**
     * Зареган ли юзер
     */
    private function RegOrUser($user) {
        $existingUser = User::where('email', $user->email)->first();
        if (!$existingUser) {
            $name = time(). ".". 'png';
            $destination = 'public/avatars/';
            $imageData = file_get_contents($user->avatar);
            $info = file_put_contents('storage/avatars/' . $name, $imageData);
            $newUser = User::create([
                'name'=>$user->name,
                'email'=>$user->email,
                'unix'=>time(),
                'profile_image'=>'storage/avatars/' . $name,
                'password'=>Hash::make(Str::uuid()),
                'regist_method'=>'yandex'
            ]);

            Auth::login($newUser);
        } else {
            if ($existingUser->regist_method!='yandex'){
                return $error = 'default';
            } else {
                Auth::login($existingUser);
            }
        }
    }
}

