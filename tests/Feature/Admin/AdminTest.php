<?php

namespace Tests\Feature;

use App\Models\{User, Anime};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;

class AdminTest extends TestCase
{
    /**
     *  Проверка рендеринга панели администратора
     */
    public function test_admin_screen_can_be_rendered(): void
    {
        $this->withoutMiddleware();
        $response = $this->get(route('adminPanel.index'));

        $response->assertStatus(200);
    }
    /**
     *  Проверка рендеринга страницы аналитики
     */
    public function test_analytics_screen_can_be_rendered(): void
    {
        $this->withoutMiddleware();
        $response = $this->get(route('adminPanel.index'));

        $response->assertStatus(200);
    }
    /**
     *  Проверка доступа в панель администратора
     */
    public function test_user_cannot_access_admin_panel(): void
    {
        $user = User::factory()->create();
        $response = $this->get(route('adminPanel.index'));

        $response->assertStatus(404);
    }
    /**
     *  Проверка доступа в аналитику
     */
    public function test_user_cannot_access_analytics(): void
    {

        $response = $this->get(route('analytics.index'));

        $response->assertStatus(404);
    }
    /**
     *  Проверка создания нового аниме
     */
    public function test_admin_create_new_anime(): void
    {
        $coverPath = UploadedFile::fake()->image('cover.jpg');
        $screens = [
            UploadedFile::fake()->image('/public/img/screnes/1.jpg'),
            UploadedFile::fake()->image('/public/img/screnes/2.jpg'),
            UploadedFile::fake()->image('/public/img/screnes/3.jpg'),
            UploadedFile::fake()->image('/public/img/screnes/4.jpg'),
            UploadedFile::fake()->image('/public/img/screnes/5.jpg'),
        ];
        $user = User::factory()->admin()->create();
        $unix = time();

        $response = $this->actingAs($user)->post('/admin/anime/new', [
            'age' => '18',
            'status' => 'came_out',
            'type' => 'ТВ Сериал',
            'name' => 'Берсерк',
            'unix' => $unix,
            'original' => 'Манга',
            'studio' => 'Oriental Light and Magic',
            'voice' => 'MC Entertainment',
            'director' => 'Такахаси Наохито',
            'autor' => 'Кэнтаро Миура',
            'description' => 'Боль, кровь и слёзы...',
            'cover' => $coverPath,
            'screens' => $screens
        ]);
        $this->assertDatabaseHas('animes', [
            'name' => 'Берсерк',
            'unix' => $unix,
        ]);

        $response->assertStatus(200);
    }
    /**
     * Создание аниме пользователем, не являющимся администратором
     */
    public function test_user_cannot_create_new_anime(): void {
        $coverPath = UploadedFile::fake()->image('cover.jpg');
        $screens = [
            UploadedFile::fake()->image('screens/1.jpg'),
            UploadedFile::fake()->image('screens/2.jpg'),
            UploadedFile::fake()->image('screens/3.jpg'),
            UploadedFile::fake()->image('screens/4.jpg'),
            UploadedFile::fake()->image('screens/5.jpg'),
        ];
        $user = User::factory()->create();
        $unix = time();
        $payload = [
            'age' => '18',
            'status' => 'came_out',
            'type' => 'ТВ Сериал',
            'name' => 'Берсерк',
            'unix' => $unix,
            'original' => 'Манга',
            'studio' => 'Oriental Light and Magic',
            'voice' => 'MC Entertainment',
            'director' => 'Такахаси Наохито',
            'autor' => 'Кэнтаро Миура',
            'description' => 'Боль, кровь и слёзы...',
            'cover' => $coverPath,
            'screens' => $screens
        ];
        $response = $this->actingAs($user)->post('/admin/anime/new', $payload);
        $response->assertStatus(404);
    }
    /**
     * Удаление аниме с неккоректными значениями
     */
    public function test_admin_cannot_be_delete_invalid_anime(): void {
        $user = User::factory()->admin()->create();

        $invalidRatings = ['abc', null, '0', 0];

        foreach ($invalidRatings as $rating) {
            $response = $this
                ->actingAs($user)
                ->from(route('adminPanel.index'))
                ->post(route('DelAnime'), [
                    'anime_id'
                ]);

            $response->assertRedirect();
            $response->assertSessionHasErrors('anime_id');
        }
    }
}
