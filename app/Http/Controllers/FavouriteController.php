<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Anime, Favourite};
use Auth;

class FavouriteController extends Controller
{
    public function add_favourites($anime_id) {
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
    }
}
