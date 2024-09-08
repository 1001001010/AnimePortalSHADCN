<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\{Auth, Redirect};
use App\Models\{Anime, Friendship, Rating, Favourite, Episode};
use App\Http\Controllers\HelperController;
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
        return (new HelperController)->renderAnimePage(Anime::where('unix', $anime_id)->firstOrFail(), $season_id, $episode_id);
    }

    public function random_anime() {
        return Redirect::route('anime', [
            'anime_id' => Anime::get()->random()->unix,
        ]);;
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
