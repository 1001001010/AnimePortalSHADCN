<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
}
