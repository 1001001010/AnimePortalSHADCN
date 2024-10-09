<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class JoinGroupEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $group_id;
    public $user_id;

    /**
     * Create a new event instance.
     */
    public function __construct($group_id, $user_id) {
        $this->group_id = $group_id;
        $this->user_id = $user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('group-' . $this->group_id),
        ];
    }

    public function broadcastAs(): string {
        return 'Group.join';
    }

    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->user_id,
        ];
    }
}
