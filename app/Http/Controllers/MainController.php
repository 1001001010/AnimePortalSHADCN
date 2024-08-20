<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\{Anime, Friendship, Rating, Favourite};
use Inertia\Inertia;
use Auth;

class MainController extends Controller
{
    public function index() : \Inertia\Response {
        return Inertia::render('Welcome', [
            'NewAnime' => Anime::latest('updated_at')->take(15)->get(),
            'AllItems' => Anime::orderBy('name', 'asc')->get()
            ]);
    }

    public function anime($anime_id, $season_id = null, $episode_id = null) :\Inertia\Response {
        return $this->renderAnimePage(Anime::where('unix', $anime_id)->firstOrFail(), $season_id, $episode_id);
    }
    
    public function random_anime() : \Inertia\Response {
        return $this->renderAnimePage(Anime::get()->random());
    }
    
    private function renderAnimePage($anime, $season_id = null, $episode_id = null) : \Inertia\Response {
        $seasons = $anime->seasons()->with('episodes')->get();
    
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

        return Inertia::render('AnimePage', [
            'favourite' => Favourite::where('user_id', Auth::user()->id)->where('anime_id', $anime->id)->first(),
            'Anime' => $anime,
            'seasons' => $seasons,
            'currentEpisode' => $currentEpisode,
            'userRating' => $rating ? $rating->rating : null,
            'averageRating' => round(Rating::where('anime_id', $anime->id)->avg('rating'), 1),
            'episode_count' => $seasons->pluck('episodes')->collapse()->count()
        ]);
    }

    public function grade(Request $request) : RedirectResponse {
        $request->validate([
            'anime' => 'required|exists:animes,id',
            'rating' => 'required|in:1,2,3,4,5',
        ]);
    
        Rating::updateOrCreate(
            ['user_id' => Auth::user()->id, 'anime_id' => $request->input('anime')],
            ['rating' => $request->input('rating')]
        );
    
        return redirect()->back();
    }
}