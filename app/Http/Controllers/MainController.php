<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\{Auth, Redirect};
use App\Models\{Anime, Friendship, Rating, Favourite, Episode};
use Inertia\Inertia;

class MainController extends Controller
{
    public function index(): \Inertia\Response {
        return Inertia::render('Welcome', [
            'NewAnime' => Anime::latest('updated_at')->take(15)->get(),
            'AllItems' => Anime::orderBy('name', 'asc')->get()
        ]);
    }

    public function anime($anime_id, $season_id = null, $episode_id = null): \Inertia\Response {
        return $this->renderAnimePage(Anime::where('unix', $anime_id)->firstOrFail(), $season_id, $episode_id);
    }

    public function random_anime(): \Inertia\Response {
        return $this->renderAnimePage(Anime::get()->random());
    }

    private function renderAnimePage($anime, $season_id = null, $episode_id = null): \Inertia\Response {
        $seasons = $anime->seasons()->with('episodes')->get();

        $nextEpisode = null;
        $previousEpisode = null;
        $currentEpisode = null;
        if ($season_id && $episode_id) {
            $currentEpisode = $anime->seasons()->where('number', $season_id)
                ->firstOrFail()
                ->episodes()
                ->where('number', $episode_id)
                ->firstOrFail();

            $nextEpisodeQuery = $anime->seasons()->where('number', '>=', $season_id)
                ->orderBy('number', 'asc')
                ->with('episodes', 'episodes.season')
                ->get()
                ->flatMap(function ($season) use ($episode_id) {
                    return $season->episodes->where('number', '>', $episode_id);
                })
                ->sortBy('number')
                ->first();

            $previousEpisodeQuery = $anime->seasons()->where('number', '<=', $season_id)
                ->orderBy('number', 'desc')
                ->with('episodes', 'episodes.season')
                ->get()
                ->flatMap(function ($season) use ($episode_id) {
                    return $season->episodes->where('number', '<', $episode_id);
                })
                ->sortByDesc('number')
                ->first();

            $nextEpisode = $nextEpisodeQuery ? $nextEpisodeQuery : null;
            if ($nextEpisode && $nextEpisode->season_id !== $currentEpisode->season_id ) {
                $nextEpisode = Episode::with('season')->where('season_id', $nextEpisode->season_id)->where('number', 1)->first();
            }
            $previousEpisode = $previousEpisodeQuery ? $previousEpisodeQuery : null;
            // dd($previousEpisode);
            // dd($previousEpisode->season_id);
            if ($currentEpisode->number == 2) {
                $previousEpisode = Episode::with('season')->where('season_id', $currentEpisode->season_id)->where('number', 1)->first();
            } elseif ($currentEpisode->number == 1) {
                $previousSeason = $anime->seasons()->where('number', '<', $currentEpisode->season->number)->orderBy('number', 'desc')->first();
                if ($previousSeason) {
                    $maxNumber = Episode::where('season_id', $previousSeason->id)->max('number');
                    $previousEpisode = Episode::with('season')->where('season_id', $previousSeason->id)->where('number', $maxNumber)->first();
                } else {
                    $previousEpisode = null;
                }
            }
        }

        if (Auth::user()) {
            $user_id = Auth::user()->id;
            $rating = Rating::where('user_id', $user_id)
                ->where('anime_id', $anime->id)
                ->first();
            $favourite = Favourite::where('user_id', Auth::user()->id)->where('anime_id', $anime->id)->first();
        } else {
            $rating = null;
            $favourite = null;
        }

        return Inertia::render('AnimePage', [
            'favourite' => $favourite,
            'Anime' => $anime,
            'seasons' => $seasons,
            'currentEpisode' => $currentEpisode,
            'nextEpisode' => $nextEpisode,
            'previousEpisode' => $previousEpisode,
            'userRating' => $rating ? $rating->rating : null,
            'averageRating' => round(Rating::where('anime_id', $anime->id)->avg('rating'), 1),
            'episode_count' => $seasons->pluck('episodes')->collapse()->count()
        ]);
    }

    public function grade(Request $request): RedirectResponse {
        $request->validate([
            'anime' => 'required|exists:animes,id',
            'rating' => 'required|in:1,2,3,4,5',
        ]);

        Rating::updateOrCreate(
            ['user_id' => Auth::user()->id, 'anime_id' => $request->input('anime')],
            ['rating' => $request->input('rating')]
        );

        return Redirect::route('anime', [
            'anime_id' => Anime::find($request->input('anime'))->unix,
        ]);
    }

    public function filter(Request $request) {
        $request->validate([
            'name' => 'nullable|string',
            'type' => 'nullable|in:TV,Film,speshl,OVA',
            'status' => 'nullable|in:ongoing,came_out,preview',
        ]);

        $anime = Anime::query();

        if ($request->has('name')) {
            $anime->when($request->input('name'), function ($query, $name) {
                $query->where('name', 'like', '%' . $name . '%');
            });
        }

        if ($request->has('type')) {
            $anime->when($request->input('type'), function ($query, $type) {
                $query->where('type', $type);
            });
        }

        if ($request->has('status')) {
            $anime->when($request->input('status'), function ($query, $status) {
                $query->where('status', $status);
            });
        }

        $results = $anime->get();

        return Inertia::render('Welcome', [
            'NewAnime' => Anime::latest('updated_at')->take(15)->get(),
            'AllItems' => $results
        ]);
    }
}
