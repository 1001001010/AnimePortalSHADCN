<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index() {
        return Inertia::render('AdminPanel');
    }

    public function new_anime(Request $request) {

        $validated = $request->validate([
            'age' => 'required|integer',
            'status' => 'required|string',
            'name' => 'required|string',
            'type' => 'required|string',
            'original' => 'required|string',
            'studio' => 'required|string',
            'voice' => 'required|string',
            'director' => 'required|string',
            'autor' => 'required|string',
            'description' => 'required|string',
            'cover' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'screens' => 'required|array',
            'screens.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        return dd($request->all());
    }
}
