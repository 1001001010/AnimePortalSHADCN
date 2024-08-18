<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Anime, Friendship, Rating};
use Inertia\Inertia;
use Auth;

class MainController extends Controller
{
    public function index(): \Inertia\Response {
        $NewsItems = Anime::latest('updated_at')->take(15)->get();
        $AllItems = Anime::paginate(12);
        $anime = $AllItems->items();
        return Inertia::render('Welcome', [
            'NewAnime' => $NewsItems,
            'AllItems' => $anime
            ]);
    }

    public function anime($anime_id, $season_id = null, $episode_id = null) {
        $anime = Anime::where('unix', $anime_id)->firstOrFail();
        return $this->renderAnimePage($anime, $season_id, $episode_id);
    }
    
    public function random_anime(): \Inertia\Response
    {
        $anime = Anime::get()->random();
        return $this->renderAnimePage($anime);
    }
    
    private function renderAnimePage($anime, $season_id = null, $episode_id = null) {
        $seasons = $anime->seasons()->with('episodes')->get();
        $totalEpisodes = $seasons->pluck('episodes')->collapse()->count();
    
        $currentEpisode = null;
        if ($season_id && $episode_id) {
            $currentEpisode = $anime->seasons()->where('number', $season_id)
                ->firstOrFail()
                ->episodes()
                ->where('number', $episode_id)
                ->firstOrFail();
        }
    
        if (Auth::user()) {
            $user_id = Auth::user()->id;
            $rating = Rating::where('user_id', $user_id)
                ->where('anime_id', $anime->id)
                ->first();
        } else {
            $rating = null;
        }
    
        $userRating = $rating ? $rating->rating : null;
        $averageRating = round(Rating::where('anime_id', $anime->id)->avg('rating'), 1);
    
        return Inertia::render('AnimePage', [
            'Anime' => $anime,
            'seasons' => $seasons,
            'currentEpisode' => $currentEpisode,
            'userRating' => $userRating,
            'averageRating' => $averageRating,
            'episode_count' => $totalEpisodes
        ]);
    }
    
    public function favorites($anime_id) {
        dd($anime_id);
    }

    public function grade(Request $request) {
        $request->validate([
            'anime' => 'required|exists:animes,id',
            'rating' => 'required|in:1,2,3,4,5',
        ]);

        $user_id = Auth::user()->id;
        $anime_id = $request->input('anime');
        $rating_value = $request->input('rating');
    
        Rating::updateOrCreate(
            ['user_id' => $user_id, 'anime_id' => $anime_id],
            ['rating' => $rating_value]
        );
    
        return redirect()->back();
    }
}