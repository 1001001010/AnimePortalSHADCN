<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Anime, Friendship, Rating,
                Favourite, Episode, GroupMembers,
                Groups};
use Illuminate\Support\Facades\{Auth, Redirect};
use Inertia\Inertia;

class HelperController extends Controller
{
    public function renderAnimePage($anime, $season_id = null, $episode_id = null, $group_id = null): \Inertia\Response {
        $seasons = $this->getSeasonsWithEpisodes($anime);
        $episodeInfo = $this->getEpisodeInfo($anime, $season_id, $episode_id);
        $userInfo = $this->getUserInfo($anime);
        $url = $this->checkGroup($anime, $season_id, $episode_id, $group_id);
        $user_group = $this->GetUserGroup();

        return Inertia::render('AnimePage', [
            'favourite' => $userInfo ? $userInfo['favourite'] : null,
            'anime' => $anime,
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
            'Host' => env('APP_URL'),

            'user_group_info' => $user_group,
            'invite_link' => $url
        ]);
    }

    private function getSeasonsWithEpisodes(Anime $anime) {
        return $anime->seasons()->with('episodes')->get();
    }

    private function getEpisodeInfo(Anime $anime, $season_id, $episode_id) {
        if (!$season_id || !$episode_id) {
            return null;
        }

        $currentEpisodeObject = $anime->seasons()->where('seasons.number', $season_id)
            ->firstOrFail()
            ->episodes()
            ->where('episodes.number', $episode_id)
            ->firstOrFail();

        $episodeInfo = [
            'current' => $currentEpisodeObject,
            'previous' => $this->getPreviousEpisode($anime, $currentEpisodeObject),
            'next' => $this->getNextEpisode($anime, $currentEpisodeObject),
        ];

        if ($episodeInfo['next']) {
            $episodeInfo['next']->load('season');
        }

        if ($episodeInfo['previous']) {
            $episodeInfo['previous']->load('season');
        }

        return $episodeInfo;
    }

    private function getPreviousEpisode(Anime $anime, Episode $currentEpisodeObject) {
        $previousEpisode = $anime->episodes()
            ->where('season_id', $currentEpisodeObject->season_id)
            ->where('episodes.number', '<', $currentEpisodeObject->number)
            ->orderBy('episodes.number', 'desc')
            ->first();

        if (!$previousEpisode) {
            $previousSeason = $anime->seasons()->where('number', '<', $currentEpisodeObject->season->number)->orderBy('number', 'desc')->first();
            if ($previousSeason) {
                $previousEpisode = $previousSeason->episodes()->orderBy('number', 'desc')->first();
            }
        }

        return $previousEpisode;
    }

    private function getNextEpisode(Anime $anime, Episode $currentEpisodeObject) {
        $nextEpisode = $anime->episodes()
            ->where('season_id', $currentEpisodeObject->season_id)
            ->where('episodes.number', '>', $currentEpisodeObject->number)
            ->orderBy('episodes.number', 'asc')
            ->first();

        if (!$nextEpisode) {
            $nextSeason = $anime->seasons()->where('number', '>', $currentEpisodeObject->season->number)->orderBy('number', 'asc')->first();
            if ($nextSeason) {
                $nextEpisode = $nextSeason->episodes()->orderBy('number', 'asc')->first();
            }
        }

        return $nextEpisode;
    }

    private function getUserInfo(Anime $anime) {
        $user = Auth::user();
        if (!$user) {
            return null;
        }

        return [
            'rating' => Rating::where('user_id', $user->id)
                ->where('anime_id', $anime->id)
                ->first(),
            'favourite' => Favourite::where('user_id', $user->id)
                ->where('anime_id', $anime->id)
                ->first(),
        ];
    }

    private function checkGroup(Anime $anime, $season_id, $episode_id, $group_id) {
        if (!$group_id) {
            return null;
        }

        $urlParams = [
            'anime_id' => $anime->unix,
            'season_id' => $season_id,
            'episode_id' => $episode_id,
        ];
        $urlParams['group_id'] = $group_id;
        return route('anime', $urlParams);
    }

    private function GetUserGroup(): ?GroupMembers {
        $group = GroupMembers::with('group')->where('user_id', Auth::id())->first();
        return $group;
    }
}
