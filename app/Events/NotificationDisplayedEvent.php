<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class NotificationDisplayedEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $friend_id;

    /**
     * Создание нового экземпляра событий
     */
    public function __construct($friend_id) {
        $this->friend_id = $friend_id;
    }

    /**
     * Получение каналов, которые будут транслироваться
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array {
        return [
            new Channel('notification-displayed'),
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
