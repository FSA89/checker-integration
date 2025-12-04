<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "seasonality")]
class Seasonality
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['seasonality:read'])]
    private int $projectId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['seasonality:read'])]
    private int $domainId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['seasonality:read'])]
    private int $regionId;

    #[ORM\Id]
    #[ORM\Column(type: "boolean")]
    #[Groups(['seasonality:read'])]
    private bool $isMobile;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['seasonality:read'])]
    private int $month;

    #[ORM\Column(type: "float", nullable: true)]
    #[Groups(['seasonality:read', 'seasonality:write'])]
    private ?float $seasonality;

    public function getProjectId(): int
    {
        return $this->projectId;
    }

    public function setProjectId(int $projectId): self
    {
        $this->projectId = $projectId;
        return $this;
    }

    public function getDomainId(): int
    {
        return $this->domainId;
    }

    public function setDomainId(int $domainId): self
    {
        $this->domainId = $domainId;
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

    public function getIsMobile(): bool
    {
        return $this->isMobile;
    }

    public function setIsMobile(bool $isMobile): self
    {
        $this->isMobile = $isMobile;
        return $this;
    }

    public function getMonth(): int
    {
        return $this->month;
    }

    public function setMonth(int $month): self
    {
        $this->month = $month;
        return $this;
    }

    public function getSeasonality(): ?float
    {
        return $this->seasonality;
    }

    public function setSeasonality(?float $seasonality): self
    {
        $this->seasonality = $seasonality;
        return $this;
    }
}
