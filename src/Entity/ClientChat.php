<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "client_chat")]
class ClientChat
{
    #[ORM\Id]
    #[ORM\Column(type: "bigint")]
    #[Groups(['client_chat:read'])]
    private ?string $id = '-4009320075';

    #[ORM\Column(type: "integer")]
    #[Groups(['client_chat:read', 'client_chat:write'])]
    private ?int $domainId = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getDomainId(): ?int
    {
        return $this->domainId;
    }

    public function setDomainId(int $domainId): self
    {
        $this->domainId = $domainId;
        return $this;
    }
}
