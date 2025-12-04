<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "limits")]
class Limit
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['limit:read'])]
    private ?int $projectId = null;

    #[ORM\Id]
    #[ORM\Column(type: "datetime")]
    #[Groups(['limit:read'])]
    private ?\DateTimeInterface $timeStarted = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['limit:read'])]
    private ?int $limitsSpent = null;

    #[ORM\Column(type: "date", nullable: true)]
    #[Groups(['limit:read'])]
    private ?\DateTimeInterface $paymentPeriod = null;

    #[ORM\Column(type: "boolean", options: ["default" => 0])]
    #[Groups(['limit:read'])]
    private bool $costsAdded = false;

    public function getProjectId(): ?int
    {
        return $this->projectId;
    }

    public function setProjectId(int $projectId): self
    {
        $this->projectId = $projectId;
        return $this;
    }

    public function getTimeStarted(): ?\DateTimeInterface
    {
        return $this->timeStarted;
    }

    public function setTimeStarted(\DateTimeInterface $timeStarted): self
    {
        $this->timeStarted = $timeStarted;
        return $this;
    }

    public function getLimitsSpent(): ?int
    {
        return $this->limitsSpent;
    }

    public function setLimitsSpent(?int $limitsSpent): self
    {
        $this->limitsSpent = $limitsSpent;
        return $this;
    }

    public function getPaymentPeriod(): ?\DateTimeInterface
    {
        return $this->paymentPeriod;
    }

    public function setPaymentPeriod(?\DateTimeInterface $paymentPeriod): self
    {
        $this->paymentPeriod = $paymentPeriod;
        return $this;
    }

    public function isCostsAdded(): bool
    {
        return $this->costsAdded;
    }

    public function setCostsAdded(bool $costsAdded): self
    {
        $this->costsAdded = $costsAdded;
        return $this;
    }
}
