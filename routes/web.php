<?php

use App\Http\Controllers\{ProfileController, FriendsController,
                          AnalyticsController, SessionController,
                          MainController, AdminController,
                          GroupController};
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\{IsAdmin, ShareRequestMiddleware};
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;


Route::middleware([ShareRequestMiddleware::class])->group(function () {
    Route::controller(App\Http\Controllers\MainController::class)->group(function () {
        Route::get('/','index')->name('index');
        Route::post('/','filter')->name('index.filter');
        Route::get('/anime/random','random_anime')->name('anime.random');
        Route::get('/anime/view/{anime_id}/{season_id?}/{episode_id?}','anime')->whereNumber(['anime_id', 'season_id', 'episode_id'])->name('anime');
        Route::post('anime/grade','grade')->name('anime.grade')->middleware('auth');
    });

    Route::group(['middleware' => 'auth'], function () {
        Route::controller(App\Http\Controllers\FriendsController::class)->group(function () {
            Route::get('friends','index')->name('friends.index');
            Route::post('friends/add','add_friends')->name('friends.add');
            Route::post('friends/status','edit_status')->name('friends.status');
        });
        Route::controller(App\Http\Controllers\SessionController::class)->group(function () {
            Route::post('/profile/session/destroy','destroy_session')->name('session.destroy');
        });
        Route::controller(App\Http\Controllers\FavouriteController::class)->group(function () {
            Route::get('/favourites','favourites')->name('favourite.index');
            Route::get('/favourite/add/{anime_id}','add_favourites')->where('anime_id', '[0-9]+')->name('favourite.add');
            Route::delete('/favourite', 'destroy')->name('favourite.destroy');
        });
        Route::controller(App\Http\Controllers\ProfileController::class)->group(function () {
            Route::get('/notifications', 'notifications')->name('notifications');
            Route::get('/profile/edit', 'edit')->name('profile.edit');
            Route::patch('/profile', 'update')->name('profile.update');
            Route::post('/profile/photo', 'photo')->name('profile.photo');
            Route::delete('/profile', 'destroy')->name('profile.destroy');
            Route::get('/profile/{user_id?}', 'index')->whereNumber('user_id')->name('profile');
        });

        Route::middleware(IsAdmin::class)->group(function () {
            Route::get('/analytics', [AnalyticsController::class, 'analytics'])->name('analytics.index');
            Route::controller(App\Http\Controllers\AdminController::class)->group(function () {
                Route::get('/admin', 'index')->name('adminPanel.index');
                Route::post('/admin/anime/new', 'new_anime')->name('NewAnime');
                Route::post('/admin/anime/edit', 'edit_anime')->name('anime.edit');
                Route::delete('/admin/anime/episode/delete', 'episode_delete')->name('anime.episode.delete');
                Route::delete('/admin/anime/delete', 'anime_delete')->name('DelAnime');
                Route::post('/admin/{anime_id}/season', 'new_season')->whereNumber('anime_id')->name('NewSeason');
                Route::post('/admin/season/edit', 'edit_season')->name('EditSeason');
                Route::post('/admin/new/episode', 'new_episode')->name('NewEpisode');
                Route::get('/admin/logs/download','download_logs')->name('DownloadsLogs');
            });
        });
    });
});

require __DIR__.'/auth.php';
