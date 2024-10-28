<?php

namespace App\Exports;

use App\Models\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ReportExport implements FromCollection, WithHeadings, WithStyles
{
    public function collection()
    {
        // Получаем 100 самых популярных аниме
        $popularAnimes = View::select('anime_id', \DB::raw('COUNT(*) as views_count'))
            ->with('anime')
            ->groupBy('anime_id')
            ->orderBy('views_count', 'desc')
            ->limit(100)
            ->get();

        // Преобразуем данные для экспорта
        $data = $popularAnimes->map(function ($item) {
            return [
                'ID' => $item->anime_id,
                'Название' => $item->anime->title, // Предполагается, что у вас есть отношение anime в модели View
                'Просмотры' => $item->views_count,
            ];
        });

        return $data;
    }

    public function headings(): array
    {
        return [
            'ID',
            'Название',
            'Просмотры',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        // Объединение ячеек и установка стилей
        $sheet->mergeCells('A1:C1');
        $sheet->getStyle('A1:C1')->getFont()->setBold(true);
        $sheet->getStyle('A1:C1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Установка автоматического размера для каждого столбца
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);
        $sheet->getColumnDimension('C')->setAutoSize(true);
    }
}
