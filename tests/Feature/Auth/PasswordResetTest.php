<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;


class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    /**
     *  Проверка рендеринга страниы сброса пароля
     */
    public function test_reset_password_link_screen_can_be_rendered(): void
    {
        $response = $this->get(route("password.request"));

        $response->assertStatus(200);
    }

    /**
     *  Проверка получения ссылки на сброс пароля
     */
    public function test_reset_password_link_can_be_requested(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route("password.request"), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    /**
     *  Проверка рендеринга страницы сброса пароля
     */
    public function test_reset_password_screen_can_be_rendered(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post(route("password.request"), ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) {
            $response = $this->get('/reset-password/'.$notification->token);

            $response->assertStatus(200);

            return true;
        });
    }

    /**
     *  Проверка сброса пароля с неправильным токеном
     */
    public function test_password_can_be_reset_with_valid_token(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $response = $this->post('/reset-password', [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ]);

            $response
                ->assertSessionHasNoErrors()
                ->assertRedirect(route('login'));

            return true;
        });
    }
}
