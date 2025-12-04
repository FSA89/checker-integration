<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "search_engines")]
class SearchEngine
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['search_engine:read'])]
    private int $seId;

    #[ORM\Column(type: "string", length: 100, nullable: true)]
    #[Groups(['search_engine:read', 'search_engine:write'])]
    private ?string $searchEngine;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['search_engine:read', 'search_engine:write'])]
    private ?string $regionName;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['search_engine:read', 'search_engine:write'])]
    private ?int $regionId;

    #[ORM\Column(type: "boolean", nullable: true)]
    #[Groups(['search_engine:read', 'search_engine:write'])]
    private ?bool $isMobile;

    public function getSeId(): int
    {
        return $this->seId;
    }

    public function setSeId(int $seId): self
    {
        $this->seId = $seId;
        return $this;
    }

    public function getSearchEngine(): ?string
    {
        return $this->searchEngine;
    }

    public function setSearchEngine(?string $searchEngine): self
    {
        $this->searchEngine = $searchEngine;
        return $this;
    }

    public function getRegionName(): ?string
    {
        return $this->regionName;
    }

    public function setRegionName(?string $regionName): self
    {
        $this->regionName = $regionName;
        return $this;
    }

    public function getRegionId(): ?int
    {
        return $this->regionId;
    }

    public function setRegionId(?int $regionId): self
    {
        $this->regionId = $regionId;
        return $this;
    }

    public function getIsMobile(): ?bool
    {
        return $this->isMobile;
    }

    public function setIsMobile(?bool $isMobile): self
    {
        $this->isMobile = $isMobile;
        return $this;
    }
}
