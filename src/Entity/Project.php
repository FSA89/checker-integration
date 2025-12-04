<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "projects")]
class Project
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['project:read'])]
    private ?int $projectId = null;

    #[ORM\Column(type: "string", length: 100)]
    #[Groups(['project:read'])]
    private string $name;

    #[ORM\Column(type: "string", length: 100)]
    #[Groups(['project:read'])]
    private string $status;

    #[ORM\Column(type: "string", length: 100, nullable: true)]
    #[Groups(['project:read'])]
    private ?string $columnRelUrl = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['project:read'])]
    private ?int $wsProjectId = null;

    public function getProjectId(): ?int
    {
        return $this->projectId;
    }

    public function setProjectId(int $projectId): self
    {
        $this->projectId = $projectId;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getColumnRelUrl(): ?string
    {
        return $this->columnRelUrl;
    }

    public function setColumnRelUrl(?string $columnRelUrl): self
    {
        $this->columnRelUrl = $columnRelUrl;
        return $this;
    }

    public function getWsProjectId(): ?int
    {
        return $this->wsProjectId;
    }

    public function setWsProjectId(?int $wsProjectId): self
    {
        $this->wsProjectId = $wsProjectId;
        return $this;
    }
}
