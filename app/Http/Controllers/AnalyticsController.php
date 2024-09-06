<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function analytics() {
        $registration = $this->AnalyticsRegistration();
        $registrationMethod = $this->AnalyticsMethodRegistration();
        return Inertia::render('Analytics', [
            "analytic"=>[
                'registrationMethod'=>[
                    'google'=>$registrationMethod->reg_google,
                    'form'=>$registrationMethod->reg_form,
                    'text'=>$registrationMethod->text
                ],
                'registration'=>[
                    'google'=>$registration->monthsGoogle,
                    'default'=>$registration->monthsDefault
                ]
            ]
        ]);
    }

    private function AnalyticsMethodRegistration() {
        $reg_google = User::where('regist_method', 'google')->count();
        $reg_form = User::where('regist_method', 'default')->count();

        $diff = abs($reg_google - $reg_form);
        $base = max($reg_google, $reg_form);
        $percent = round(($diff / $base) * 100, 1);

        if ($reg_google > $reg_form) {
            $text = 'Регистраций через Google больше на ' . $percent . '%';
        } elseif ($reg_google < $reg_form) {
            $text = 'Регистраций через Логин-пароль больше на ' . $percent . '%';
        } else {
            $text = 'Колличество регистраций одинаковое';
        }
        return (object) [
            'reg_google' => $reg_google,
            'reg_form' => $reg_form,
            'text' => $text
        ];
    }

    private function AnalyticsRegistration() {
        $users = User::all();
        $monthsGoogle = [];
        $monthsDefault = [];
        $currentMonth = (int) date("m");
        $currentYear = (int) date("Y");

        for ($i = 0; $i < 6; $i++) {
            $month = $currentMonth - $i;
            $year = $currentYear;

            if ($month <= 0) {
                $month += 12;
                $year -= 1;
            }

            $monthName = date("F", mktime(0, 0, 0, $month, 1));

            $usersInMonthGoogle = $users->filter(function ($user) use ($monthName) {
                $userRegistrationDate = date("F", $user->created_at->timestamp);
                return $userRegistrationDate == $monthName && $user->regist_method == 'google';
            })->count();

            $usersInMonthDefault = $users->filter(function ($user) use ($monthName) {
                $userRegistrationDate = date("F", $user->created_at->timestamp);
                return $userRegistrationDate == $monthName && $user->regist_method == 'default';
            })->count();

            $monthsGoogle[$monthName] = $usersInMonthGoogle;
            $monthsDefault[$monthName] = $usersInMonthDefault;
        }
        return (object) [
            'monthsGoogle' => $monthsGoogle,
            'monthsDefault' => $monthsDefault,
        ];
    }
}
