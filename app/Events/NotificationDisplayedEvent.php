<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\{Friendship};


class NotificationDisplayedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $friend_id;

    /**
     * Создание нового экземпляра событий
     */
    public function __construct(Friendship $friendship) {
        $this->friend_id = $friendship->friend_id;
        $this->user_id = $friendship->user_id;
    }

    /**
     * Получение каналов, которые будут транслироваться
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array {
        return [
            new PrivateChannel('notification-displayed-' . $this->friend_id),
        ];
    }

    /**
     * Задаем название трансляции
     */
    public function broadcastAs(): string {
        return 'Notification.displayed';
    }

    /**
     * Передаем данные в трансляцию
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'friend_id' => $this->friend_id,
        ];
    }
}
