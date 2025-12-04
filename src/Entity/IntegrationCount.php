<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "integrations_counts")]
class IntegrationCount
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['integrationCount:read'])]
    private ?int $taskId = null;

    #[ORM\Column(type: "date")]
    #[Groups(['integrationCount:read'])]
    private ?\DateTimeInterface $integrationDate = null;

    #[ORM\Column(type: "date")]
    #[Groups(['integrationCount:read'])]
    private ?\DateTimeInterface $nextSunday = null;

    #[ORM\Column(type: "integer")]
    #[Groups(['integrationCount:read'])]
    private ?int $wsProjectId = null;

    #[ORM\Column(type: "text")]
    #[Groups(['integrationCount:read'])]
    private ?string $title = null;

    #[ORM\Column(type: "string", length: 100, nullable: true)]
    #[Groups(['integrationCount:read'])]
    private ?string $taskUrl = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['integrationCount:read'])]
    private ?int $nanId = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['integrationCount:read'])]
    private ?int $notNanId = null;

    #[ORM\Column(type: "json", nullable: true)]
    #[Groups(['integrationCount:read'])]
    private ?array $nanDocuments = null;

    public function getTaskId(): ?int
    {
        return $this->taskId;
    }

    public function setTaskId(int $taskId): self
    {
        $this->taskId = $taskId;
        return $this;
    }

    public function getIntegrationDate(): ?\DateTimeInterface
    {
        return $this->integrationDate;
    }

    public function setIntegrationDate(\DateTimeInterface $integrationDate): self
    {
        $this->integrationDate = $integrationDate;
        return $this;
    }

    public function getNextSunday(): ?\DateTimeInterface
    {
        return $this->nextSunday;
    }

    public function setNextSunday(\DateTimeInterface $nextSunday): self
    {
        $this->nextSunday = $nextSunday;
        return $this;
    }

    public function getWsProjectId(): ?int
    {
        return $this->wsProjectId;
    }

    public function setWsProjectId(int $wsProjectId): self
    {
        $this->wsProjectId = $wsProjectId;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getTaskUrl(): ?string
    {
        return $this->taskUrl;
    }

    public function setTaskUrl(?string $taskUrl): self
    {
        $this->taskUrl = $taskUrl;
        return $this;
    }

    public function getNanId(): ?int
    {
        return $this->nanId;
    }

    public function setNanId(?int $nanId): self
    {
        $this->nanId = $nanId;
        return $this;
    }

    public function getNotNanId(): ?int
    {
        return $this->notNanId;
    }

    public function setNotNanId(?int $notNanId): self
    {
        $this->notNanId = $notNanId;
        return $this;
    }

    public function getNanDocuments(): ?array
    {
        return $this->nanDocuments;
    }

    public function setNanDocuments(?array $nanDocuments): self
    {
        $this->nanDocuments = $nanDocuments;
        return $this;
    }
}
