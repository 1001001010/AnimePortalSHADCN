<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\SessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdmin;
use Inertia\Inertia;

Route::middleware(IsAdmin::class)->group(function () {
    Route::get('/analytics', [AnalyticsController::class, 'analytics'])->name('analytics.index');
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('index');

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->middleware(['auth', 'verified'])->name('profile');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'photo'])->name('profile.photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::delete('/profile/session/{session_id}', [SessionController::class, 'destroy_session'])->name('profile.session.destroy');
});

Route::controller(App\Http\Controllers\FriendsController::class)->group(function () { 
    Route::get('friends','index')->name('friends.index')->middleware('auth');
});

Route::group(['middleware' => 'auth'], function () {
    Route::controller(App\Http\Controllers\FriendsController::class)->group(function () {
        Route::get('friends','index')->name('friends.index');
    });
});

require __DIR__.'/auth.php';
