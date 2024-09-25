<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Auth;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;
    /**
     *  Проверка рендеринга страницы логина
     */
    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get(route('login'));

        $response->assertStatus(200);
    }

    /**
     *  Проверка авторизации через страницу логина
     */
    // public function test_users_can_authenticate_using_the_login_screen(): void
    // {
    //     $user = User::factory()->create();

    //     $response = $this->post(route('login'), [
    //         'email' => $user->email,
    //         'password' => 'password',
    //     ]);

    //     $this->assertAuthenticated();
    // }

    /**
     *  Проверка авторизации с неправильным паролем
     */
    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    /**
     *  Проверка выхода из системы
     */
    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('logout'));

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
