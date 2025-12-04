<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ORM\Table(name: "domains")]
class Domain
{
    #[ORM\Id]
    #[ORM\Column(type: "integer")]
    #[Groups(['domain:read'])]
    private ?int $domainId = null;

    #[ORM\Column(type: "string", length: 255, nullable: true)]
    #[Groups(['domain:read', 'domain:write'])]
    private ?string $domainName = null;

    #[ORM\Column(type: "integer", nullable: true)]
    #[Groups(['domain:read', 'domain:write'])]
    private ?int $ymCounter = null;

    #[ORM\Column(type: "date", nullable: true)]
    #[Groups(['domain:read', 'domain:write'])]
    private ?\DateTimeInterface $sslExpiration = null;

    #[ORM\Column(type: "date", nullable: true)]
    #[Groups(['domain:read', 'domain:write'])]
    private ?\DateTimeInterface $registrationExpiration = null;

    #[ORM\Column(type: "string", length: 64, nullable: true)]
    #[Groups(['domain:read', 'domain:write'])]
    private ?string $sslOrganization = null;

    public function getDomainId(): ?int
    {
        return $this->domainId;
    }

    public function setDomainId(int $domainId): self
    {
        $this->domainId = $domainId;
        return $this;
    }

    public function getDomainName(): ?string
    {
        return $this->domainName;
    }

    public function setDomainName(?string $domainName): self
    {
        $this->domainName = $domainName;
        return $this;
    }

    public function getYmCounter(): ?int
    {
        return $this->ymCounter;
    }

    public function setYmCounter(?int $ymCounter): self
    {
        $this->ymCounter = $ymCounter;
        return $this;
    }

    public function getSslExpiration(): ?\DateTimeInterface
    {
        return $this->sslExpiration;
    }

    public function setSslExpiration(?\DateTimeInterface $sslExpiration): self
    {
        $this->sslExpiration = $sslExpiration;
        return $this;
    }

    public function getRegistrationExpiration(): ?\DateTimeInterface
    {
        return $this->registrationExpiration;
    }

    public function setRegistrationExpiration(?\DateTimeInterface $registrationExpiration): self
    {
        $this->registrationExpiration = $registrationExpiration;
        return $this;
    }

    public function getSslOrganization(): ?string
    {
        return $this->sslOrganization;
    }

    public function setSslOrganization(?string $sslOrganization): self
    {
        $this->sslOrganization = $sslOrganization;
        return $this;
    }
}
