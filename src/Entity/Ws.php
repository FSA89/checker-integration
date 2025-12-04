<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "ws")]
class Ws
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['ws:read'])]
    private int $id;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['ws:read'])]
    private int $regionId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['ws:read'])]
    private int $isMobile;

    #[ORM\Id]
    #[ORM\Column(type: "date")]
    #[Groups(['ws:read'])]
    private \DateTimeInterface $date;

    #[ORM\Column(type: "integer")]
    #[Groups(['ws:read', 'ws:write'])]
    private int $ws1;

    #[ORM\Column(type: "integer")]
    #[Groups(['ws:read', 'ws:write'])]
    private int $ws2;

    #[ORM\ManyToOne(targetEntity: Query::class)]
    #[ORM\JoinColumn(name: "id", referencedColumnName: "id")]
    private ?Query $query;

    // Getters and setters

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getRegionId(): int
    {
        return $this->regionId;
    }

    public function setRegionId(int $regionId): self
    {
        $this->regionId = $regionId;
        return $this;
    }

    public function getIsMobile(): int
    {
        return $this->isMobile;
    }

    public function setIsMobile(int $isMobile): self
    {
        $this->isMobile = $isMobile;
        return $this;
    }

    public function getDate(): \DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;
        return $this;
    }

    public function getWs1(): int
    {
        return $this->ws1;
    }

    public function setWs1(int $ws1): self
    {
        $this->ws1 = $ws1;
        return $this;
    }

    public function getWs2(): int
    {
        return $this->ws2;
    }

    public function setWs2(int $ws2): self
    {
        $this->ws2 = $ws2;
        return $this;
    }

    public function getQuery(): ?Query
    {
        return $this->query;
    }

    public function setQuery(?Query $query): self
    {
        $this->query = $query;
        return $this;
    }
}
