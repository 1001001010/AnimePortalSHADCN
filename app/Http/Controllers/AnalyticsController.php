<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function analytics() {
        $reg_google = User::where('regist_method', 'google')->count();
        $reg_form = User::where('regist_method', 'default')->count();
        if ($reg_google > $reg_form){
            $percent = (($reg_google - $reg_form) / $reg_google) * 100;
            $text = 'Регистраций через Google больше на ' . $percent . '%';
        } elseif ($reg_google < $reg_form) {
            $percent = (($reg_form - $reg_google) / $reg_form) * 100;
            $text = 'Регистраций через Логин-пароль больше на ' . $percent . '%';
        } else {
            $text = 'Колличество регистраций одинаковое';
        }
        return Inertia::render('Analytics', [
            'registration'=>[
                'google'=>$reg_google,
                'form'=>$reg_form,
                'text'=>$text
            ],
        ]);
    }
}
