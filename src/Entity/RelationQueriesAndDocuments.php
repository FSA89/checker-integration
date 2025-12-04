<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "relation_queries_and_documents")]
class RelationQueriesAndDocuments
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['relation:read'])]
    private int $projectId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['relation:read'])]
    private int $id;

    #[ORM\ManyToOne(targetEntity: Document::class)]
    #[ORM\JoinColumn(name: "document_id", referencedColumnName: "document_id", nullable: true)]
    #[Groups(['relation:read'])]
    private ?Document $document;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(name: "category_id", referencedColumnName: "category_id", nullable: true)]
    #[Groups(['relation:read'])]
    private ?Category $category;

    public function getProjectId(): int
    {
        return $this->projectId;
    }

    public function setProjectId(int $projectId): self
    {
        $this->projectId = $projectId;
        return $this;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;
        return $this;
    }
}
