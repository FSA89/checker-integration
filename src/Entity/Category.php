<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "categories")]
class Category
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[Groups(['category:read'])]
    private ?int $categoryId = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['category:read', 'category:write'])]
    private ?string $title = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['category:read', 'category:write'])]
    private ?int $keysCount = null;

    public function getCategoryId(): ?int
    {
        return $this->categoryId;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getKeysCount(): ?int
    {
        return $this->keysCount;
    }

    public function setKeysCount(?int $keysCount): self
    {
        $this->keysCount = $keysCount;
        return $this;
    }
}
