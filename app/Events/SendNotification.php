<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $userID;
    public $userName;

    public function __construct($message,$userID,$userName)
    {
        $this->message = $message;
        $this->userID = $userID; 
        $this->userName = $userName; 
    }

   public function broadcastOn()
{
    return 'my-channel-' . $this->userID;
}


    public function broadcastAs()
    {
        return 'my-event';
    }
}
