<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "documents")]
class Document
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['document:read'])]
    private ?int $documentId = null;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(['document:read', 'document:write'])]
    private ?string $document = null;

    public function getDocumentId(): ?int
    {
        return $this->documentId;
    }

    public function setDocumentId(int $documentId): self
    {
        $this->documentId = $documentId;
        return $this;
    }

    public function getDocument(): ?string
    {
        return $this->document;
    }

    public function setDocument(?string $document): self
    {
        $this->document = $document;
        return $this;
    }
}
