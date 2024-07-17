<?php

use App\Http\Controllers\{ProfileController, FriendsController, AnalyticsController, SessionController, MainController};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdmin;
use Inertia\Inertia;

Route::controller(App\Http\Controllers\MainController::class)->group(function () {
    Route::get('/','index')->name('index');
});

Route::group(['middleware' => 'auth'], function () {
    Route::controller(App\Http\Controllers\FriendsController::class)->group(function () {
        Route::get('friends','index')->name('friends.index');
    });
    Route::controller(App\Http\Controllers\SessionController::class)->group(function () {
        Route::get('/profile/session/{session_id}','destroy_session')->name('profile.session.destroy');
    });
    Route::controller(App\Http\Controllers\ProfileController::class)->group(function () {
        Route::get('/profile', 'index')->name('profile');
        Route::get('/profile/edit', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::post('/profile/photo', 'photo')->name('profile.photo');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

Route::middleware(IsAdmin::class)->group(function () {
    Route::get('/analytics', [AnalyticsController::class, 'analytics'])->name('analytics.index');
});

require __DIR__.'/auth.php';