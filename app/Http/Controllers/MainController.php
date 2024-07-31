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

    public function anime($anime_id): \Inertia\Response
    {
        $anime = Anime::where('unix', $anime_id)->firstOrFail();
        $seasons = $anime->seasons;
    
        return Inertia::render('AnimePage', [
            'Anime' => $anime,
            'seasons' => $seasons,
        ]);
    }
}