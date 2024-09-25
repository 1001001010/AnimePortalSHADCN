<?php

namespace Tests\Feature;

use App\Models\{Anime, User, Favourite};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AnimeTest extends TestCase
{
    /**
     * Рендеринг страницы аниме
     */
    public function test_rendering_anime_page(): void
    {
        $anime = Anime::factory()->create();

        $response = $this->get(route('anime', ['anime_id' => $anime->unix]));
        $response->assertStatus(200);
    }
    /**
     * Рендеринг несуществующей страницы с аниме
     */
    public function test_rendering_invalid_anime_page(): void
    {
        $anime = Anime::factory()->create();

        $response = $this->get(route('anime', ['anime_id' => '0']));
        $response->assertStatus(404);
    }
    /**
     * Неправильная оценка теста
     */
    public function test_invalid_rating(): void
    {
        $anime = Anime::factory()->create();
        $user = User::factory()->create();

        $invalidRatings = [0, 6, 7, 'abc', null];

        foreach ($invalidRatings as $rating) {
            $response = $this->actingAs($user)
                ->from(route('anime', ['anime_id' => $anime->unix]))
                ->post(route('anime.grade'), [
                    'anime' => $anime->unix,
                    'rating' => $rating,
                ]);

            $response->assertRedirect();
            $response->assertSessionHasErrors('rating');
        }
    }
    /**
     * Добавление в избранное
     */
    public function test_add_to_favourites(): void
    {
        $user = User::factory()->create();
        $anime = Anime::factory()->create();

        $initialCount = Favourite::where('user_id', $user->id)->where('anime_id', $anime->id)->count();

        $response = $this->actingAs($user)->get(route('favourite.add', ['anime_id' => $anime->id]));

        $finalCount = Favourite::where('user_id', $user->id)->where('anime_id', $anime->id)->count();

        $this->assertEquals($initialCount + 1, $finalCount);
    }
    /**
     * Добавление несуществующего аниме в избранное
     */
    public function test_invalid_favourites(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('favourite.add', ['anime_id' => '000000']));
        $response->assertStatus(404);
    }
}
