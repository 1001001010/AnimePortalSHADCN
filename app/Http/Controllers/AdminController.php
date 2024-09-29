<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use App\Models\{Anime, Season, Episode, User};

class AdminController extends Controller {

    public function index() {
        return Inertia::render('AdminPanel', [
            'Anime'=>Anime::get(),
            'Seasons'=>Season::get(),
            'Episode'=>Episode::get(),
            'user'=>User::get()
        ]);
    }

    public function new_anime(Request $request) {

        $validated = $request->validate([
            'age' => 'required|in:0,6,12,16,18',
            'status' => 'required|in:ongoing,came_out,preview',
            'name' => 'required|string',
            'type' => 'required|string',
            'original' => 'required|string',
            'studio' => 'required|string',
            'voice' => 'required|string',
            'director' => 'required|string',
            'autor' => 'required|string',
            'description' => 'required|string',
            'cover' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'screens' => 'required|array',
            'screens.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Работа с обложкой
        $cover_name = time() . "." . $request->cover->extension();
        $cover_path = $request->cover->storeAs('public/covers', $cover_name);
        $save_path = '/storage/covers/' . $cover_name; // убрал скобки

        $screens = [];
        foreach ($request->screens as $screen) {
            $screen_name = time() . "_" . uniqid() . "." . $screen->extension();
            $screen_path = $screen->storeAs('public/screens', $screen_name);
            $save_path_screen = '/storage/screens/' . $screen_name; // исправил переменную
            $screens[] = $save_path_screen;
        }
        $screens_json = json_encode($screens);

        // Создание новой записи в таблице animes
        $anime = new Anime();
        $anime->age = $validated['age'];
        $anime->status = $validated['status'];
        $anime->name = $validated['name'];
        $anime->unix = time();
        $anime->type = $validated['type'];
        $anime->original = $validated['original'];
        $anime->studio = $validated['studio'];
        $anime->voice = $validated['voice'];
        $anime->director = $validated['director'];
        $anime->autor = $validated['autor'];
        $anime->description = $validated['description'];
        $anime->cover = $save_path;
        $anime->screens = $screens_json;
        $anime->save();
    }

    public function new_season($anime_id, Request $request) {
        $request->validate([
            'name' => 'nullable|string|max:255',
        ]);

        $last_season_number = Season::where('anime_id', $anime_id)->max('number');
        if (is_null($last_season_number)) {
            $last_season_number = 0;
        }
        Season::create([
            'anime_id' => $anime_id,
            'number' => $last_season_number + 1,
            'name' => $request->input('name'),
        ]);

        return redirect()->back();
    }

    public function del_anime(Request $request) {
        $request->validate([
            'anime_id' => 'required|integer|min:1',
        ]);

        Anime::find($request->anime_id)->delete();
        return redirect()->back();
    }

    public function new_episode(Request $request) {
        // $validated = $request->validate([
        //     'season_id' => 'required|integer|exists:seasons,id',
        //     'file' => 'required|mimes:mp4'
        // ]);

        $name = time(). "." . $request->file->extension();
        $destination = 'public/episode';
        $save_path = 'episode/' . $name;
        $path = $request->file->storeAs($destination, $name);

        if (!$path) {
            return redirect()->back()->withErrors(['file' => 'Файл не был сохранен']);
        }

        $season = Season::find($request->season_id);
        $episodeCount = Episode::where('season_id', $request->season_id)->count();
        $episodeNumber = $episodeCount + 1;

        $video = [
            'season_id' => $request->season_id,
            'video' => $save_path,
            'number' => $episodeNumber
        ];

        $episode = Episode::create($video);

        if (!$episode) {
            return redirect()->back()->withErrors(['episode' => 'Эпизод не был создан']);
        }

        return redirect()->back();
    }
    public function edit_season(Request $request) {
        $seasons = $request->input('seasons');

        foreach ($seasons as $season) {
            $seasonModel = Season::find($season['id']);
            $seasonModel->number = $season['number'];
            $seasonModel->save();
        }

        return redirect()->back();
    }

    public function download_logs() {
        /**
        * Скачивание логов сервера
        *
        * return скачивание файла 'laravel.log'
        */
        $logfile = storage_path('logs/laravel.log');
        if (file_exists($logfile)) {
            return response()->download($logfile, 'laravel.log');
        } else {
            return redirect()->back()->with('success', 'Файл логов не найден');
        }
    }

    public function edit_anime(Request $request) : RedirectResponse {
        /**
         * Обновление информации об аниме
         *
         */
        $validated = $request->validate([
            'anime_id' => 'required|integer|min:1',
            'age' => 'required|in:0,6,12,16,18',
            'status' => 'required|in:ongoing,came_out,preview',
            'name' => 'required|string',
            'type' => 'required|string',
            'original' => 'required|string',
            'studio' => 'required|string',
            'voice' => 'required|string',
            'director' => 'required|string',
            'autor' => 'required|string',
            'description' => 'required|string',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $anime = Anime::find($validated['anime_id']);

        // Обновляем поля, которые были изменены
        $fields = [
            'age',
            'status',
            'name',
            'type',
            'original',
            'studio',
            'voice',
            'director',
            'autor',
            'description',
        ];

        foreach ($fields as $field) {
            if ($request->has($field) && $request->input($field) !== $anime->{$field}) {
                $anime->{$field} = $request->input($field);
            }
        }

        if ($request->hasFile('cover')) {
            $cover_name = time() . "." . $request->cover->extension();
            $cover_path = $request->cover->storeAs('public/covers', $cover_name);
            $save_path = '/storage/covers/' . $cover_name;
            $anime->cover = $save_path;
            $anime->save();
        }

        $anime->save();

        return back();
    }

    public function episode_delete(Request $request) : RedirectResponse {
        $episode = Episode::with('season')->findOrFail($request->episode_id);
        $anime_info = Anime::find($episode->season->anime_id);
        $next_episodes = Episode::where('season_id', $episode->season->id)->where('number', '>', $episode->number)->get();
        $episode->delete();
        if (count($next_episodes) > 0) {
            foreach ($next_episodes as $next_episode) {
                $next_episode->number -= 1;
                $next_episode->save();
            }
            return redirect()->back();
        } else {
            return redirect(route('anime', [
                'anime_id' => $anime_info->unix
            ]));
        }
    }
}
