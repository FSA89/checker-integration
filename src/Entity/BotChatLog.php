<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "bot_chat_log")]
class BotChatLog
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['bot_chat_log:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::JSON, nullable: true)]
    #[Groups(['bot_chat_log:read', 'bot_chat_log:write'])]
    private ?array $chatData = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChatData(): ?array
    {
        return $this->chatData;
    }

    public function setChatData(?array $chatData): self
    {
        $this->chatData = $chatData;
        return $this;
    }
}
