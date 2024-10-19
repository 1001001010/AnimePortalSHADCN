<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{User, View};
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function analytics() {
        $registration = $this->AnalyticsRegistration();
        $registrationMethod = $this->AnalyticsMethodRegistration();
        $AnalyticsPopularList = $this->AnalyticsPopularList();
        return Inertia::render('Analytics', [
            "analytic"=>[
                'registrationMethod'=>[
                    'yandex'=>$registrationMethod->reg_yandex,
                    'form'=>$registrationMethod->reg_form,
                    'text'=>$registrationMethod->text
                ],
                'registration'=>[
                    'yandex'=>$registration->monthsYandex,
                    'default'=>$registration->monthsDefault
                ],
                'popularList'=> $AnalyticsPopularList
            ]
        ]);
    }

    private function AnalyticsMethodRegistration() {
        $reg_yandex = User::where('regist_method', 'yandex')->count();
        $reg_form = User::where('regist_method', 'default')->count();

        $diff = abs($reg_yandex - $reg_form);
        $base = max($reg_yandex, $reg_form);
        $percent = round(($diff / $base) * 100, 1);

        if ($reg_yandex > $reg_form) {
            $text = 'Регистраций через Yandex больше на ' . $percent . '%';
        } elseif ($reg_yandex < $reg_form) {
            $text = 'Регистраций через Логин-пароль больше на ' . $percent . '%';
        } else {
            $text = 'Колличество регистраций одинаковое';
        }
        return (object) [
            'reg_yandex' => $reg_yandex,
            'reg_form' => $reg_form,
            'text' => $text
        ];
    }

    private function AnalyticsRegistration() {
        $users = User::all();
        $monthsYandex = [];
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

            $usersInMonthYandex = $users->filter(function ($user) use ($monthName) {
                $userRegistrationDate = date("F", $user->created_at->timestamp);
                return $userRegistrationDate == $monthName && $user->regist_method == 'yandex';
            })->count();

            $usersInMonthDefault = $users->filter(function ($user) use ($monthName) {
                $userRegistrationDate = date("F", $user->created_at->timestamp);
                return $userRegistrationDate == $monthName && $user->regist_method == 'default';
            })->count();

            $monthsYandex[$monthName] = $usersInMonthYandex;
            $monthsDefault[$monthName] = $usersInMonthDefault;
        }
        return (object) [
            'monthsYandex' => $monthsYandex,
            'monthsDefault' => $monthsDefault,
        ];
    }

    private function AnalyticsPopularList() {
        $popularAnimes = View::select('anime_id', \DB::raw('COUNT(*) as views_count'))
            ->with('anime')
            ->groupBy('anime_id')
            ->orderBy('views_count', 'desc')
            ->limit(5)->get();
        return $popularAnimes;
    }
}
