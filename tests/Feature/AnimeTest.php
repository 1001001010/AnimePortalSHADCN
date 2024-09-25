<?php

namespace Tests\Feature;

use App\Models\Anime;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Log;

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
}
