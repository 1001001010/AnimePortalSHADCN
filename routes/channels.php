<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('notification-displayed-{friend_id}', function ($user, $friend_id) {
    return (int) $user->id === (int) $friend_id;
});
