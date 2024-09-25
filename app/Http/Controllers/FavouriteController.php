<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\{Anime, Favourite};
use Illuminate\Support\Facades\{Auth, Redirect};

class FavouriteController extends Controller
{
    public function favourites(): \Inertia\Response {
        return Inertia::render('Favourites', [
            'favourites' => Favourite::with('anime')->where('user_id', Auth::user()->id)->get()
        ]);
    }

    public function add_favourites($anime_id): RedirectResponse {
        if (Anime::where('id', $anime_id)->firstOrFail()){
            $favourite = Favourite::where('user_id', Auth::user()->id)->where('anime_id', $anime_id)->first();
            if (is_null($favourite)) {
                Favourite::create([
                    'user_id' => Auth::user()->id,
                    'anime_id' => $anime_id,
                ]);
            } else {
                Favourite::find($favourite->id)->delete();
            }
            return redirect()->back();
        } else {
            abort('404');
        }
    }

    public function destroy(Request $request): RedirectResponse {
        Favourite::find($request->id)->delete();
        return redirect()->back();
    }
}
