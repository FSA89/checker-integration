<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "disabled_domain")]
class DisabledDomain
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['disabled_domain:read'])]
    private ?int $domainId = null;

    #[ORM\Column(type: "smallint", nullable: true, options: ["default" => 0])]
    #[Groups(['disabled_domain:read', 'disabled_domain:write'])]
    private ?int $disabled = 0;

    public function getDomainId(): ?int
    {
        return $this->domainId;
    }

    public function setDomainId(int $domainId): self
    {
        $this->domainId = $domainId;
        return $this;
    }

    public function getDisabled(): ?int
    {
        return $this->disabled;
    }

    public function setDisabled(?int $disabled): self
    {
        $this->disabled = $disabled;
        return $this;
    }
}
