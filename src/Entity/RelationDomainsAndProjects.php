<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "relation_domains_and_projects")]
class RelationDomainsAndProjects
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['relation:read'])]
    private int $projectId;

    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['relation:read'])]
    private int $domainId;

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
}
