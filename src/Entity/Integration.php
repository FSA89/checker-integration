<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "integrations")]
class Integration
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['integration:read'])]
    private ?int $taskId = null;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['integration:read'])]
    private ?int $documentId = null;

    #[ORM\ManyToOne(targetEntity: Document::class)]
    #[ORM\JoinColumn(name: "document_id", referencedColumnName: "document_id", nullable: false)]
    #[Groups(['integration:read'])]
    private ?Document $document = null;

    #[ORM\ManyToOne(targetEntity: IntegrationCount::class)]
    #[ORM\JoinColumn(name: "task_id", referencedColumnName: "task_id", nullable: false)]
    #[Groups(['integration:read'])]
    private ?IntegrationCount $integrationCount = null;

    public function getTaskId(): ?int
    {
        return $this->taskId;
    }

    public function setTaskId(int $taskId): self
    {
        $this->taskId = $taskId;
        return $this;
    }

    public function getDocumentId(): ?int
    {
        return $this->documentId;
    }

    public function setDocumentId(int $documentId): self
    {
        $this->documentId = $documentId;
        return $this;
    }

    public function getDocument(): ?Document
    {
        return $this->document;
    }

    public function setDocument(?Document $document): self
    {
        $this->document = $document;
        return $this;
    }

    public function getIntegrationCount(): ?IntegrationCount
    {
        return $this->integrationCount;
    }

    public function setIntegrationCount(?IntegrationCount $integrationCount): self
    {
        $this->integrationCount = $integrationCount;
        return $this;
    }
}
