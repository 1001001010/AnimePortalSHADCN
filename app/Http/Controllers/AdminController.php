<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Anime;

class AdminController extends Controller
{
    public function index() {
        return Inertia::render('AdminPanel');
    }

    public function new_anime(Request $request)
    {
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
        $anime->type = $validated['type'];
        $anime->original = $validated['original'];
        $anime->studio = $validated['studio'];
        $anime->voice = $validated['voice'];
        $anime->director = $validated['director'];
        $anime->autor = $validated['autor'];
        $anime->description = $validated['description'];
        $anime->grade = 0;
        $anime->cover = $save_path;
        $anime->screens = $screens_json;
        $anime->save();
    
        return redirect()->back()->with('success', 'Аниме успешно добавлено!');
    }
}
