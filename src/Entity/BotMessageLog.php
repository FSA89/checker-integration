<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "bot_message_log")]
class BotMessageLog
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(['bot_message_log:read'])]
    private ?int $id = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['bot_message_log:read', 'bot_message_log:write'])]
    private ?int $chatId = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['bot_message_log:read', 'bot_message_log:write'])]
    private ?string $message = null;

    #[ORM\Column(type: "boolean", nullable: true)]
    #[Groups(['bot_message_log:read', 'bot_message_log:write'])]
    private ?bool $responseOk = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['bot_message_log:read', 'bot_message_log:write'])]
    private ?int $responseCode = null;

    #[ORM\Column(type: "string", length: 64, nullable: true)]
    #[Groups(['bot_message_log:read', 'bot_message_log:write'])]
    private ?string $responseDescription = null;

    #[ORM\Column(type: "datetime", nullable: true)]
    #[Groups(['bot_message_log:read'])]
    private ?\DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getChatId(): ?int
    {
        return $this->chatId;
    }

    public function setChatId(?int $chatId): self
    {
        $this->chatId = $chatId;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;
        return $this;
    }

    public function getResponseOk(): ?bool
    {
        return $this->responseOk;
    }

    public function setResponseOk(?bool $responseOk): self
    {
        $this->responseOk = $responseOk;
        return $this;
    }

    public function getResponseCode(): ?int
    {
        return $this->responseCode;
    }

    public function setResponseCode(?int $responseCode): self
    {
        $this->responseCode = $responseCode;
        return $this;
    }

    public function getResponseDescription(): ?string
    {
        return $this->responseDescription;
    }

    public function setResponseDescription(?string $responseDescription): self
    {
        $this->responseDescription = $responseDescription;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }
}
