<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Anime, Friendship};
use Inertia\Inertia;
use Auth;

class MainController extends Controller
{
    public function index(): \Inertia\Response {
        $NewsItem = Anime::latest('updated_at')->take(15)->get();
        return Inertia::render('Welcome', [
            'NewAnime' => $NewsItem,
            ]);
    }

    public function anime($anime_id, $season_id = null, $episode_id = null): \Inertia\Response {
        $anime = Anime::where('unix', $anime_id)->firstOrFail();
        $seasons = $anime->seasons()->with('episodes')->get();
    
        $currentEpisode = null;
        if ($season_id && $episode_id) {
            $currentEpisode = $anime->seasons()->where('number', $season_id)
                ->firstOrFail()
                ->episodes()
                ->where('number', $episode_id)
                ->firstOrFail();
        }
    
        return Inertia::render('AnimePage', [
            'Anime' => $anime,
            'seasons' => $seasons,
            'currentEpisode' => $currentEpisode,
        ]);
    }

    public function favorites($anime_id) {
        dd($anime_id);
    }
}