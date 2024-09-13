<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Redirect};
use App\Models\{Anime, Friendship, Rating, Favourite, Episode};
use Inertia\Inertia;

class HelperController extends Controller
{
    public function renderAnimePage($anime, $season_id = null, $episode_id = null): \Inertia\Response {
        $seasons = $anime->seasons()->with('episodes')->get();

        $episodeInfo = null;
        if ($season_id && $episode_id) {
            $currentEpisodeObject = $anime->seasons()->where('seasons.number', $season_id)
                ->firstOrFail()
                ->episodes()
                ->where('episodes.number', $episode_id)
                ->firstOrFail();

            $episodeInfo = [
                'current' => $currentEpisodeObject,
                'previous' => $anime->episodes()
                    ->where('season_id', $currentEpisodeObject->season_id)
                    ->where('episodes.number', '<', $currentEpisodeObject->number)
                    ->orderBy('episodes.number', 'desc')
                    ->first(),
                'next' => $anime->episodes()
                    ->where('season_id', $currentEpisodeObject->season_id)
                    ->where('episodes.number', '>', $currentEpisodeObject->number)
                    ->orderBy('episodes.number', 'asc')
                    ->first(),
            ];

            if (!$episodeInfo['next']) {
                $nextSeason = $anime->seasons()->where('number', '>', $currentEpisodeObject->season->number)->orderBy('number', 'asc')->first();
                if ($nextSeason) {
                    $episodeInfo['next'] = $nextSeason->episodes()->orderBy('number', 'asc')->first();
                }
            }

            if ($episodeInfo['next']) {
                $episodeInfo['next']->load('season');
            }

            if (!$episodeInfo['previous']) {
                $previousSeason = $anime->seasons()->where('number', '<', $currentEpisodeObject->season->number)->orderBy('number', 'desc')->first();
                if ($previousSeason) {
                    $episodeInfo['previous'] = $previousSeason->episodes()->orderBy('number', 'desc')->first();
                }
            }

            if ($episodeInfo['previous']) {
                $episodeInfo['previous']->load('season');
            }
        }

        $user = Auth::user();
        $userInfo = $user ? [
            'rating' => Rating::where('user_id', $user->id)
                ->where('anime_id', $anime->id)
                ->first(),
            'favourite' => Favourite::where('user_id', $user->id)
                ->where('anime_id', $anime->id)
                ->first(),
        ] : null;

        return Inertia::render('AnimePage', [
            'favourite' => $userInfo ? $userInfo['favourite'] : null,
            'Anime' => $anime,
            'seasons' => $seasons,
            'currentEpisode' => $episodeInfo ? $episodeInfo['current'] : null,
            'nextEpisode' => $episodeInfo ? [
                'episode' => $episodeInfo['next'],
                'seasonNumber' => $episodeInfo['next'] ? $episodeInfo['next']->season->number : null,
            ] : null,
            'previousEpisode' => $episodeInfo ? [
                'episode' => $episodeInfo['previous'],
                'seasonNumber' => $episodeInfo['previous'] ? $episodeInfo['previous']->season->number : null,
            ] : null,
            'userRating' => $userInfo ? ($userInfo['rating'] ? $userInfo['rating']->rating : null) : null,
            'averageRating' => round(Rating::where('anime_id', $anime->id)->avg('rating'), 1),
            'episode_count' => $seasons->pluck('episodes')->collapse()->count(),
            'Host' => env('APP_URL')
        ]);
    }

}
