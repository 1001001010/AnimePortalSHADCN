<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MainController extends Controller
{
    public function index(): \Inertia\Response {
        return Inertia::render('Welcome');
    }
    public function anime($id): \Inertia\Response {
        return Inertia::render('AnimePage');
    }
}