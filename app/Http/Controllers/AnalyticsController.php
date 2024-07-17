<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Auth;

class AnalyticsController extends Controller
{
    public function analytics() {
        return Inertia::render('Analytics');
    }
}
