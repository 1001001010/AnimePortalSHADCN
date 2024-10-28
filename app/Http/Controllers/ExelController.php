<?php

namespace App\Http\Controllers;

use App\Exports\ReportExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ExelController extends Controller
{
    public function index() {
        return Excel::download(new ReportExport(), 'report.xlsx');
    }
}
