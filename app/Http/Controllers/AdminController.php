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
        
        return dd($request->all());
    }
}
