<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Anime;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index(): \Inertia\Response {
        $NewsItem = Anime::latest('updated_at')->take(15)->get();
        return Inertia::render('Welcome', [
            'NewAnime' => $NewsItem
            ]);
    }

    public function anime($id): \Inertia\Response {
        $anime = Anime::findOrFail($id);
        return Inertia::render('AnimePage', [
            'Anime' => $anime 
        ]);
    }
}