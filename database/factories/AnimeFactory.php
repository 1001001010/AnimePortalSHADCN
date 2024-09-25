<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Anime>
 */
class AnimeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
                'age' => '18',
                'status' => 'came_out',
                'type' => 'ТВ Сериал',
                'name' => 'Берсерк',
                'unix' => time(),
                'original' => 'Манга',
                'studio' => 'Oriental Light and Magic',
                'voice' => 'MC Entertainment',
                'director' => 'Такахаси Наохито',
                'autor' => 'Кэнтаро Миура',
                'description' => 'Боль, кровь и слёзы. На престол восходит новый правитель. Его слуги, подручные демоны безнаказанно творят бесчинства в городе. Все меняется когда в город, скрытый темнотой ночи, попадает тяжёлый воин. С разнообразным вооружением для самых непредвиденных моментов, в броне, тело его все покрыто шрамами – черный мечник. Его меч настолько огромен, что может сравниться с его лютой злобой к королю и демонам.

Эта история по сути военная драма. Происходящая в средневековье, включает в себя хоррор перемешанный с фэнтези. В центре действий Гатс, его судьба. В прошлом наёмник, а теперь он охотится за демонами. Его путь определенный свыше. Предательство, верность, магия, темные существа и эльфы.

«Наша судьба принадлежит нам, не ей решать, как и когда нам умереть!» - вот основная идея Берсерка. Эта мысль открывается на протяжении всего сериала. И еще одно, может ли человек переступить грань дозволенного, уйти за точку невозврата и где это придел способностей человеческого вида в достижении мечты.',
                'cover' => '/public/img/Poster.jpg',
                'screens' => json_encode(['/public/img/screnes/1.jpg', '/public/img/screnes/2.jpg', '/public/img/screnes/3.jpg', '/public/img/screnes/4.jpg', '/public/img/screnes/5.jpg']),
            ];
    }
}
